import {Dto, DtoData} from "./Dto";

export class Permission extends Dto {
    public readonly name: string;
    public readonly value: boolean;
    public readonly skip: boolean;

    public constructor(data: DtoData<Permission>) {
        super(data);
        this.fill(data);
    }
}