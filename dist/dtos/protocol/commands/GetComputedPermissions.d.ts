import { Dto, DtoData } from "../../Dto";
export declare class GetComputedPermissions extends Dto {
    readonly names: string[] | null | undefined;
    readonly spaceId: string;
    readonly roomId: string;
    readonly topicId: string;
    constructor(data: DtoData<GetComputedPermissions>);
}
