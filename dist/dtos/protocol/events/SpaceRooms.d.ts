import { Dto, DtoData } from "../../Dto";
import { RoomSummary } from "../../RoomSummary";
export declare class SpaceRooms extends Dto {
    readonly summaries: RoomSummary[];
    constructor(data: DtoData<SpaceRooms>);
}
