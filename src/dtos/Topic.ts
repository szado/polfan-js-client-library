import {Dto, DtoData} from "./Dto";

export class Topic extends Dto {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;

    public constructor(data: DtoData<Topic>) {
        super();
        this.fill(data);
    }
}