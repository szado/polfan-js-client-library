import { PermissionOverwritesValue } from "../PermissionOverwritesValue";
import { ChatLocation } from "../ChatLocation";
export interface PermissionOverwrites {
    location: ChatLocation;
    target: 'User' | 'Role';
    targetId: string;
    overwrites: PermissionOverwritesValue;
}
