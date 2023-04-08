# pserv-js-client-library
TypeScript client library to handle connection with Polfan chat service.

## How to use?

```js
(async () => {
    // Get access token by credentials
    const token = await PServ.AuthClient.createToken('login', 'password');
    
    // Create web api client (there is also WebSocket client available)
    const client = new PServ.WebApiChatClient({
        token: token.token, // Pass received token
        url: 'https://pserv-api-address',
    });
    
    // Call `GetSession` command which returns user session data
    const session = await client.send('GetSession');
    
    console.log("My nick:", session.user.nick);
    console.log("The rooms you are in:", session.rooms);
    console.log("The spaces you are in:", session.spaces);
    console.log("The version of server you connected to:", session.serverVersion);
})();
```