import { Dto, DtoData } from "../../Dto";
export declare class AssignRole extends Dto {
    readonly roleId: string;
    readonly spaceId: string;
    readonly userId: string;
    constructor(data: DtoData<AssignRole>);
}
