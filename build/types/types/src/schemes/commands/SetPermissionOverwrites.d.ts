import { PermissionOverwritesValue } from "../PermissionOverwritesValue";
import { ChatLocation } from "../ChatLocation";
export interface SetPermissionOverwrites {
    location: ChatLocation;
    target: 'User' | 'Role';
    targetId: string;
    overwrites: PermissionOverwritesValue;
}
