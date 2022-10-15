import { Dto, DtoData } from "../../Dto";
import { Permission } from "../../Permission";
export declare class Permissions extends Dto {
    readonly permissions: Permission[];
    constructor(data: DtoData<Permissions>);
}
