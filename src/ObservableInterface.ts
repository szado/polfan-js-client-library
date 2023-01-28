export type EventHandler<T = any> = (...args: T[]) => void;
type HandlersMap = Map<string, EventHandler[]>;

export interface ObservableInterface {
    on(eventName: string, handler: EventHandler): ObservableInterface;
    once(eventName: string, handler: EventHandler): ObservableInterface;
}

export abstract class EventTarget implements ObservableInterface {
    protected events: HandlersMap = new Map<string, EventHandler[]>();
    protected onceEvents: HandlersMap = new Map<string, EventHandler[]>();

    public on(eventName: string, handler: EventHandler): EventTarget {
        this.addHandler(this.events, eventName, handler);
        return this;
    }

    public once(eventName: string, handler: EventHandler): EventTarget {
        this.addHandler(this.onceEvents, eventName, handler);
        return this;
    }

    public emit(eventName: string, ...args: any): EventTarget {
        this.callHandlers(this.events, eventName, args);
        this.callHandlers(this.onceEvents, eventName, args);
        this.onceEvents.delete(eventName);
        return this;
    }

    private addHandler(map: HandlersMap, eventName: string, handler: EventHandler): void {
        const handlers = map.get(eventName) ?? [];
        handlers.push(handler);
        map.set(eventName, handlers);
    }

    private callHandlers(map: HandlersMap, eventName: string, args: any[]): void {
        map.get(eventName)?.forEach(callback => callback(...args));
    }
}