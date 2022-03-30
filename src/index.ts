import {Client} from "./Client";
import {WebApiConnection} from "./WebApiConnection";
import {MessageType} from "./MessageInterface";
import {getToken} from "./Token";

export const PolfanServer = {
    MessageType,
    client: {
        Client,
        connection: {
            WebApiConnection
        }
    },
    auth: {
        getToken
    }
};