import { Dto, DtoData } from "./Dto";
export declare class Role extends Dto {
    readonly id: string;
    readonly name: string;
    readonly color?: string;
    constructor(data: DtoData<Role>);
}
