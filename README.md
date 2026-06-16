# Devana Python Client

Async Python client library for Devana Chat Server. This library acts as a purely stateless infrastructure adapter for sending and receiving data over the Devana WebApi and WebSockets.

## Installation

You can install this package locally in development mode:

```bash
pip install -e .
```

## Structure
The library relies on `asyncio` and is organized as follows:
- `client.py`: Core logic for matching requests/responses and event dispatching.
- `api.py`: `WebApiChatClient` using `aiohttp` for REST interactions.
- `ws.py`: `WebSocketChatClient` using `websockets` for persistent connection.
- `exceptions.py`: Custom library exceptions.

## Usage

### Event Dispatching

The client provides an `EventTarget` interface allowing you to use decorators to handle incoming messages seamlessly.

```python
import asyncio
from devana_client import WebSocketChatClient

client = WebSocketChatClient(url="wss://devana.chat/ws", token="my-token")

@client.on("message")
async def handle_message(envelope):
    print("Received a generic message:", envelope)

@client.on("NewMessage")
async def handle_new_message(data):
    print("New chat message payload:", data)

async def main():
    await client.connect()
    print("Connected!")

    # Send a command
    result = await client.send("JoinRoom", {"roomId": "123"})
    print("Join Result:", result)

    # Keep running
    await asyncio.sleep(3600)

if __name__ == "__main__":
    asyncio.run(main())
```

## Constraints
This library does not implement local caches, state tracking, or complex user maps.
