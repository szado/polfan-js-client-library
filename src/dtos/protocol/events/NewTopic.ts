import {cast, Dto, DtoData} from "../../Dto";
import {Topic} from "../../Topic";

export class NewTopic extends Dto {
    public readonly roomId: string;
    public readonly topic: Topic;

    public constructor(data: DtoData<NewTopic>) {
        super();
        this.fill(data, {
            topic: cast(data.topic, Topic),
        });
    }
}
