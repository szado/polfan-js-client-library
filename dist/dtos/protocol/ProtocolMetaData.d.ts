import { Dto, DtoData } from "../Dto";
export declare class ProtocolMetaData extends Dto {
    readonly type: string;
    readonly ref?: string;
    constructor(data: DtoData<ProtocolMetaData>);
}
