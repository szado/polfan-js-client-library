import { EventTarget } from "./ObservableInterface";
import { ConnectionInterface, ConnectionState } from "./ConnectionInterface";
interface WebSocketConnectionConfig {
    url: string;
    token: string;
}
export declare class WebSocketConnection extends EventTarget implements ConnectionInterface {
    private config;
    state: ConnectionState;
    private ws;
    constructor(config: WebSocketConnectionConfig);
    connect(): void;
    disconnect(): void;
    send(data: object): void;
    private onMessage;
    private onClose;
    private onOpen;
}
export {};
