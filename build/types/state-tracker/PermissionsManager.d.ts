import { ChatStateTracker } from "./ChatStateTracker";
import { PermissionOverwrites } from "pserv-ts-types";
import { EventHandler, EventTarget } from "../EventTarget";
import { Permissions } from "../Permissions";
interface CheckPermissionsResult {
    /**
     * @deprecated Use `hasAll` instead.
     */
    ok: boolean;
    hasAll: boolean;
    hasAny: boolean;
    missing: string[];
}
export declare class PermissionsManager extends EventTarget {
    private tracker;
    private readonly overwrites;
    private readonly overwritesPromises;
    constructor(tracker: ChatStateTracker);
    getOverwrites(layer: PermissionOverwrites['layer'], layerId: PermissionOverwrites['layerId'], target: PermissionOverwrites['target'], targetId: PermissionOverwrites['targetId']): Promise<PermissionOverwrites | undefined>;
    on(eventName: 'change', handler: EventHandler<any>): this;
    check(permissionNames: (keyof typeof Permissions.list)[], spaceId?: string, roomId?: string, topicId?: string): Promise<CheckPermissionsResult>;
    calculatePermissions(spaceId?: string, roomId?: string, topicId?: string): Promise<number>;
    private handlePermissionOverwrites;
    private handleSpaceDeleted;
    private handleRoomDeleted;
    private handleTopicDeleted;
    private handleRoleDeleted;
    private handleSpaceMemberUpdated;
    private handleRoomMemberUpdated;
    /**
     * @return Matched and deleted ids
     */
    private deleteOverwritesByIdPrefix;
    private collectRoleOverwrites;
    private resolveOverwritesFromRolesByOrder;
    private resolveOverwritesHierarchy;
    private getRootAccessValue;
    private fetchMembersOrFail;
}
export {};
