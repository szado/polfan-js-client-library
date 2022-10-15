import { Dto, DtoData } from "./Dto";
import { Topic } from "./Topic";
export declare class Room extends Dto {
    readonly id: string;
    readonly name: string;
    readonly topics: Topic[];
    constructor(data: DtoData<Room>);
}
