import {Dto, DtoData} from "../../Dto";

export class RoomMemberLeft extends Dto {
    public readonly userId: string;

    public constructor(data: DtoData<RoomMemberLeft>) {
        super();
        this.fill(data);
    }
}
