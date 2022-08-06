import {cast, Dto, DtoData} from "../../Dto";
import {SpaceMember} from "../../SpaceMember";

export class SpaceMemberJoined extends Dto {
    public readonly member: SpaceMember;

    public constructor(data: DtoData<SpaceMemberJoined>) {
        super();
        this.fill(data, {
            member: cast(data.member, SpaceMember),
        });
    }
}
