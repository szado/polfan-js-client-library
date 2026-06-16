import asyncio
import json
import logging
import time
from urllib.parse import urlencode
from typing import Any, Dict, Optional

import websockets
from websockets.exceptions import ConnectionClosed

from .client import AbstractChatClient
from .exceptions import ConnectionTimeoutError, NotReadyError

logger = logging.getLogger(__name__)


class WebSocketChatClient(AbstractChatClient):
    """
    Client for interacting with the Devana Chat Server via WebSockets.
    """
    def __init__(
        self,
        url: str,
        token: str,
        connecting_timeout_ms: int = 10000,
        await_queue_send_delay_ms: int = 500,
        query_params: Optional[Dict[str, str]] = None,
        ping_enabled: bool = True,
        ping_no_activity_timeout_ms: int = 15000,
        ping_pong_back_timeout_ms: int = 5000,
        reconnect_initial_delay_ms: int = 1000,
        reconnect_max_delay_ms: int = 30000,
    ):
        super().__init__()
        self.url = url
        self.token = token
        self.connecting_timeout_ms = connecting_timeout_ms
        self.await_queue_send_delay_ms = await_queue_send_delay_ms
        self.query_params = query_params or {}

        self.ping_enabled = ping_enabled
        self.ping_no_activity_timeout_ms = ping_no_activity_timeout_ms
        self.ping_pong_back_timeout_ms = ping_pong_back_timeout_ms
        self.reconnect_initial_delay_ms = reconnect_initial_delay_ms
        self.reconnect_max_delay_ms = reconnect_max_delay_ms

        self.ws: Optional[websockets.WebSocketClientProtocol] = None
        self.send_queue: list = []
        self.authenticated: bool = False
        self.last_received_message_at: float = 0.0

        self._connect_task: Optional[asyncio.Task] = None
        self._receive_task: Optional[asyncio.Task] = None
        self._ping_monitor_task: Optional[asyncio.Task] = None
        self._auth_future: Optional[asyncio.Future] = None

        self._disconnect_called: bool = False

    async def connect(self):
        """
        Connects to the WebSocket server and authenticates.
        """
        if self._is_open() or self._is_connecting():
            return

        self._disconnect_called = False
        params = self.query_params.copy()
        params["token"] = self.token
        qs = urlencode(params)
        full_url = f"{self.url}?{qs}"

        self._auth_future = asyncio.get_running_loop().create_future()

        self._connect_task = asyncio.create_task(self._connection_loop(full_url))

        try:
            # Wait for authentication or timeout
            await asyncio.wait_for(
                self._auth_future,
                timeout=self.connecting_timeout_ms / 1000.0
            )
        except asyncio.TimeoutError:
            self.disconnect()
            self.emit("error", ConnectionTimeoutError("Connection timeout"))
            raise ConnectionTimeoutError("Connection timeout")

    def disconnect(self):
        """
        Disconnects the client gracefully.
        """
        self._disconnect_called = True
        self.send_queue.clear()

        if self.ws:
            asyncio.create_task(self.ws.close(code=1000))

        self._stop_tasks()

    @property
    def is_ready(self) -> bool:
        """
        Returns True if the WebSocket is open and authenticated.
        """
        return self._is_open() and self.authenticated

    async def send(self, command_type: str, command_data: Any) -> Dict[str, Any]:
        """
        Sends a command using the WebSocket connection.
        """
        envelope = self._create_envelope(command_type, command_data)
        future = self._create_future_from_envelope(envelope)

        if not self.is_ready:
            self.send_queue.append(envelope)
        else:
            await self._send_envelope(envelope)

        return await future

    async def _connection_loop(self, full_url: str):
        current_delay_ms = self.reconnect_initial_delay_ms

        while not self._disconnect_called:
            try:
                async with websockets.connect(full_url) as ws:
                    self.ws = ws
                    self.authenticated = False
                    self._receive_task = asyncio.create_task(self._receive_loop())

                    # Reset delay on successful connection
                    current_delay_ms = self.reconnect_initial_delay_ms

                    # Wait for connection to close
                    await self._receive_task

            except Exception as e:
                logger.debug(f"WebSocket connection error: {e}")

            self._stop_connection_monitor()
            self.authenticated = False
            self.emit("disconnect", True)

            if self._disconnect_called:
                break

            # Exponential backoff
            await asyncio.sleep(current_delay_ms / 1000.0)
            current_delay_ms = min(current_delay_ms * 2, self.reconnect_max_delay_ms)

    async def _receive_loop(self):
        if not self.ws:
            return

        try:
            async for message in self.ws:
                self.last_received_message_at = time.time()

                try:
                    envelope = json.loads(message)
                except json.JSONDecodeError:
                    continue

                self._handle_incoming_envelope(envelope)
                self.emit(envelope.get("type", "message"), envelope.get("data"))
                self.emit("message", envelope)

                if not self.authenticated:
                    is_authenticated = envelope.get("type") != "Bye"
                    self.authenticated = is_authenticated

                    if is_authenticated:
                        self._start_connection_monitor()
                        if self._auth_future and not self._auth_future.done():
                            self._auth_future.set_result(True)
                        self.emit("connect")
                        asyncio.create_task(self._send_from_queue())
                    else:
                        if self._auth_future and not self._auth_future.done():
                            self._auth_future.set_exception(Exception(envelope.get("data")))

        except ConnectionClosed:
            pass

    async def _send_envelope(self, envelope: Dict[str, Any]):
        if self.is_ready and self.ws:
            try:
                await self.ws.send(json.dumps(envelope))
            except Exception as e:
                self._handle_envelope_send_error(envelope, e)
        else:
            error = NotReadyError("Cannot send - client is not ready or not authenticated")
            self._handle_envelope_send_error(envelope, error)

    async def _send_from_queue(self):
        last_delay = 0.0
        for envelope in list(self.send_queue):
            asyncio.create_task(self._delayed_send(envelope, last_delay))
            last_delay += self.await_queue_send_delay_ms / 1000.0
        self.send_queue.clear()

    async def _delayed_send(self, envelope: Dict[str, Any], delay: float):
        if delay > 0:
            await asyncio.sleep(delay)
        await self._send_envelope(envelope)

    def _is_connecting(self) -> bool:
        # In this simplistic logic we only track ready vs not ready
        return self._connect_task is not None and not self._connect_task.done() and not self.ws

    def _is_open(self) -> bool:
        return self.ws is not None and self.ws.open

    def _start_connection_monitor(self):
        if not self.ping_enabled:
            return

        self.last_received_message_at = time.time()
        self._ping_monitor_task = asyncio.create_task(self._ping_monitor_loop())

    def _stop_connection_monitor(self):
        if self._ping_monitor_task:
            self._ping_monitor_task.cancel()
            self._ping_monitor_task = None

    async def _ping_monitor_loop(self):
        while self.is_ready:
            await asyncio.sleep(1)

            now = time.time()
            if (now - self.last_received_message_at) * 1000 < self.ping_no_activity_timeout_ms:
                continue

            # Need to ping
            try:
                ping_future = asyncio.ensure_future(self.send("Ping", {}))

                # wait for ping response
                await asyncio.wait_for(ping_future, timeout=self.ping_pong_back_timeout_ms / 1000.0)
            except asyncio.TimeoutError:
                # Close socket to force reconnect
                if self.ws:
                    await self.ws.close(code=3000)
                break
            except Exception:
                pass

    def _stop_tasks(self):
        if self._receive_task:
            self._receive_task.cancel()
            self._receive_task = None
        if self._ping_monitor_task:
            self._ping_monitor_task.cancel()
            self._ping_monitor_task = None
        if self._connect_task:
            self._connect_task.cancel()
            self._connect_task = None
