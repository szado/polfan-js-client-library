import {Dto, DtoData} from "./Dto";

export class Role extends Dto {
    public readonly id: string;
    public readonly name: string;
    public readonly color?: string;

    public constructor(data: DtoData<Role>) {
        super();
        this.fill(data);
    }
}