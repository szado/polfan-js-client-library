export type EventHandler<T = any> = (...args: T[]) => void;
type HandlersMap = Map<string, EventHandler[]>;
export interface ObservableInterface {
    on(eventName: string, handler: EventHandler): ObservableInterface;
    once(eventName: string, handler: EventHandler): ObservableInterface;
}
export declare abstract class EventTarget implements ObservableInterface {
    protected events: HandlersMap;
    protected onceEvents: HandlersMap;
    on(eventName: string, handler: EventHandler): EventTarget;
    once(eventName: string, handler: EventHandler): EventTarget;
    emit(eventName: string, ...args: any): EventTarget;
    private addHandler;
    private callHandlers;
}
export {};
