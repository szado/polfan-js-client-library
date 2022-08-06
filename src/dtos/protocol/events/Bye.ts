import {Dto, DtoData} from "../../Dto";

export class Bye extends Dto {
    public readonly reason: string;

    public constructor(data: DtoData<Bye>) {
        super();
        this.fill(data);
    }
}
