import { Dto, DtoData } from "../../Dto";
import { Permission } from "../../Permission";
export declare class SetRolePermissions extends Dto {
    readonly permissions: Permission[];
    readonly layer: 'Space' | 'Room' | 'Topic';
    readonly layerId: string;
    readonly roleId: string;
    constructor(data: DtoData<SetRolePermissions>);
}
