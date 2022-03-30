import { Client } from "./Client";
import { WebApiConnection } from "./WebApiConnection";
import { MessageType } from "./MessageInterface";
import { getToken } from "./Token";
export declare const PolfanServer: {
    MessageType: typeof MessageType;
    client: {
        Client: typeof Client;
        connection: {
            WebApiConnection: typeof WebApiConnection;
        };
    };
    auth: {
        getToken: typeof getToken;
    };
};
