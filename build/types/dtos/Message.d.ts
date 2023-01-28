import { Dto, DtoData } from "./Dto";
import { User } from "./User";
export declare class Message extends Dto {
    readonly id: string;
    readonly author: User;
    readonly topicId: string;
    readonly content: string;
    constructor(data: DtoData<Message>);
}
