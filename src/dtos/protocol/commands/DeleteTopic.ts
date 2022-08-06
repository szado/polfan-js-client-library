import {Dto, DtoData} from "../../Dto";

export class DeleteTopic extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<DeleteTopic>) {
        super();
        this.fill(data);
    }
}
