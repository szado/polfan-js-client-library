import {IndexedCollection} from "../IndexedObjectCollection";

type DeferredTask = {resolver: () => void, promise: Promise<void>};

export class DeferredTasksManager {
    private readonly tasks = new IndexedCollection<string, DeferredTask>();

    public create(name: string): void {
        if (this.tasks.has(name)) {
            return;
        }

        const deferred: DeferredTask = {promise: undefined, resolver: undefined};

        deferred.promise = new Promise(resolve => deferred.resolver = () => {
            this.tasks.delete(name);
            resolve();
        });

        this.tasks.set([name, deferred]);
    }

    public async task(name: string): Promise<void> {
        if (this.tasks.has(name)) {
            return this.tasks.get(name).promise;
        }
    }

    public complete(name: string): void {
        this.tasks.get(name)?.resolver();
    }

    public exists(name: string): boolean {
        return this.tasks.has(name);
    }
}