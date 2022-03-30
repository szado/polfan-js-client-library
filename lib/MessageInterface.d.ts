export interface MessageInterface<T = any> {
    meta: {
        ref: string;
        type: MessageType | string;
    };
    data: T;
}
export declare enum MessageType {
    Error = "Error"
}
