import { ConnectionInterface, ConnectionState } from "./ConnectionInterface";
import { EventTarget } from "../ObservableInterface";
export interface WebApiConnectionConfig {
    token: string;
    url: string;
}
export declare class WebApiConnection extends EventTarget implements ConnectionInterface {
    private readonly config;
    state: ConnectionState;
    constructor(config: WebApiConnectionConfig);
    connect(): void;
    disconnect(): void;
    send(data: string): void;
    private onMessage;
}
