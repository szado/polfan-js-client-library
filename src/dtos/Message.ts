import {cast, Dto, DtoData} from "./Dto";
import {User} from "./User";

export class Message extends Dto {
    public readonly id: string;
    public readonly author: User;
    public readonly topicId: string;
    public readonly content: string;

    public constructor(data: DtoData<Message>) {
        super();
        this.fill(data, {
            author: cast(data.author, User),
        });
    }
}