import { ChatStateTracker } from "./ChatStateTracker";
import { PermissionOverwrites } from "pserv-ts-types";
import { EventHandler, EventTarget } from "../EventTarget";
import { Permission } from "../Permission";
export declare class PermissionsManager extends EventTarget {
    private tracker;
    private readonly overwrites;
    private readonly overwritesPromises;
    constructor(tracker: ChatStateTracker);
    getOverwrites(layer: PermissionOverwrites['layer'], layerId: PermissionOverwrites['layerId'], target: PermissionOverwrites['target'], targetId: PermissionOverwrites['targetId']): Promise<PermissionOverwrites | undefined>;
    on(eventName: 'change', handler: EventHandler<any>): this;
    check(permissionNames: (keyof typeof Permission)[], spaceId?: string, roomId?: string, topicId?: string): Promise<{
        ok: boolean;
        missing: string[];
    }>;
    calculatePermissions(spaceId?: string, roomId?: string, topicId?: string): Promise<number>;
    private handlePermissionOverwrites;
    private handleSpaceDeleted;
    private handleRoomDeleted;
    private handleTopicDeleted;
    private handleRoleDeleted;
    /**
     * @return Matched and deleted ids
     */
    private deleteOverwritesByIdPrefix;
    private collectRoleOverwrites;
    private resolveOverwritesFromRolesByOrder;
    private resolveOverwritesHierarchy;
    private getRootAccessValue;
    private getPermissionNames;
}
