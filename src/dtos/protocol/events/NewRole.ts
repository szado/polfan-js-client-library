import {cast, Dto, DtoData} from "../../Dto";
import {Role} from "../../Role";

export class NewRole extends Dto {
    public readonly spaceId: string;
    public readonly role: Role;

    public constructor(data: DtoData<NewRole>) {
        super();
        this.fill(data, {
            role: cast(data.role, Role),
        });
    }
}
