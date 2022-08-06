import {Dto, DtoData} from "../../Dto";

export class GetSpaceRooms extends Dto {
    public readonly id: string;

    public constructor(data: DtoData<GetSpaceRooms>) {
        super();
        this.fill(data);
    }
}
