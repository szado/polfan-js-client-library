import { Dto, DtoData } from "./Dto";
export declare type UserFlag = 'bot' | 'temp';
export declare class User extends Dto {
    readonly id: string;
    readonly nick: string;
    readonly avatar: string;
    readonly flags: UserFlag[];
    constructor(data: DtoData<User>);
}
