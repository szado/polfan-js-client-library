import {Space} from "./Space";
import {Room} from "./Room";
import {castArray, Dto, DtoData} from "./Dto";

export class UserState extends Dto {
    public readonly spaces: Space[];
    public readonly rooms: Room[];

    public constructor(data: DtoData<UserState>) {
        super();
        this.fill(data, {
            spaces: castArray(data.spaces, Space),
            rooms: castArray(data.rooms, Room),
        });
    }
}