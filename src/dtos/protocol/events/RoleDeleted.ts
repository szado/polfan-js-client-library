import {Dto, DtoData} from "../../Dto";

export class RoleDeleted extends Dto {
    public readonly roleId: string;
    public readonly spaceId: string;

    public constructor(data: DtoData<RoleDeleted>) {
        super();
        this.fill(data);
    }
}
