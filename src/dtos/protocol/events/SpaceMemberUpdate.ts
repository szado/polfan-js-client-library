import {cast, Dto, DtoData} from "../../Dto";
import {SpaceMember} from "../../SpaceMember";

export class SpaceMemberUpdate extends Dto {
    public readonly member: SpaceMember;

    public constructor(data: DtoData<SpaceMemberUpdate>) {
        super();
        this.fill(data, {
            member: cast(data.member, SpaceMember),
        });
    }
}
