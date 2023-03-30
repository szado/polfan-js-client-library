import { ObservableInterface } from "./EventTarget";
import { AbstractClient, CommandResult, CommandsMap } from "./AbstractClient";
import { WebSocketStateTracker } from "./WebSocketStateTracker";
export interface WebSocketClientOptions {
    url: string;
    token?: string;
    temporaryNick?: string;
    connectingTimeoutMs?: number;
    awaitQueueSendDelayMs?: number;
    stateTracking?: boolean;
}
declare enum WebSocketClientEvent {
    connect = "connect",
    disconnect = "disconnect",
    message = "message",
    error = "error"
}
export declare class WebSocketClient extends AbstractClient implements ObservableInterface {
    private readonly options;
    readonly Event: typeof WebSocketClientEvent;
    readonly state?: WebSocketStateTracker;
    protected ws: WebSocket | null;
    protected sendQueue: [commandType: keyof CommandsMap, commandData: any][];
    protected connectingTimeoutId: any;
    protected authenticated: boolean;
    protected authenticatedResolvers: [() => void, (error: Error) => void];
    constructor(options: WebSocketClientOptions);
    connect(): Promise<void>;
    disconnect(): void;
    send<CommandType extends keyof CommandsMap>(commandType: CommandType, commandData: CommandsMap[CommandType][0]): Promise<CommandResult<CommandsMap[CommandType][1]>>;
    private onMessage;
    private onClose;
    private sendFromQueue;
    private triggerConnectionTimeout;
}
export {};
