import {Client} from "./Client";
import {WebApiConnection} from "./WebApiConnection";
import {MessageType as MessType} from "./MessageInterface";
import {getToken} from "./Token";
import {WebSocketConnection} from "./WebSocketConnection";

export const MessageType = MessType;
export const client = {
    Client,
    connection: {
        WebApiConnection,
        WebSocketConnection
    }
};
export const auth = {
    getToken
};
