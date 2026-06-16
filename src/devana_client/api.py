import asyncio
import aiohttp
from typing import Any, Dict, Optional
from urllib.parse import urlencode

from .client import AbstractChatClient
from .exceptions import ApiError


class AbstractRestClient:
    """
    Base class for making REST API calls using aiohttp.
    """
    def __init__(self, url: str, token: str):
        self.url = url.rstrip("/")
        self.token = token

    async def send_request(
        self,
        method: str,
        uri: str,
        data: Optional[Dict[str, Any]] = None,
        additional_headers: Optional[Dict[str, str]] = None
    ) -> Dict[str, Any]:
        """
        Sends an HTTP request and returns a dictionary structured as:
        {"ok": bool, "status": int, "data": Any}
        """
        full_url = f"{self.url}/{uri.lstrip('/')}"

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        if additional_headers:
            headers.update(additional_headers)

        params = None
        json_body = None

        if data:
            if method.upper() in ["GET", "DELETE"]:
                params = data
            else:
                json_body = data

        async with aiohttp.ClientSession() as session:
            async with session.request(
                method=method.upper(),
                url=full_url,
                headers=headers,
                params=params,
                json=json_body
            ) as response:
                content_type = response.headers.get("Content-Type", "")
                if "application/json" in content_type:
                    resp_data = await response.json()
                else:
                    resp_data = await response.text()

                return {
                    "ok": response.ok,
                    "status": response.status,
                    "data": resp_data
                }


class WebApiChatClient(AbstractChatClient):
    """
    Client for interacting with the Devana Chat Server via the REST WebAPI.
    """
    def __init__(
        self,
        url: str,
        token: str,
        attempts_to_send: int = 10,
        attempt_delay_ms: int = 3000,
        query_params: Optional[Dict[str, str]] = None
    ):
        super().__init__()
        self.url = url
        self.token = token
        self.attempts_to_send = attempts_to_send
        self.attempt_delay_ms = attempt_delay_ms
        self.query_params = query_params or {}

        self.send_stack: list = []

    async def send(self, command_type: str, command_data: Any) -> Dict[str, Any]:
        """
        Sends a command using the REST API.
        """
        envelope = self._create_envelope(command_type, command_data)

        # In a purely stateless way without storing a list of stacks,
        # we can just make the async call directly with retry logic.
        future = self._create_future_from_envelope(envelope)

        # Schedule the API call in the background
        asyncio.create_task(self._make_api_call(envelope))

        return await future

    def destroy(self):
        """
        Cancels all awaiting requests.
        """
        for future in self.awaiting_response.values():
            if not future.done():
                future.cancel()
        self.awaiting_response.clear()
        self.emit("destroy", False)

    async def _make_api_call(self, envelope: Dict[str, Any]):
        attempts = 0

        base_url = self.url
        if self.query_params:
            qs = urlencode(self.query_params)
            base_url = f"{self.url}?{qs}" if "?" not in self.url else f"{self.url}&{qs}"

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {self.token}"
        }

        while attempts < self.attempts_to_send:
            attempts += 1
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(base_url, json=envelope, headers=headers) as response:
                        if response.ok:
                            resp_envelope = await response.json()
                            self._handle_incoming_envelope(resp_envelope)
                            self.emit(resp_envelope.get("type", "message"), resp_envelope.get("data"))
                            self.emit("message", resp_envelope)
                            return
                        else:
                            # Try again if it's a transient failure, otherwise might raise
                            pass
            except Exception as e:
                pass

            if attempts >= self.attempts_to_send:
                self._handle_envelope_send_error(
                    envelope,
                    ApiError(f"Cannot send {envelope}; aborting after reaching maximum connection errors")
                )
                return

            # Wait before retry
            await asyncio.sleep(self.attempt_delay_ms / 1000.0)
