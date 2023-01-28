import { Dto, DtoData } from "../../Dto";
import { RoomMember } from "../../RoomMember";
export declare class RoomMembers extends Dto {
    readonly members: RoomMember[];
    constructor(data: DtoData<RoomMembers>);
}
