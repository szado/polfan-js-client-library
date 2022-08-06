import {Dto, DtoData} from "../../Dto";

export class LeaveSpace extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<LeaveSpace>) {
        super();
        this.fill(data);
    }
}
