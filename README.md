# pserv-js-client-library
TypeScript client library to handle connection with Polfan chat service.

## How to use?

```js
(async function () {
    // Request new token and create client instance.
    const tokenData = await PServ.Client.getToken('login', 'pass');
    const client = new PServ.Client.createByToken(tokenData.token);

    // Bind the listener for each NewMessage event:
    client.on('NewMessage', ev => `${ev.message.author.nick} wrote: ${ev.message.content}`);

    // Send a message to the server:
    client.sendCommand(new PServ.commands.CreateMessage({
        content: 'Hello world!',
        topicId: 'xxxxxx-xxxxx-xxxxx-xxxxx-xxxxx'
    }));

    // You can handle result for specific command with returned promise:
    const result = client.sendCommand(new PServ.commands.GetSpaceMembers({id: 'xxx'}));
    console.log('Space member list', result.members)
})();
```