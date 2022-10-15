import { Dto, DtoData } from "../Dto";
export declare class EnvelopeMeta extends Dto {
    readonly type: string;
    readonly ref?: string;
    constructor(data: DtoData<EnvelopeMeta>);
}
