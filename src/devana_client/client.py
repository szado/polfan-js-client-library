import asyncio
from typing import Callable, Coroutine, Any, Dict, List, Set
import logging

logger = logging.getLogger(__name__)

class EventTarget:
    """
    A simple event dispatcher that supports async callbacks.
    Allows registering events using decorators.
    """
    def __init__(self):
        self._listeners: Dict[str, List[Callable[..., Coroutine[Any, Any, None]]]] = {}
        self._background_tasks: Set[asyncio.Task] = set()

    def on(self, event_name: str):
        """
        Decorator to register an async callback for an event.

        Example:
            @client.on("message")
            async def on_message(envelope):
                print(envelope)
        """
        def decorator(func: Callable[..., Coroutine[Any, Any, None]]):
            if event_name not in self._listeners:
                self._listeners[event_name] = []
            self._listeners[event_name].append(func)
            return func
        return decorator

    def emit(self, event_name: str, *args, **kwargs):
        """
        Emits an event, scheduling all registered callbacks as tasks.
        Maintains strong references to tasks to avoid garbage collection.
        """
        if event_name in self._listeners:
            for listener in self._listeners[event_name]:
                task = asyncio.create_task(listener(*args, **kwargs))
                self._background_tasks.add(task)
                task.add_done_callback(self._background_tasks.discard)


class AbstractChatClient(EventTarget):
    """
    Base class for chat clients. Provides mechanisms for request-response matching
    using envelopes with unique 'ref's.
    """
    def __init__(self):
        super().__init__()
        self.awaiting_response: Dict[str, asyncio.Future] = {}
        self.sent_counter: int = 0

    async def send(self, command_type: str, command_data: Any) -> Dict[str, Any]:
        """
        Subclasses must implement this method to actually send the data.
        Returns a dictionary with 'data' and 'error'.
        """
        raise NotImplementedError("Subclasses must implement send()")

    def _create_envelope(self, command_type: str, data: Any) -> Dict[str, Any]:
        self.sent_counter += 1
        return {
            "type": command_type,
            "data": data,
            "ref": str(self.sent_counter)
        }

    def _create_future_from_envelope(self, envelope: Dict[str, Any]) -> asyncio.Future:
        ref = envelope["ref"]
        future = asyncio.get_running_loop().create_future()
        self.awaiting_response[ref] = future
        return future

    def _handle_incoming_envelope(self, envelope: Dict[str, Any]):
        ref = envelope.get("ref")
        if not ref or ref not in self.awaiting_response:
            return

        future = self.awaiting_response.pop(ref)
        if not future.done():
            is_error = envelope.get("type") == "Error"
            result = {
                "data": None if is_error else envelope.get("data"),
                "error": envelope.get("data") if is_error else None
            }
            future.set_result(result)

    def _handle_envelope_send_error(self, envelope: Dict[str, Any], error: Exception):
        ref = envelope.get("ref")
        if ref and ref in self.awaiting_response:
            future = self.awaiting_response.pop(ref)
            if not future.done():
                future.set_exception(error)
