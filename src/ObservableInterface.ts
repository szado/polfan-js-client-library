export type EventHandler<T = any> = (...args: T[]) => void;

export interface ObservableInterface {
    on(eventName: string, handler: EventHandler): ObservableInterface;
}