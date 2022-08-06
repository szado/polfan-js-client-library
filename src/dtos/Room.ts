import {castArray, Dto, DtoData} from "./Dto";
import {Topic} from "./Topic";

export class Room extends Dto {
    public readonly id: string;
    public readonly name: string;
    public readonly topics: Topic[];

    public constructor(data: DtoData<Room>) {
        super();
        this.fill(data, {
            topics: castArray(data.topics, Topic),
        });
    }
}