import { Dto, DtoData } from "../../Dto";
export declare class RoleDeleted extends Dto {
    readonly roleId: string;
    readonly spaceId: string;
    constructor(data: DtoData<RoleDeleted>);
}
