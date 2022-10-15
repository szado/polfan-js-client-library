import { Dto, DtoData } from "./Dto";
export declare class Permission extends Dto {
    readonly name: string;
    readonly value: boolean;
    readonly skip: boolean;
    constructor(data: DtoData<Permission>);
}
