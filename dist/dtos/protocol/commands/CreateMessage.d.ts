import { Dto, DtoData } from "../../Dto";
import { Message } from "../../Message";
export declare class CreateMessage extends Dto {
    readonly topicId: string;
    readonly content: string;
    constructor(data: DtoData<Message>);
}
