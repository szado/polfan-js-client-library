import {castArray, Dto, DtoData} from "../../Dto";
import {Permission} from "../../Permission";

export class SetRolePermissions extends Dto {
    public readonly permissions: Permission[];
    public readonly layer: 'Space' | 'Room' | 'Topic';
    public readonly layerId: string;
    public readonly roleId: string;

    public constructor(data: DtoData<SetRolePermissions>) {
        super();
        this.fill(data, {
            permissions: castArray(data.permissions, Permission),
        });
    }
}
