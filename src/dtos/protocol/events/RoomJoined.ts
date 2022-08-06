import {cast, Dto, DtoData} from "../../Dto";
import {Room} from "../../Room";

export class RoomJoined extends Dto {
    public readonly room: Room;

    public constructor(data: DtoData<RoomJoined>) {
        super();
        this.fill(data, {
            room: cast(data.room, Room),
        });
    }
}
