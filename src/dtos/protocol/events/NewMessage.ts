import {cast, Dto, DtoData} from "../../Dto";
import {Message} from "../../Message";

export class NewMessage extends Dto {
    public readonly message: Message;

    public constructor(data: DtoData<NewMessage>) {
        super();
        this.fill(data, {
            message: cast(data.message, Message),
        });
    }
}
