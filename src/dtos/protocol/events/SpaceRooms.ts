import {castArray, Dto, DtoData} from "../../Dto";
import {RoomSummary} from "../../RoomSummary";

export class SpaceRooms extends Dto {
    public readonly summaries: RoomSummary[];

    public constructor(data: DtoData<SpaceRooms>) {
        super();
        this.fill(data, {
            summaries: castArray(data.summaries, RoomSummary),
        });
    }
}
