import {Dto, DtoData} from "../../Dto";

export class CreateRoom extends Dto {
    public readonly spaceId: string;
    public readonly name: string;
    public readonly description: string;

    public constructor(data: DtoData<CreateRoom>) {
        super();
        this.fill(data);
    }
}
