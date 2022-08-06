import {Dto, DtoData} from "../../Dto";

export class JoinRoom extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<JoinRoom>) {
        super();
        this.fill(data);
    }
}
