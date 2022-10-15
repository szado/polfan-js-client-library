import { Dto, DtoData } from "../../Dto";
import { SpaceMember } from "../../SpaceMember";
export declare class SpaceMemberUpdate extends Dto {
    readonly member: SpaceMember;
    constructor(data: DtoData<SpaceMemberUpdate>);
}
