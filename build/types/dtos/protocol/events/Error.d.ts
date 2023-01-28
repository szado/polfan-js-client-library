import { Dto, DtoData } from "../../Dto";
export declare class Error extends Dto {
    readonly code: string;
    readonly message: string;
    constructor(data: DtoData<Error>);
}
