import {ChatStateTracker} from "./ChatStateTracker";
import {
    PermissionOverwrites,
    PermissionOverwritesUpdated,
    PermissionOverwritesValue,
    RoleDeleted,
    RoomDeleted,
    RoomLeft, RoomMember, RoomMemberUpdated,
    SpaceDeleted,
    SpaceLeft, SpaceMember,
    SpaceMemberUpdated,
    TopicDeleted,
} from "pserv-ts-types";
import {EventHandler, EventTarget} from "../EventTarget";
import {IndexedCollection} from "../IndexedObjectCollection";
import {Permissions} from "../Permissions";
import {PromiseRegistry} from "./AsyncUtils";

const getOvId = (
    layer: PermissionOverwrites['layer'],
    layerId: PermissionOverwrites['layerId'],
    target?: PermissionOverwrites['target'],
    targetId?: PermissionOverwrites['targetId'],
) => layer + (layerId ?? '') + (target ?? '') + (targetId ?? '');

const getOvIdByObject = (overwrites: PermissionOverwrites | PermissionOverwritesUpdated): string => getOvId(
    overwrites.layer, overwrites.layerId, overwrites.target, overwrites.targetId
);

interface CheckPermissionsResult {
    /**
     * @deprecated Use `hasAll` instead.
     */
    ok: boolean;
    hasAll: boolean;
    hasAny: boolean;
    missing: string[];
}

export class PermissionsManager extends EventTarget {
    private readonly overwrites = new IndexedCollection<string, PermissionOverwrites>();
    private readonly overwritesPromises = new PromiseRegistry();

    public constructor(private tracker: ChatStateTracker) {
        super();
        this.tracker.client.on('PermissionOverwrites', ev => this.handlePermissionOverwrites(ev));
        this.tracker.client.on('PermissionOverwritesUpdated', ev => this.handlePermissionOverwrites(ev));
        this.tracker.client.on('SpaceDeleted', ev => this.handleSpaceDeleted(ev));
        this.tracker.client.on('SpaceLeft', ev => this.handleSpaceDeleted(ev));
        this.tracker.client.on('RoomDeleted', ev => this.handleRoomDeleted(ev));
        this.tracker.client.on('RoomLeft', ev => this.handleRoomDeleted(ev));
        this.tracker.client.on('TopicDeleted', ev => this.handleTopicDeleted(ev));
        this.tracker.client.on('RoleDeleted', ev => this.handleRoleDeleted(ev));
        this.tracker.client.on('SpaceMemberUpdated', ev => this.handleSpaceMemberUpdated(ev));
        this.tracker.client.on('RoomMemberUpdated', ev => this.handleRoomMemberUpdated(ev));
    }

    public async getOverwrites(
        layer: PermissionOverwrites['layer'],
        layerId: PermissionOverwrites['layerId'],
        target: PermissionOverwrites['target'],
        targetId: PermissionOverwrites['targetId'],
    ): Promise<PermissionOverwrites | undefined> {
        const id = getOvId(layer, layerId, target, targetId);

        if (this.overwritesPromises.notExist(id)) {
            this.overwritesPromises.registerByFunction(async () => {
                const result = await this.tracker.client.send(
                    'GetPermissionOverwrites',
                    {layer, layerId, target, targetId},
                );
                if (result.error) {
                    throw result.error;
                }
                this.handlePermissionOverwrites(result.data);
            }, id);
        }

        await this.overwritesPromises.get(id);
        return this.overwrites.get(id);
    }

    public on(eventName: 'change', handler: EventHandler<any>): this {
        return super.on(eventName, handler);
    }

    public async check(
        permissionNames: (keyof typeof Permissions.list)[],
        spaceId?: string,
        roomId?: string,
        topicId?: string,
    ): Promise<CheckPermissionsResult> {
        if (! permissionNames.length) {
            throw new Error('Permission names array cannot be empty');
        }

        const ownedPermissions = await this.calculatePermissions(spaceId, roomId, topicId);
        const missing: string[] = [];

        permissionNames.forEach(name => {
            if (~ ownedPermissions & Permissions.getByName(name).value) {
                missing.push(name as string);
            }
        });

        return {
            ok: missing.length === 0,
            hasAll: missing.length === 0,
            hasAny: missing.length < permissionNames.length,
            missing,
        };
    }

    public async calculatePermissions(spaceId?: string, roomId?: string, topicId?: string): Promise<number> {
        if (topicId && ! roomId || roomId && ! spaceId) {
            throw new Error('Corrupted arguments hierarchy');
        }

        const userId = (await this.tracker.getMe()).id;
        const [spaceMember, roomMember] = await this.fetchMembersOrFail(spaceId, roomId);
        const userRoles: string[] = [...(spaceMember?.roles ?? []), ...(roomMember?.roles ?? [])];
        const [spaces, rooms, topics] = await Promise.all([
            this.tracker.spaces.get(),
            this.tracker.rooms.get(),
            roomId ? this.tracker.rooms.getTopics(roomId) : null,
        ]);

        const promises: Promise<PermissionOverwritesValue>[] = [
            // Global user overwrites
            this.getOverwrites('Global', null, 'User', userId).then(v => v.overwrites),
        ];

        if (spaceId && spaces.has(spaceId)) {
            promises.push(this.collectRoleOverwrites(spaceId, 'Space', spaceId, userRoles));
            promises.push(this.getOverwrites('Space', spaceId, 'User', userId).then(v => v.overwrites));
        }

        if (roomId && rooms.has(roomId)) {
            if (userRoles.length) {
                promises.push(this.collectRoleOverwrites(spaceId, 'Room', roomId, userRoles));
            }

            promises.push(this.getOverwrites('Room', roomId, 'User', userId).then(v => v.overwrites));
        }

        if (topicId && topics && topics.has(topicId)) {
            if (userRoles.length) {
                promises.push(this.collectRoleOverwrites(spaceId, 'Topic', topicId, userRoles));
            }

            promises.push(this.getOverwrites('Topic', topicId, 'User', userId).then(v => v.overwrites));
        }

        return this.resolveOverwritesHierarchy(await Promise.all(promises));
    }

