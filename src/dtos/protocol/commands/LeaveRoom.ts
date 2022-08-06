import {Dto, DtoData} from "../../Dto";

export class LeaveRoom extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<LeaveRoom>) {
        super();
        this.fill(data);
    }
}
