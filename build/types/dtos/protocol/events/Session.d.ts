import { Dto, DtoData } from "../../Dto";
import { UserState } from "../../UserState";
import { User } from "../../User";
export declare class Session extends Dto {
    readonly serverVersion: string;
    readonly state: UserState;
    readonly user: User;
    constructor(data: DtoData<Session>);
}
