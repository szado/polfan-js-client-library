import {Dto, DtoData} from "../../Dto";

export class GetRolePermissions extends Dto {
    public readonly layer: 'Space' | 'Room' | 'Topic';
    public readonly layerId: string;
    public readonly roleId: string;
    public readonly names: string[] | null | undefined;

    public constructor(data: DtoData<GetRolePermissions>) {
        super();
        this.fill(data);
    }
}