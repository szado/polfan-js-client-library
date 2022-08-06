import {Dto, DtoData} from "../../Dto";

export class SpaceDeleted extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<SpaceDeleted>) {
        super();
        this.fill(data);
    }
}
