import { Dto, DtoData } from "../../Dto";
export declare class CreateRole extends Dto {
    readonly spaceId: string;
    readonly name: string;
    readonly color: string;
    constructor(data: DtoData<CreateRole>);
}
