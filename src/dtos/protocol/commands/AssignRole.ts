import {Dto, DtoData} from "../../Dto";

export class AssignRole extends Dto {
    public readonly roleId: string;
    public readonly spaceId: string;
    public readonly userId: string;

    public constructor(data: DtoData<AssignRole>) {
        super();
        this.fill(data);
    }
}
