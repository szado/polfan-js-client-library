import {Dto, DtoData} from "../../Dto";

export class SpaceLeft extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<SpaceLeft>) {
        super();
        this.fill(data);
    }
}
