import { Role } from "./Role";
export interface Space {
    id: string;
    name: string;
    roles: Role[];
    systemRoom: string | null;
}
