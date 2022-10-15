import { ObservableInterface } from "../ObservableInterface";
export declare enum ConnectionState {
    pending = 0,
    ready = 1,
    disconnected = 2
}
export declare enum ConnectionEvent {
    message = "message",
    connect = "connect",
    disconnect = "disconnect"
}
export interface ConnectionInterface extends ObservableInterface {
    state: ConnectionState;
    connect(): void;
    disconnect(): void;
    send(data: string): void;
}
