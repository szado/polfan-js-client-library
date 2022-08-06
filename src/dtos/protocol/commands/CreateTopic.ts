import {Dto, DtoData} from "../../Dto";

export class CreateTopic extends Dto {
    public readonly roomId: string;
    public readonly name: string;
    public readonly description: string;

    public constructor(data: DtoData<CreateTopic>) {
        super();
        this.fill(data);
    }
}
