import { Permission } from "../../Permission";
import { Dto, DtoData } from "../../Dto";
export declare class SetUserPermissions extends Dto {
    readonly permissions: Permission[];
    readonly layer: 'Global' | 'Space' | 'Room' | 'Topic';
    readonly layerId: string;
    readonly userId: string;
    constructor(data: DtoData<SetUserPermissions>);
}
