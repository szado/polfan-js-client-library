import { Dto, DtoData } from "../../Dto";
export declare class GetUserPermissions extends Dto {
    readonly layer: 'Global' | 'Space' | 'Room' | 'Topic';
    readonly layerId: string;
    readonly userId: string;
    readonly names: string[] | null | undefined;
    constructor(data: DtoData<GetUserPermissions>);
}
