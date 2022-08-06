import {Dto, DtoData} from "../../Dto";

export class DeleteRole extends Dto {
    public readonly roleId: string;
    public readonly spaceId: string;

    public constructor(data: DtoData<DeleteRole>) {
        super();
        this.fill(data);
    }
}
