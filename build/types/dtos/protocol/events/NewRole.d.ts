import { Dto, DtoData } from "../../Dto";
import { Role } from "../../Role";
export declare class NewRole extends Dto {
    readonly spaceId: string;
    readonly role: Role;
    constructor(data: DtoData<NewRole>);
}
