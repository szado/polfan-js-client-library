import { Dto, DtoData } from "../../Dto";
import { Topic } from "../../Topic";
export declare class NewTopic extends Dto {
    readonly roomId: string;
    readonly topic: Topic;
    constructor(data: DtoData<NewTopic>);
}
