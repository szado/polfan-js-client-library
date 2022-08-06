import {Dto, DtoData} from "../../Dto";

export class SpaceMemberLeft extends Dto {
    public readonly userId: string;

    public constructor(data: DtoData<SpaceMemberLeft>) {
        super();
        this.fill(data);
    }
}
