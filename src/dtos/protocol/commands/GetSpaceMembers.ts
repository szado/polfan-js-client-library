import {Dto, DtoData} from "../../Dto";

export class GetSpaceMembers extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<GetSpaceMembers>) {
        super();
        this.fill(data);
    }
}
