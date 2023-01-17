import { Client } from "./Client";
import { WebApiConnection } from "./connections/WebApiConnection";
import { getToken } from "./Token";
import { WebSocketConnection } from "./connections/WebSocketConnection";
import { Dto } from "./dtos/Dto";
import { Envelope } from "./dtos/protocol/Envelope";
import { EnvelopeMeta } from "./dtos/protocol/EnvelopeMeta";
declare const _default: {
    Client: typeof Client;
    connections: {
        WebApi: typeof WebApiConnection;
        WebSocket: typeof WebSocketConnection;
    };
    data: {
        Dto: typeof Dto;
        Envelope: typeof Envelope;
        EnvelopeMeta: typeof EnvelopeMeta;
        events: {
            [x: string]: typeof Dto;
        };
        commands: {
            [x: string]: typeof Dto;
        };
    };
    getToken: typeof getToken;
};
export default _default;
