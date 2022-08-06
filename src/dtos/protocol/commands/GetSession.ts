import {Dto, DtoData} from "../../Dto";

export class GetSession extends Dto {
    public constructor(data: DtoData<GetSession>) {
        super();
        this.fill(data);
    }
}
