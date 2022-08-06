import {Dto, DtoData} from "../../Dto";

export class CreateSpace extends Dto {
    public readonly name: string;

    public constructor(data: DtoData<CreateSpace>) {
        super();
        this.fill(data);
    }
}
