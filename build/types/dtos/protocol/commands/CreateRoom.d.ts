import { Dto, DtoData } from "../../Dto";
export declare class CreateRoom extends Dto {
    readonly spaceId: string;
    readonly name: string;
    readonly description: string;
    constructor(data: DtoData<CreateRoom>);
}
