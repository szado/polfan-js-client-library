import {ChatStateTracker} from "./ChatStateTracker";
import {
    PermissionOverwrites,
    PermissionOverwritesChanged,
    PermissionOverwritesValue,
    Role
} from "pserv-ts-types";
import {EventHandler, EventTarget} from "../EventTarget";
import {IndexedCollection} from "../IndexedObjectCollection";
import {Permission} from "../Permission";

const getOvId = (
    layer: PermissionOverwrites['layer'],
    layerId: PermissionOverwrites['layerId'],
    target: PermissionOverwrites['target'],
    targetId: PermissionOverwrites['targetId'],
) => layer + (layerId ?? '') + target + targetId;

const getOvIdByObject = (overwrites: PermissionOverwrites | PermissionOverwritesChanged): string => getOvId(
    overwrites.layer, overwrites.layerId, overwrites.target, overwrites.targetId
);

export class PermissionsManager extends EventTarget {
    private readonly overwrites = new IndexedCollection<string, PermissionOverwrites>();

    public constructor(private tracker: ChatStateTracker) {
        super();
        this.tracker.client.on('PermissionOverwrites', ev => this.handlePermissionOverwrites(ev));
        this.tracker.client.on('PermissionOverwritesChanged', ev => this.handlePermissionOverwrites(ev));
    }

    public async getOverwrites(
        layer: PermissionOverwrites['layer'],
        layerId: PermissionOverwrites['layerId'],
        target: PermissionOverwrites['target'],
        targetId: PermissionOverwrites['targetId'],
    ): Promise<PermissionOverwrites | null> {
        const id = getOvId(layer, layerId, target, targetId);

        if (this.overwrites.has(id)) {
            return this.overwrites.get(id);
        }

        const result = await this.tracker.client.send(
            'GetPermissionOverwrites',
            {layer, layerId, target, targetId},
        );

        return result.error ? null : result.data;
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

        const promises: Promise<PermissionOverwritesValue>[] = [
            // Global user overwrites
            this.getOverwrites('Global', null, 'User', userId).then(v => v.overwrites),
        ];

        if (spaceId) {
            userRoles.push(...(await this.tracker.spaces.getMe(spaceId)).roles);
            promises.push(this.collectRoleOverwrites(spaceId, 'Space', spaceId, userRoles));
            promises.push(this.getOverwrites('Space', spaceId, 'User', userId).then(v => v.overwrites));
        }

        if (roomId) {
            const roomMember = await this.tracker.rooms.getMe(roomId);

            if (roomMember.roles !== null) { // Room overwrites from roles (only for space rooms)
                userRoles.push(...roomMember.roles);
                promises.push(this.collectRoleOverwrites(spaceId, 'Room', roomId, userRoles));
            }

            promises.push(this.getOverwrites('Room', roomId, 'User', userId).then(v => v.overwrites));
        }

        if (topicId) {
            if (userRoles.length) {
                promises.push(this.collectRoleOverwrites(spaceId, 'Topic', topicId, userRoles));
            }

            promises.push(this.getOverwrites('Topic', topicId, 'User', userId).then(v => v.overwrites));
        }

        return this.resolveOverwritesHierarchy(await Promise.all(promises));
    }

    private handlePermissionOverwrites(ev: PermissionOverwritesChanged | PermissionOverwrites) {
        this.overwrites.set([getOvIdByObject(ev), ev]);
        this.emit('change');
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