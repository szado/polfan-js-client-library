import {Dto, DtoData} from "../../Dto";

export class RoomDeleted extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<RoomDeleted>) {
        super();
        this.fill(data);
    }
}
