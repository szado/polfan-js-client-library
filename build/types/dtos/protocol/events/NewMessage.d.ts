import { Dto, DtoData } from "../../Dto";
import { Message } from "../../Message";
export declare class NewMessage extends Dto {
    readonly message: Message;
    constructor(data: DtoData<NewMessage>);
}
