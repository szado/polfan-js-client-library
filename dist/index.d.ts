import { Client } from "./Client";
import { WebApiConnection } from "./WebApiConnection";
import { MessageType as MessType } from "./MessageInterface";
import { getToken } from "./Token";
import { WebSocketConnection } from "./WebSocketConnection";
export declare const MessageType: typeof MessType;
export declare const client: {
    Client: typeof Client;
    connection: {
        WebApiConnection: typeof WebApiConnection;
        WebSocketConnection: typeof WebSocketConnection;
    };
};
export declare const auth: {
    getToken: typeof getToken;
};
