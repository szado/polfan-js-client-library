export class DeferredTask {
    public readonly promise: Promise<void>;
    public resolve: () => void;

    public constructor() {
        this.promise = new Promise<void>(resolve => this.resolve = resolve);
    }
}