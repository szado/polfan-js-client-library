import {Dto, DtoData} from "../../Dto";
import {Message} from "../../Message";

export class CreateMessage extends Dto {
    public readonly topicId: string;
    public readonly content: string;

    public constructor(data: DtoData<Message>) {
        super();
        this.fill(data);
    }
}
