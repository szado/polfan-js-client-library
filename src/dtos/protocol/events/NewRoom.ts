import {cast, Dto, DtoData} from "../../Dto";
import {RoomSummary} from "../../RoomSummary";

export class NewRoom extends Dto {
    public readonly summary: RoomSummary;
    public readonly spaceId: string;

    public constructor(data: DtoData<NewRoom>) {
        super();
        this.fill(data, {
            summary: cast(data.summary, RoomSummary),
        });
    }
}
