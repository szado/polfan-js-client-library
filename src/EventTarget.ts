export type EventHandler<EventT> = (ev?: EventT) => void;
type HandlersMap<EventT> = Map<string, EventHandler<EventT>[]>;

export interface ObservableInterface<EventT = any> {
    on(eventName: string, handler: EventHandler<EventT>): this;
    once(eventName: string, handler: EventHandler<EventT>): this;
    off(eventName: string, handler: EventHandler<EventT>): this;
}

export class EventTarget<EventT = any> implements ObservableInterface<EventT> {
    protected events: HandlersMap<EventT> = new Map<string, EventHandler<EventT>[]>();
    protected onceEvents: HandlersMap<EventT> = new Map<string, EventHandler<EventT>[]>();

    public on(eventName: string, handler: EventHandler<EventT>): this {
        this.addHandler(this.events, eventName, handler);
        return this;
    }

    public once(eventName: string, handler: EventHandler<EventT>): this {
        this.addHandler(this.onceEvents, eventName, handler);
        return this;
    }

    public off(eventName: string, handler: EventHandler<EventT>): this {
        const index = this.events.get(eventName)?.indexOf(handler);
        if (!index || index < 0) {
            return this;
        }
        this.events.get(eventName).splice(index, 1);
    }

    public emit(eventName: string, event?: EventT): this {
        this.callHandlers(this.events, eventName, event);
        this.callHandlers(this.onceEvents, eventName, event);
        this.onceEvents.delete(eventName);
        return this;
    }

    private addHandler(map: HandlersMap<EventT>, eventName: string, handler: EventHandler<EventT>): void {
        const handlers = map.get(eventName) ?? [];
        handlers.push(handler);
        map.set(eventName, handlers);
    }

    private callHandlers(map: HandlersMap<EventT>, eventName: string, event: EventT): void {
        map.get(eventName)?.forEach(callback => callback(event));
    }
}