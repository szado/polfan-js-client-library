import {Dto, DtoData} from "../../Dto";

export class GetUserPermissions extends Dto {
    public readonly layer: 'Global' | 'Space' | 'Room' | 'Topic';
    public readonly layerId: string;
    public readonly userId: string;
    public readonly names: string[] | null | undefined;

    public constructor(data: DtoData<GetUserPermissions>) {
        super();
        this.fill(data);
    }
}
