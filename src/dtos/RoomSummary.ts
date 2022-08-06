import {Dto, DtoData} from "./Dto";

export class RoomSummary extends Dto {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;

    public constructor(data: DtoData<RoomSummary>) {
        super();
        this.fill(data);
    }
}