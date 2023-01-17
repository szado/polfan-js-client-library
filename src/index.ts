import {Client} from "./Client";
import {WebApiConnection} from "./connections/WebApiConnection";
import {getToken} from "./Token";
import {WebSocketConnection} from "./connections/WebSocketConnection";
import {events, commands} from "./protocol";
import {Dto} from "./dtos/Dto";
import {Envelope} from "./dtos/protocol/Envelope";
import {EnvelopeMeta} from "./dtos/protocol/EnvelopeMeta";

const connections = {
    WebApi: WebApiConnection, WebSocket: WebSocketConnection
};

const data = {
    Dto,
    Envelope,
    EnvelopeMeta,
    events, commands
}

export default {
    Client,
    connections,
    data,
    getToken
};