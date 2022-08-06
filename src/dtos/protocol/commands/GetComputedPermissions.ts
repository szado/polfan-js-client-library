import {Dto, DtoData} from "../../Dto";

export class GetComputedPermissions extends Dto {
    public readonly names: string[] | null | undefined;
    public readonly spaceId: string;
    public readonly roomId: string;
    public readonly topicId: string;

    public constructor(data: DtoData<GetComputedPermissions>) {
        super();
        this.fill(data);
    }
}
