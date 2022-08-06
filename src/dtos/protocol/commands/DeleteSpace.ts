import {Dto, DtoData} from "../../Dto";

export class DeleteSpace extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<DeleteSpace>) {
        super();
        this.fill(data);
    }
}
