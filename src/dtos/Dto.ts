export function cast<T extends typeof Dto>(data: any, dto: T): T {
    if (data instanceof dto) {
        return data as any;
    }
    return new (dto as any)(data);
}

export function castArray<T extends typeof Dto>(data: any[], dto: T): T[] {
    if (!Array.isArray(data)) throw new Error(`Passed data is not an array of ${dto.name}`);
    return data.map(item => cast(item, dto));
}

type ExcludeMethods<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>;
export type DtoData<T> = { [K in keyof ExcludeMethods<T>]: any };

export abstract class Dto {
    public constructor(...args: any[]) {
    }

    public toJson(overrideBy: any = {}): string {
        return JSON.stringify(this.toRaw(overrideBy));
    }

    public toRaw(overrideBy: any = {}): DtoData<this> {
        const object: {[key: string]: any} = {};
        Object.keys(this).forEach(key => {
            if (overrideBy.hasOwnProperty(key)) {
                object[key] = overrideBy[key];
            } else if ((this as any)[key] instanceof Dto) {
                object[key] = (this as any)[key].toRaw();
            } else {
                object[key] = (this as any)[key]
            }
        });
        return object as DtoData<this>;
    }

    public clone(overrideBy: any = {}): this {
        return new (this.constructor as any)(this.toRaw(overrideBy));
    }

    protected fill(data: any, overrideBy: any = {}) {
        Object.assign(this, {...data, ...overrideBy});
    }
}