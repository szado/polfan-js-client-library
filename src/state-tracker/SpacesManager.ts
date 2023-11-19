import {ChatStateTracker} from "./ChatStateTracker";
import {IndexedCollection, ObservableIndexedObjectCollection} from "../IndexedObjectCollection";
import {
    NewRole,
    NewRoom,
    Role,
    RoleDeleted, RoleUpdated, RoomDeleted,
    RoomSummary, Session,
    Space,
    SpaceDeleted, SpaceJoined, SpaceLeft,
    SpaceMember, SpaceMemberJoined, SpaceMemberLeft, SpaceMembers, SpaceMemberUpdated, SpaceRooms
} from "pserv-ts-types";
import {DeferredTask} from "./DeferredTask";

export class SpacesManager {
    private readonly list = new ObservableIndexedObjectCollection<Space>('id');
    private readonly roles = new IndexedCollection<string, ObservableIndexedObjectCollection<Role>>();
    private readonly rooms = new IndexedCollection<string, ObservableIndexedObjectCollection<RoomSummary>>();
    private readonly members = new IndexedCollection<string, ObservableIndexedObjectCollection<SpaceMember>>();
    private readonly deferredSession = new DeferredTask();

    public constructor(private tracker: ChatStateTracker) {
        this.tracker.client.on('NewRoom', ev => this.handleNewRoom(ev));
        this.tracker.client.on('RoomDeleted', ev => this.handleRoomDeleted(ev));
        this.tracker.client.on('SpaceDeleted', ev => this.handleSpaceDeleted(ev));
        this.tracker.client.on('SpaceJoined', ev => this.handleSpaceJoined(ev));
        this.tracker.client.on('SpaceLeft', ev => this.handleSpaceLeft(ev));
        this.tracker.client.on('SpaceMemberJoined', ev => this.handleSpaceMemberJoined(ev));
        this.tracker.client.on('SpaceMemberLeft', ev => this.handleSpaceMemberLeft(ev));
        this.tracker.client.on('SpaceMembers', ev => this.handleSpaceMembers(ev));
        this.tracker.client.on('SpaceRooms', ev => this.handleSpaceRooms(ev));
        this.tracker.client.on('SpaceMemberUpdated', ev => this.handleSpaceMemberUpdated(ev));
        this.tracker.client.on('NewRole', ev => this.handleNewRole(ev));
        this.tracker.client.on('RoleDeleted', ev => this.handleRoleDeleted(ev));
        this.tracker.client.on('RoleUpdated', ev => this.handleRoleUpdated(ev));
        this.tracker.client.on('Session', ev => this.handleSession(ev));
    }

    /**
     * Get collection of all the spaces you are in.
     */
    public async get(): Promise<ObservableIndexedObjectCollection<Space>> {
        await this.deferredSession.promise;
        return this.list;
    }

    /**
     * Get collection of space roles.
     */
    public async getRoles(spaceId: string): Promise<ObservableIndexedObjectCollection<Role> | undefined> {
        await this.deferredSession.promise;
        return this.roles.get(spaceId);
    }

    /**
     * Get collection of the all available rooms inside given space.
     */
    public async getRooms(spaceId: string): Promise<ObservableIndexedObjectCollection<RoomSummary> | undefined> {
        if (! this.rooms.has(spaceId)) {
            const result = await this.tracker.client.send('GetSpaceRooms', {id: spaceId});

            if (result.error) {
                throw result.error;
            }

            this.handleSpaceRooms(result.data);
        }

        return this.rooms.get(spaceId);
    }

    /**
     * Get collection of space members.
     */
    public async getMembers(spaceId: string): Promise<ObservableIndexedObjectCollection<SpaceMember> | undefined> {
        if (! this.members.has(spaceId)) {
            const result = await this.tracker.client.send('GetSpaceMembers', {id: spaceId});

            if (result.error) {
                throw result.error;
            }

            this.handleSpaceMembers(result.data);
        }

        return this.members.get(spaceId);
    }

    /**
     * Get a space member representing the current user.
     */
    public async getMe(spaceId: string): Promise<SpaceMember | undefined> {
        const userId = (await this.tracker.getMe()).id;
        const members = await this.getMembers(spaceId);

        if (! members) {
            // User is not in passed space.
            return undefined;
        }

        return members.items.find(member => member.user.id === userId);
    }

    private handleNewRole(ev: NewRole): void {
        const collection = this.roles.get(ev.spaceId);
        collection.set(ev.role);
        this.list.get(ev.spaceId).roles = collection.items;
    }

    private handleNewRoom(ev: NewRoom): void {
        this.rooms.get(ev.spaceId)?.set(ev.summary);
    }

    private handleRoomDeleted(ev: RoomDeleted): void {
        if (ev.spaceId) {
            this.rooms.get(ev.spaceId).delete(ev.id);
        }

        this.tracker.rooms._delete(ev.id);
    }

    private handleRoleDeleted(ev: RoleDeleted): void {
        const collection = this.roles.get(ev.spaceId);
        collection.delete(ev.id);
        this.list.get(ev.spaceId).roles = collection.items;
    }

    private handleSpaceDeleted(ev: SpaceDeleted): void {
        this.tracker.rooms._deleteBySpaceId(ev.id);
        this.roles.delete(ev.id);
        this.members.delete(ev.id);
        this.rooms.delete(ev.id);
        this.list.delete(ev.id);
    }

    private handleSpaceJoined(ev: SpaceJoined): void {
        this.addJoinedSpaces(ev.space);
    }

    private addJoinedSpaces(...spaces: Space[]): void {
        this.roles.set(...(spaces.map(space => [
            space.id,
            new ObservableIndexedObjectCollection<Role>('id', space.roles)
        ]) as [string, ObservableIndexedObjectCollection<Role>][]));
        this.list.set(...spaces);
    }

    private handleSpaceLeft(ev: SpaceLeft): void {
        this.handleSpaceDeleted(ev);
    }

    private handleSpaceMemberJoined(ev: SpaceMemberJoined): void {
        if (this.members.has(ev.spaceId)) {
            this.members.get(ev.spaceId).set(ev.member);
        }
    }

    private handleSpaceMemberLeft(ev: SpaceMemberLeft): void {
        if (this.members.has(ev.spaceId)) {
            this.members.get(ev.spaceId).delete(ev.userId);
        }
    }

    private handleSpaceMembers(ev: SpaceMembers): void {
        if (! this.members.has(ev.id)) {
            this.members.set([
                ev.id,
                new ObservableIndexedObjectCollection(member => member?.user.id, ev.members)
            ]);
        }
    }

    private handleSpaceRooms(ev: SpaceRooms): void {
        if (! this.rooms.has(ev.id)) {
            this.rooms.set([ev.id, new ObservableIndexedObjectCollection('id', ev.summaries)]);
        }
    }

    private handleSpaceMemberUpdated(ev: SpaceMemberUpdated): void {
        if (this.members.has(ev.spaceId)) {
            this.members.get(ev.spaceId).set(ev.member);
        }

        this.tracker.rooms._handleSpaceMemberUpdate(ev.spaceId, ev.member);
    }

    private handleRoleUpdated(ev: RoleUpdated): void {
        this.roles.get(ev.spaceId).set(ev.role);
    }

    private handleSession(ev: Session) {
        this.list.deleteAll();
        this.roles.deleteAll();
        this.rooms.deleteAll();
        this.members.deleteAll();

        this.addJoinedSpaces(...ev.state.spaces);

        this.deferredSession.resolve();
    }
}