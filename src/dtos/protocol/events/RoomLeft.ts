import {Dto, DtoData} from "../../Dto";

export class RoomLeft extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<RoomLeft>) {
        super();
        this.fill(data);
    }
}
