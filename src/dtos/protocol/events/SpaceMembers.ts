import {castArray, Dto, DtoData} from "../../Dto";
import {SpaceMember} from "../../SpaceMember";

export class SpaceMembers extends Dto {
    public readonly members: SpaceMember[];

    public constructor(data: DtoData<SpaceMembers>) {
        super();
        this.fill(data, {
            members: castArray(data.members, SpaceMember),
        });
    }
}
