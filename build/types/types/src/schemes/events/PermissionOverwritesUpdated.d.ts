import { PermissionOverwritesValue } from "../PermissionOverwritesValue";
import { ChatLocation } from "../ChatLocation";
export interface PermissionOverwritesUpdated {
    location: ChatLocation;
    target: 'User' | 'Role';
    targetId: string;
    overwrites: PermissionOverwritesValue;
}
