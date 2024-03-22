import { ChatLocation } from "../ChatLocation";
export interface GetPermissionOverwrites {
    location: ChatLocation;
    target: 'User' | 'Role';
    targetId: string;
}
