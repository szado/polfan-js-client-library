import { Dto, DtoData } from "../../Dto";
import { RoomMember } from "../../RoomMember";
export declare class RoomMemberJoined extends Dto {
    readonly member: RoomMember;
    constructor(data: DtoData<RoomMemberJoined>);
}
