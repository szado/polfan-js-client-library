import {Dto, DtoData} from "../../Dto";

export class JoinSpace extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<JoinSpace>) {
        super();
        this.fill(data);
    }
}
