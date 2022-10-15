import { Dto, DtoData } from "../../Dto";
import { Room } from "../../Room";
export declare class RoomJoined extends Dto {
    readonly room: Room;
    constructor(data: DtoData<RoomJoined>);
}
