import { Space } from "./Space";
import { Room } from "./Room";
import { Dto, DtoData } from "./Dto";
export declare class UserState extends Dto {
    readonly spaces: Space[];
    readonly rooms: Room[];
    constructor(data: DtoData<UserState>);
}
