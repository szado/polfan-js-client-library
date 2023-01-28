import { Dto, DtoData } from "../../Dto";
export declare class DeleteRole extends Dto {
    readonly roleId: string;
    readonly spaceId: string;
    constructor(data: DtoData<DeleteRole>);
}
