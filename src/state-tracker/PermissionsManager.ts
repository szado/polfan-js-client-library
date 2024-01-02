import {ChatStateTracker} from "./ChatStateTracker";
import {
    PermissionOverwrites,
    PermissionOverwritesUpdated,
    PermissionOverwritesValue, RoleDeleted, RoomDeleted, RoomLeft, SpaceDeleted, SpaceLeft, TopicDeleted,
} from "pserv-ts-types";
import {EventHandler, EventTarget} from "../EventTarget";
import {IndexedCollection} from "../IndexedObjectCollection";
import {Permission} from "../Permission";
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
        permissionNames: (keyof typeof Permission)[],
        spaceId?: string,
        roomId?: string,
        topicId?: string,
    ): Promise<{ok: boolean, missing: string[]}> {
        const ownedPermissions = await this.calculatePermissions(spaceId, roomId, topicId);
        const missing: string[] = [];

        permissionNames.forEach(name => {
            if (~ ownedPermissions & Permission[name]) {
                missing.push(name);
            }
        });

        return {ok: missing.length === 0, missing};
    }

    public async calculatePermissions(spaceId?: string, roomId?: string, topicId?: string): Promise<number> {
        if (topicId && ! roomId || roomId && ! spaceId) {
            throw new Error('Corrupted arguments hierarchy');
        }

        const userId = (await this.tracker.getMe()).id;
        const userRoles: string[] = [];
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
            userRoles.push(...(await this.tracker.spaces.getMe(spaceId)).roles);
            promises.push(this.collectRoleOverwrites(spaceId, 'Space', spaceId, userRoles));
            promises.push(this.getOverwrites('Space', spaceId, 'User', userId).then(v => v.overwrites));
        }

        if (roomId && rooms.has(roomId)) {
            const roomMember = await this.tracker.rooms.getMe(roomId);

            if (roomMember.roles !== null) { // Room overwrites from roles (only for space rooms)
                userRoles.push(...roomMember.roles);
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
                    currentValue.overwrites.allow.toString(2).length,
                    currentValue.overwrites.deny.toString(2).length
                ),
            0,
        );

        sortedOverwrites.forEach(overwriteEvent => {
            const overwrites = overwriteEvent.overwrites;
            const revDecDenies = overwrites.deny.toString(2).split('').reverse().join('');
            const revDecAllows = overwrites.allow.toString(2).split('').reverse().join('');

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
            if (value.allow & Permission.Root) {
                return this.getRootAccessValue();
            }

            result = (result & ~value.deny) | value.allow;
        }

        return result;
    }

    private getRootAccessValue(): number {
        let result = 0;

        for (const name of this.getPermissionNames()) {
            result |= Permission[name];
        }

        return result;
    }

    private getPermissionNames(): string[] {
        return Object.keys(Permission).filter(key => Number.isNaN(parseInt(key)));
    }
}