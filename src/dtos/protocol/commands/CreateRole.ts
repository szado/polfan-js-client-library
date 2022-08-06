import {Dto, DtoData} from "../../Dto";

export class CreateRole extends Dto {
    public readonly spaceId: string;
    public readonly name: string;
    public readonly color: string;

    public constructor(data: DtoData<CreateRole>) {
        super();
        this.fill(data);
    }
}
