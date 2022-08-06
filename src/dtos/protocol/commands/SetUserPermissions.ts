import {Permission} from "../../Permission";
import {castArray, Dto, DtoData} from "../../Dto";

export class SetUserPermissions extends Dto {
    public readonly permissions: Permission[];
    public readonly layer: 'Global' | 'Space' | 'Room' | 'Topic';
    public readonly layerId: string;
    public readonly userId: string;

    public constructor(data: DtoData<SetUserPermissions>) {
        super();
        this.fill(data, {
            permissions: castArray(data.permissions, Permission),
        });
    }
}
