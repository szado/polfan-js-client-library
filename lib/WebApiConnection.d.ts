import { ConnectionState } from "./ConnectionInterface";
import { EventTarget } from "./ObservableInterface";
export interface WebApiConnectionConfig {
    token: string;
    url: string;
}
export declare class WebApiConnection extends EventTarget {
    private readonly config;
    state: ConnectionState;
    constructor(config: WebApiConnectionConfig);
    connect(): void;
    disconnect(): void;
    send(data: object): void;
    private onMessage;
}
