import { Dto, DtoData } from "./Dto";
import { User } from "./User";
export declare class SpaceMember extends Dto {
    readonly user: User;
    readonly roles: string[];
    constructor(data: DtoData<SpaceMember>);
}
