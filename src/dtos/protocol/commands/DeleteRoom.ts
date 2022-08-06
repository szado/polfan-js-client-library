import {Dto, DtoData} from "../../Dto";

export class DeleteRoom extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<DeleteRoom>) {
        super();
        this.fill(data);
    }
}
