import { Dto, DtoData } from "./Dto";
import { Role } from "./Role";
export declare class Space extends Dto {
    readonly id: string;
    readonly name: string;
    readonly roles: Role[];
    constructor(data: DtoData<Space>);
}
