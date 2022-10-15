import { Dto, DtoData } from "./Dto";
export declare class Topic extends Dto {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    constructor(data: DtoData<Topic>);
}
