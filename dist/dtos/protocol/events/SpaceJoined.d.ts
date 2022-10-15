import { Dto, DtoData } from "../../Dto";
import { Space } from "../../Space";
export declare class SpaceJoined extends Dto {
    readonly space: Space;
    constructor(data: DtoData<SpaceJoined>);
}
