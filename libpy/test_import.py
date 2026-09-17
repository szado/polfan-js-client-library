import asyncio
from src.devana_client import WebApiChatClient, WebSocketChatClient

async def main():
    print("Testing WebApiChatClient instantiation")
    api = WebApiChatClient(url="http://test", token="test")
    print(f"WebApi client: {api}")

    print("Testing WebSocketChatClient instantiation")
    ws = WebSocketChatClient(url="ws://test", token="test")
    print(f"WebSocket client: {ws}")

    @ws.on("message")
    async def handle_message(msg):
        print(f"Got message: {msg}")

    print("Import test and event registration passed.")

if __name__ == "__main__":
    asyncio.run(main())
