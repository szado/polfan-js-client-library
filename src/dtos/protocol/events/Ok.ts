import {Dto, DtoData} from "../../Dto";

export class Ok extends Dto {
    public constructor(data: DtoData<Ok>) {
        super();
        this.fill(data);
    }
}
