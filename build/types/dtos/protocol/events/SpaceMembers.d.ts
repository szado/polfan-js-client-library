import { Dto, DtoData } from "../../Dto";
import { SpaceMember } from "../../SpaceMember";
export declare class SpaceMembers extends Dto {
    readonly members: SpaceMember[];
    constructor(data: DtoData<SpaceMembers>);
}
