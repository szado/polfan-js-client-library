import { Dto, DtoData } from "../Dto";
import { EnvelopeMeta } from "./EnvelopeMeta";
export declare class Envelope<T = any> extends Dto {
    readonly meta: EnvelopeMeta;
    readonly data: T;
    constructor(data: DtoData<Envelope>);
}
