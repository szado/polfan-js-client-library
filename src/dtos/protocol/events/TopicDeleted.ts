import {Dto, DtoData} from "../../Dto";

export class TopicDeleted extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<TopicDeleted>) {
        super();
        this.fill(data);
    }
}
