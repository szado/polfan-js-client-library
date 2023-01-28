import { Dto, DtoData } from "../../Dto";
export declare class CreateTopic extends Dto {
    readonly roomId: string;
    readonly name: string;
    readonly description: string;
    constructor(data: DtoData<CreateTopic>);
}
