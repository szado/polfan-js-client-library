export declare class DeferredTask {
    readonly promise: Promise<void>;
    resolve: () => void;
    constructor();
}
export declare class PromiseRegistry {
    private promises;
    register<T = any>(promise: Promise<T>, key: string): void;
    registerByFunction(fn: () => Promise<any>, key: string): void;
    get<T = any>(key: string): Promise<T> | undefined;
    has(key: string): boolean;
    notExist(key: string): boolean;
    forget(...keys: string[]): void;
    forgetAll(): void;
}
