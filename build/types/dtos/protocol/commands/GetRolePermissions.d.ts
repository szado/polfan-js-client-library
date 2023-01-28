import { Dto, DtoData } from "../../Dto";
export declare class GetRolePermissions extends Dto {
    readonly layer: 'Space' | 'Room' | 'Topic';
    readonly layerId: string;
    readonly roleId: string;
    readonly names: string[] | null | undefined;
    constructor(data: DtoData<GetRolePermissions>);
}
