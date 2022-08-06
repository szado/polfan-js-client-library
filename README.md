# pserv-js-client-library
JavaScript client library to handle connection with Polfan chat service with TypeScript support.

## How to use?

```js
// Create a client; WebSocket and WebApi connections are supported.
const connection = new PServ.connections.WebSocket({
    url: 'wss://s1.polfan.pl/ws',
    token: await PServ.getToken('login', 'password', 'Client Name')
});
const client = new PServ.Client(connection);

// Bind the listener for each NewMessage events.
client.on('NewMessage', ev => `${ev.message.author.nick} wrote: ${ev.message.content}`);

// Send a message to the server on connect.
connection.on('connect', () => client.exec(new PServ.data.commands.CreateMessage({
    content: 'Hello world!',
    topicId: 'xxxxxx-xxxxx-xxxxx-xxxxx-xxxxx'
})));

// Connect to server.
connection.connect();
```