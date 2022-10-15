import { Dto, DtoData } from "../Dto";
import { ProtocolMetaData } from "./ProtocolMetaData";
export declare class ProtocolMessage<T = any> extends Dto {
    readonly meta: ProtocolMetaData;
    readonly data: T;
    constructor(data: DtoData<ProtocolMessage>);
}
