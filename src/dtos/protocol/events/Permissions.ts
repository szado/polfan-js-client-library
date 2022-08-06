import {castArray, Dto, DtoData} from "../../Dto";
import {Permission} from "../../Permission";

export class Permissions extends Dto {
    public readonly permissions: Permission[];

    public constructor(data: DtoData<Permissions>) {
        super();
        this.fill(data, {
            permissions: castArray(data.permissions, Permission),
        });
    }
}
