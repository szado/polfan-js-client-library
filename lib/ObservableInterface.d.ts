export declare type EventHandler<T = any> = (...args: T[]) => void;
export interface ObservableInterface {
    on(eventName: string, handler: EventHandler): ObservableInterface;
}
export declare abstract class EventTarget implements ObservableInterface {
    protected events: Map<string, EventHandler[]>;
    on(eventName: string, handler: EventHandler): EventTarget;
    emit(eventName: string, ...args: any): EventTarget;
}
