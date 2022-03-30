export type EventHandler<T = any> = (...args: T[]) => void;

export interface ObservableInterface {
    on(eventName: string, handler: EventHandler): ObservableInterface;
}

export abstract class EventTarget implements ObservableInterface {
    protected events: Map<string, EventHandler[]> = new Map<string, EventHandler[]>();

    public on(eventName: string, handler: EventHandler): EventTarget {
        const handlers = this.events.get(eventName) ?? [];
        handlers.push(handler);
        this.events.set(eventName, handlers);
        return this;
    }

    public emit(eventName: string, ...args: any): EventTarget
    {
        this.events.get(eventName)?.forEach(callback => callback(...args));
        return this;
    }
}