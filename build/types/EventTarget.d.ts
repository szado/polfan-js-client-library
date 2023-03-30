export type EventHandler<EventT> = (ev?: EventT) => void;
type HandlersMap<EventT> = Map<string, EventHandler<EventT>[]>;
export interface ObservableInterface<EventT = any> {
    on(eventName: string, handler: EventHandler<EventT>): this;
    once(eventName: string, handler: EventHandler<EventT>): this;
}
export declare class EventTarget<EventT = any> implements ObservableInterface<EventT> {
    protected events: HandlersMap<EventT>;
    protected onceEvents: HandlersMap<EventT>;
    on(eventName: string, handler: EventHandler<EventT>): this;
    once(eventName: string, handler: EventHandler<EventT>): this;
    emit(eventName: string, event?: EventT): this;
    private addHandler;
    private callHandlers;
}
export {};