    private handlePermissionOverwrites(ev: PermissionOverwritesUpdated | PermissionOverwrites): void {
        this.overwrites.set([getOvIdByObject(ev), ev]);
        this.emit('change');
    }

    private handleSpaceDeleted(ev: SpaceDeleted | SpaceLeft): void {
        const ids = this.deleteOverwritesByIdPrefix(getOvId('Space', ev.id));
        this.overwritesPromises.forget(...ids);
    }

    private handleRoomDeleted(ev: RoomDeleted | RoomLeft): void {
        const ids = this.deleteOverwritesByIdPrefix(getOvId('Room', ev.id));
        this.overwritesPromises.forget(...ids);
    }

    private handleTopicDeleted(ev: TopicDeleted): void {
        const ids = this.deleteOverwritesByIdPrefix(getOvId('Topic', ev.id));
        this.overwritesPromises.forget(...ids);
    }

    private handleRoleDeleted(ev: RoleDeleted): void {
        const ids = this.deleteOverwritesByIdPrefix(getOvId('Space', ev.spaceId, 'Role', ev.id));
        this.overwritesPromises.forget(...ids);
    }

    private handleSpaceMemberUpdated(ev: SpaceMemberUpdated): void {
        if (ev.userId === this.tracker.me?.id) {
            // User roles in space could potentially have changed
            this.emit('change');
        }
    }

    private handleRoomMemberUpdated(ev: RoomMemberUpdated): void {
        if (ev.userId === this.tracker.me?.id) {
            // User roles in room could potentially have changed
            this.emit('change');
        }
    }

    /**
     * @return Matched and deleted ids
     */
    private deleteOverwritesByIdPrefix(prefix: string): string[] {
        const ids: string[] = [];
        this.overwrites.items.forEach((overwrites) => {
            const id = getOvIdByObject(overwrites);
            if (id.startsWith(prefix)) {
                ids.push(id);
                this.overwrites.delete(id);
            }
        });
        return ids;
    }

    private async collectRoleOverwrites(
        spaceId: string,
        layer: PermissionOverwrites['layer'],
        layerId: PermissionOverwrites['layerId'],
        userRoles: string[],
    ): Promise<PermissionOverwritesValue> {
        const roleOverwrites = await Promise.all(userRoles.map(
            roleId => this.getOverwrites(layer, layerId, 'Role', roleId)
        ));

        return this.resolveOverwritesFromRolesByOrder(spaceId, roleOverwrites);
    }

    private async resolveOverwritesFromRolesByOrder(
        spaceId: string,
        overwrites: PermissionOverwrites[],
    ): Promise<PermissionOverwritesValue> {
        let allows = 0, denies = 0;
        const roles = await this.tracker.spaces.getRoles(spaceId);
        const sortedOverwrites = overwrites.sort(
            (a, b) =>
                roles.get(a.targetId).priority - roles.get(b.targetId).priority
        );

        // Max length of bit word
        const permissionsLength = overwrites.reduce(
            (previousValue: number, currentValue: PermissionOverwrites) =>
                Math.max(
                    previousValue,
                    currentValue.overwrites.allow?.toString(2).length ?? 0,
                    currentValue.overwrites.deny?.toString(2).length ?? 0,
                ),
            0,
        );

        sortedOverwrites.forEach(overwriteEvent => {
            const overwrites = overwriteEvent.overwrites;
            const revDecDenies = overwrites.deny?.toString(2).split('').reverse().join('') ?? '';
            const revDecAllows = overwrites.allow?.toString(2).split('').reverse().join('') ?? '';

            for (let i = 0; i < permissionsLength; i++) {
                const deny = parseInt(revDecDenies[i] ?? '0');
                const allow = parseInt(revDecAllows[i] ?? '0');

                if (deny) {
                    denies |= 1 << i;
                }

                if (allow) {
                    allows |= 1 << i;
                }
            }
        });

        return {allow: allows, deny: denies};
    }

    private resolveOverwritesHierarchy(permissionOverwritesValues: PermissionOverwritesValue[]): number {
        let result = 0;

        for (const value of permissionOverwritesValues) {
            if (value.allow & Permissions.getByName('Root').value) {
                return this.getRootAccessValue();
            }

            result = (result & ~value.deny) | value.allow;
        }

        return result;
    }

    private getRootAccessValue(): number {
        let result = 0;

        for (const name of Permissions.getNames()) {
            result |= Permissions.getByName(name).value;
        }

        return result;
    }

    private async fetchMembersOrFail(spaceId?: string, roomId?: string): Promise<[SpaceMember | null, RoomMember | null]> {
        const results = await Promise.all([
            spaceId ? this.tracker.spaces.getMe(spaceId) : null,
            roomId ? this.tracker.rooms.getMe(roomId) : null,
        ]);

        const spaceFail = spaceId && ! results[0];
        const roomFail = roomId && ! results[1];

        if (spaceFail || roomFail) {
            const layer = spaceFail ? `space (${spaceId})` : `room (${roomId})`;
            throw new Error(`Attempting to calculate permissions for a ${layer} that the user does not belong to`);
        }

        return results;
    }
}