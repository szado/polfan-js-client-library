import {Dto, DtoData} from "../../Dto";

export class DeassignRole extends Dto {
    public readonly roleId: string;
    public readonly spaceId: string;
    public readonly userId: string;

    public constructor(data: DtoData<DeassignRole>) {
        super();
        this.fill(data);
    }
}
