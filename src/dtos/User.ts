import {Dto, DtoData} from "./Dto";

export type UserFlag = 'bot' | 'temp';

export class User extends Dto {
    public readonly id: string;
    public readonly nick: string;
    public readonly avatar: string;
    public readonly flags: UserFlag[];

    public constructor(data: DtoData<User>) {
        super();
        this.fill(data);
    }
}