import { Dto, DtoData } from "./Dto";
import { User } from "./User";
export declare class RoomMember extends Dto {
    readonly user: User;
    constructor(data: DtoData<RoomMember>);
}
