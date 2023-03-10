import { EventTarget } from "../ObservableInterface";
import { ChatConnectionInterface, ConnectionOptionsInterface } from "./ConnectionAssets";
export interface WebSocketConnectionInterface extends ConnectionOptionsInterface {
    awaitQueueSendDelayMs?: number;
    connectingTimeoutMs?: number;
}
export declare class WebSocketConnection extends EventTarget implements ChatConnectionInterface {
    private readonly options;
    protected ws: WebSocket | null;
    protected sendQueue: any[];
    protected connectingTimeoutId: any;
    protected authenticated: boolean;
    constructor(options: WebSocketConnectionInterface);
    init(): void;
    send(data: any): void;
    destroy(): void;
    private connect;
    private onMessage;
    private onClose;
    private sendFromQueue;
    private triggerConnectionTimeout;
}
