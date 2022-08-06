import {Dto, DtoData} from "../../Dto";

export class GetRoomMembers extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<GetRoomMembers>) {
        super();
        this.fill(data);
    }
}
