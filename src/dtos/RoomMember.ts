import {cast, Dto, DtoData} from "./Dto";
import {User} from "./User";

export class RoomMember extends Dto {
    public readonly user: User;

    public constructor(data: DtoData<RoomMember>) {
        super();
        this.fill(data, {
            user: cast(data.user, User),
        });
    }
}