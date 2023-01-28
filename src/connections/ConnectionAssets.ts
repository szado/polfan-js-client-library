import {ObservableInterface} from "../ObservableInterface";

export enum ChatConnectionEvent {
    message = 'message',
    destroy = 'destroy',
    ready = 'ready',
    error = 'error',
}

export interface ConnectionOptionsInterface {
    url: string;
    token?: string;
    temporaryNick?: string;
}

export interface ChatConnectionInterface extends ObservableInterface {
    send(data: any): void;
    destroy(): void;
}