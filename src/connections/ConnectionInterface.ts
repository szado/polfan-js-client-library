import {ObservableInterface} from "../ObservableInterface";

export enum ConnectionState {
    pending,
    ready,
    disconnected
}

export enum ConnectionEvent {
    message = 'message',
    connect = 'connect',
    disconnect = 'disconnect'
}

export interface ConnectionInterface extends ObservableInterface {
    state: ConnectionState,
    connect(): void;
    disconnect(): void;
    send(data: string): void;
}