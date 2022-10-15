import { Dto, DtoData } from "../../Dto";
import { SpaceMember } from "../../SpaceMember";
export declare class SpaceMemberJoined extends Dto {
    readonly member: SpaceMember;
    constructor(data: DtoData<SpaceMemberJoined>);
}
