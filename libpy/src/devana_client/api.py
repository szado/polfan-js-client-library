import asyncio
import logging
from typing import Optional, Dict, Any

import aiohttp

from .events import EventEmitter
from .exceptions import DevanaApiError

logger = logging.getLogger(__name__)

class WebApiChatClient(EventEmitter):
    """
    Stateless asynchronous API client for Devana REST endpoints.
    Provides methods to make API calls using standard Python dicts/types.
    """

    def __init__(
        self,
        url: str,
        token: str,
        attempts_to_send: int = 10,
        attempt_delay_ms: int = 200,
        query_params: Optional[Dict[str, str]] = None
    ):
        super().__init__()
        self.url = url
        self.token = token
        self.attempts_to_send = attempts_to_send
        self.attempt_delay_ms = attempt_delay_ms
        self.query_params = query_params or {}

        self._sent_counter = 0
        self._session: Optional[aiohttp.ClientSession] = None

    async def __aenter__(self):
        self._session = aiohttp.ClientSession(
            headers={"Authorization": f"Bearer {self.token}"}
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self._session:
            await self._session.close()

    def _create_envelope(self, command_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._sent_counter += 1
        return {
            "type": command_type,
            "data": data,
            "ref": str(self._sent_counter)
        }

    async def send(self, command_type: str, command_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sends an API command. Automatically retries according to config.
        """
        if not self._session:
            # Create a transient session if not used as an async context manager
            async with aiohttp.ClientSession(headers={"Authorization": f"Bearer {self.token}"}) as session:
                return await self._make_request(session, command_type, command_data)
        else:
            return await self._make_request(self._session, command_type, command_data)

    async def _make_request(
        self, session: aiohttp.ClientSession, command_type: str, command_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        envelope = self._create_envelope(command_type, command_data)
        attempts = 0

        while attempts < self.attempts_to_send:
            try:
                async with session.post(
                    self.url,
                    json=envelope,
                    params=self.query_params
                ) as response:
                    if response.status >= 400:
                        text = await response.text()
                        logger.error(f"API Error {response.status}: {text}")
                        raise DevanaApiError(response.status, text)

                    response_envelope = await response.json()

                    # Emit events just like in JS
                    self.emit("message", response_envelope)
                    self.emit(response_envelope.get("type", "unknown"), response_envelope.get("data", {}))

                    return response_envelope
            except (aiohttp.ClientError, asyncio.TimeoutError) as e:
                attempts += 1
                logger.warning(f"Request failed (attempt {attempts}/{self.attempts_to_send}): {e}")
                if attempts >= self.attempts_to_send:
                    self.emit("error", e)
                    raise
                await asyncio.sleep(self.attempt_delay_ms / 1000.0)

        raise Exception("Max attempts reached")

    async def destroy(self):
        """Close session if any."""
        if self._session:
            await self._session.close()
            self._session = None
        self.emit("destroy", False)
