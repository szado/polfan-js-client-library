import {castArray, Dto, DtoData} from "../../Dto";
import {RoomMember} from "../../RoomMember";

export class RoomMembers extends Dto {
    public readonly members: RoomMember[];

    public constructor(data: DtoData<RoomMembers>) {
        super();
        this.fill(data, {
            members: castArray(data.members, RoomMember),
        });
    }
}
