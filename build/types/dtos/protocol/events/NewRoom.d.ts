import { Dto, DtoData } from "../../Dto";
import { RoomSummary } from "../../RoomSummary";
export declare class NewRoom extends Dto {
    readonly summary: RoomSummary;
    readonly spaceId: string;
    constructor(data: DtoData<NewRoom>);
}
