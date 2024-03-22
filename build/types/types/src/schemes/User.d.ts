export type UserFlag = 'bot' | 'temp';
export interface User {
    id: string;
    nick: string;
    avatar: string;
    flags: UserFlag[];
    online: boolean;
}
