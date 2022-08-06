import {cast, Dto, DtoData} from "../../Dto";
import {RoomMember} from "../../RoomMember";

export class RoomMemberJoined extends Dto {
    public readonly member: RoomMember;

    public constructor(data: DtoData<RoomMemberJoined>) {
        super();
        this.fill(data, {
            member: cast(data.member, RoomMember),
        });
    }
}
