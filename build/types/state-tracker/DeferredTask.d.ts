export declare class DeferredTask {
    readonly promise: Promise<void>;
    resolve: () => void;
    constructor();
}
