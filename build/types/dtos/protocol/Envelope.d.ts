import { Dto, DtoData } from "../Dto";
export declare class Envelope<T = any> extends Dto {
    readonly type: string;
    readonly ref?: string;
    readonly data: T;
    constructor(data: DtoData<Envelope>);
}
