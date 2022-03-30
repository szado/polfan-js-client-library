export interface MessageInterface<T = any> {
    meta: {
        ref: string,
        type: MessageType | string
    },
    data: T;
}

export enum MessageType {
    Error = 'Error',
}