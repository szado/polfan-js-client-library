import { EventTarget, ObservableInterface } from "./EventTarget";
export declare class IndexedCollection<KeyT, ValueT> {
    protected _items: Map<KeyT, ValueT>;
    constructor(items?: [key: KeyT, value: ValueT][]);
    get items(): Map<KeyT, ValueT>;
    get length(): number;
    set(...items: [KeyT, ValueT][]): void;
    get(id: KeyT): ValueT | null;
    has(id: KeyT): boolean;
    delete(...ids: KeyT[]): void;
    deleteAll(): void;
    findBy(field: keyof ValueT, valueToFind: any, limit?: number): IndexedCollection<KeyT, ValueT>;
    map<MapT = any>(callback: (item: ValueT, index: KeyT) => MapT): MapT[];
}
export declare class IndexedObjectCollection<T> {
    readonly id: keyof T | ((item: T) => any);
    protected _items: IndexedCollection<string, T>;
    constructor(id: keyof T | ((item: T) => any), items?: T[]);
    get items(): T[];
    get length(): number;
    set(...items: T[]): void;
    get(id: any): T | null;
    getAt(index: number): T | null;
    has(id: any): boolean;
    delete(...ids: any[]): void;
    deleteAll(): void;
    findBy(field: keyof T, valueToFind: any, limit?: number): IndexedObjectCollection<T>;
    map<MapT = any>(callback: (item: T, index: number, array: T[]) => MapT): MapT[];
    protected getId(item: T): any;
}
interface ObservableCollectionEvent<KeyT> {
    setItems?: KeyT[];
    deletedItems?: KeyT[];
}
export declare class ObservableIndexedCollection<KeyT, ValueT> extends IndexedCollection<KeyT, ValueT> implements ObservableInterface {
    protected eventTarget: EventTarget<ObservableCollectionEvent<KeyT>>;
    constructor(items?: [key: KeyT, value: ValueT][]);
    set(...items: [KeyT, ValueT][]): void;
    delete(...ids: KeyT[]): void;
    deleteAll(): void;
    on(eventName: 'change', handler: (ev?: ObservableCollectionEvent<KeyT>) => void): this;
    once(eventName: 'change', handler: (ev?: ObservableCollectionEvent<KeyT>) => void): this;
    off(eventName: string, handler: (ev?: ObservableCollectionEvent<KeyT>) => void): this;
}
export declare class ObservableIndexedObjectCollection<T> extends IndexedObjectCollection<T> implements ObservableInterface {
    readonly id: keyof T | ((item: T) => string);
    protected eventTarget: EventTarget<ObservableCollectionEvent<string>>;
    constructor(id: keyof T | ((item: T) => string), items?: T[]);
    set(...items: T[]): void;
    delete(...ids: string[]): void;
    deleteAll(): void;
    on(eventName: 'change', handler: (ev?: ObservableCollectionEvent<string>) => void): this;
    once(eventName: 'change', handler: (ev?: ObservableCollectionEvent<string>) => void): this;
    off(eventName: string, handler: (ev?: ObservableCollectionEvent<string>) => void): this;
}
export {};
