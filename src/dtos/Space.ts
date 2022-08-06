import {castArray, Dto, DtoData} from "./Dto";
import {Role} from "./Role";

export class Space extends Dto {
    public readonly id: string;
    public readonly name: string;
    public readonly roles: Role[];

    public constructor(data: DtoData<Space>) {
        super();
        this.fill(data, {
            roles: castArray(data.roles, Role)
        });
    }
}