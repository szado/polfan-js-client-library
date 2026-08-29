import asyncio
import inspect
import logging

logger = logging.getLogger(__name__)

class EventEmitter:
    """Simple event emitter to handle async and sync callbacks for events."""

    def __init__(self):
        self._handlers = {}

    def on(self, event_name: str):
        """Decorator to register an event handler for a specific event."""
        def decorator(func):
            if event_name not in self._handlers:
                self._handlers[event_name] = []
            self._handlers[event_name].append(func)
            return func
        return decorator

    def emit(self, event_name: str, *args, **kwargs):
        """Emit an event, calling all registered handlers asynchronously."""
        if event_name not in self._handlers:
            return

        for handler in self._handlers[event_name]:
            try:
                if inspect.iscoroutinefunction(handler):
                    asyncio.create_task(handler(*args, **kwargs))
                else:
                    handler(*args, **kwargs)
            except Exception as e:
                logger.error(f"Error executing handler for event '{event_name}': {e}")
