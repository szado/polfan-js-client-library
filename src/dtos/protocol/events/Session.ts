import {cast, Dto, DtoData} from "../../Dto";
import {UserState} from "../../UserState";
import {User} from "../../User";

export class Session extends Dto {
    public readonly serverVersion: string;
    public readonly state: UserState;
    public readonly user: User;

    public constructor(data: DtoData<Session>) {
        super();
        this.fill(data, {
            state: cast(data.state, UserState),
            user: cast(data.user, User),
        });
    }
}
