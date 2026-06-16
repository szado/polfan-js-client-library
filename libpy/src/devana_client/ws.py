import asyncio
import json
import logging
from typing import Optional, Dict, Any, Callable

import websockets

from .events import EventEmitter
from .exceptions import DevanaError

logger = logging.getLogger(__name__)

class WebSocketChatClient(EventEmitter):
    """
    Stateless asynchronous WebSocket client for Devana.
    Handles automatic reconnection, request-response matching via `ref`,
    and event dispatching.
    """

    def __init__(
        self,
        url: str,
        token: Optional[str] = None,
        ping_interval_ms: int = 25000,
        pong_timeout_ms: int = 10000,
        reconnect_delay_base_ms: int = 50,
        reconnect_delay_max_ms: int = 5000,
        query_params: Optional[Dict[str, str]] = None
    ):
        super().__init__()
        self.url = url
        self.token = token
        self.ping_interval = ping_interval_ms / 1000.0
        self.pong_timeout = pong_timeout_ms / 1000.0
        self.reconnect_delay_base = reconnect_delay_base_ms / 1000.0
        self.reconnect_delay_max = reconnect_delay_max_ms / 1000.0
        self.query_params = query_params or {}

        self._ws: Optional[websockets.WebSocketClientProtocol] = None
        self._sent_counter = 0
        self._pending_requests: Dict[str, asyncio.Future] = {}
        self._is_running = False
        self._connect_task: Optional[asyncio.Task] = None
        self._ping_task: Optional[asyncio.Task] = None

        self.authenticated = False

    @property
    def is_ready(self) -> bool:
        """Returns True if the socket is open and authenticated."""
        return self._ws is not None and self._ws.open and self.authenticated

    async def connect(self):
        """Starts the connection loop."""
        if self._is_running:
            return
        self._is_running = True
        self._connect_task = asyncio.create_task(self._connection_loop())

    async def disconnect(self):
        """Stops the connection loop and closes socket."""
        self._is_running = False
        if self._connect_task:
            self._connect_task.cancel()
        if self._ping_task:
            self._ping_task.cancel()
        if self._ws:
            await self._ws.close()
            self._ws = None

        # Cancel all pending requests
        for ref, future in self._pending_requests.items():
            if not future.done():
                future.set_exception(DevanaError("Client disconnected"))
        self._pending_requests.clear()

        self.emit("disconnect", False)

    def _build_url(self) -> str:
        url = self.url
        params = []
        if self.token:
            params.append(f"token={self.token}")
        for k, v in self.query_params.items():
            params.append(f"{k}={v}")
        if params:
            separator = "&" if "?" in url else "?"
            url += separator + "&".join(params)
        return url

    async def _connection_loop(self):
        attempt = 0
        while self._is_running:
            url = self._build_url()
            try:
                async with websockets.connect(url) as ws:
                    self._ws = ws
                    attempt = 0
                    self.authenticated = True  # Assuming success context
                    self.emit("connect")

                    self._ping_task = asyncio.create_task(self._ping_loop())

                    try:
                        async for message in ws:
                            await self._on_message(message)
                    except websockets.ConnectionClosed:
                        pass

            except Exception as e:
                logger.error(f"WebSocket connection error: {e}")
                self.emit("error", e)

            # Cleanup state after drop
            self.authenticated = False
            self.emit("disconnect", True)
            if self._ping_task:
                self._ping_task.cancel()

            # Reconnect backoff
            if self._is_running:
                delay = min(self.reconnect_delay_max, self.reconnect_delay_base * (2 ** attempt))
                logger.info(f"Reconnecting in {delay} seconds...")
                await asyncio.sleep(delay)
                attempt += 1

    async def _ping_loop(self):
        """Maintains connection with periodic application-level pings if needed."""
        try:
            while self._is_running and self.is_ready:
                await asyncio.sleep(self.ping_interval)
                try:
                    await self.send("Ping", {})
                except Exception as e:
                    logger.debug(f"Ping failed: {e}")
                    # Let the main loop handle the close
        except asyncio.CancelledError:
            pass

    async def _on_message(self, data: str):
        try:
            envelope = json.loads(data)

            # Handle specific session event if needed for auth logic match
            if envelope.get("type") == "Session":
                self.authenticated = True

            ref = envelope.get("ref")

            if ref and ref in self._pending_requests:
                future = self._pending_requests.pop(ref)
                if not future.done():
                    future.set_result(envelope)

            self.emit("message", envelope)
            self.emit(envelope.get("type", "unknown"), envelope.get("data", {}))

        except json.JSONDecodeError:
            logger.warning(f"Received non-JSON message: {data}")

    def _create_envelope(self, command_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._sent_counter += 1
        return {
            "type": command_type,
            "data": data,
            "ref": str(self._sent_counter)
        }

    async def send(self, command_type: str, command_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sends a command and waits for a response with a matching `ref`.
        """
        if not self._ws or not self._ws.open:
            raise DevanaError("Cannot send - client is not ready (no connection)")

        envelope = self._create_envelope(command_type, command_data)
        ref = envelope["ref"]

        loop = asyncio.get_running_loop()
        future = loop.create_future()
        self._pending_requests[ref] = future

        await self._ws.send(json.dumps(envelope))

        # Wait for the future to be resolved in _on_message
        return await future
