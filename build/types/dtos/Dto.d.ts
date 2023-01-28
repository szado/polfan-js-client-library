export declare function cast<T extends typeof Dto>(data: any, dto: T): T | undefined;
export declare function castArray<T extends typeof Dto>(data: any[], dto: T): T[];
type ExcludeMethods<T> = Pick<T, {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T]>;
export type DtoData<T> = {
    [K in keyof ExcludeMethods<T>]: any;
};
export declare abstract class Dto {
    constructor(...args: any[]);
    toJson(overrideBy?: any): string;
    toRaw(overrideBy?: any): DtoData<this>;
    clone(overrideBy?: any): this;
    protected fill(data: any, overrideBy?: any): void;
}
export {};
