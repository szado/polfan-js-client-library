import {castArray, Dto, DtoData} from "./Dto";
import {User} from "./User";

export class SpaceMember extends Dto {
    public readonly user: User;
    public readonly roles: string[];

    public constructor(data: DtoData<SpaceMember>) {
        super();
        this.fill(data, {
            user: castArray(data.user, User),
        });
    }
}