import {WebSocketChatClient} from "./WebSocketChatClient";
import {IndexedCollection, ObservableIndexedObjectCollection} from "./IndexedObjectCollection";
import {
    Message,
    NewMessage,
    NewRole,
    NewRoom,
    NewTopic, Role,
    RoleDeleted,
    Room,
    RoomDeleted,
    RoomJoined,
    RoomLeft, RoomMember,
    RoomMemberJoined,
    RoomMemberLeft,
    RoomMembers, RoomSummary,
    Session,
    Space,
    SpaceDeleted,
    SpaceJoined,
    SpaceLeft, SpaceMember,
    SpaceMemberJoined,
    SpaceMemberLeft,
    SpaceMembers,
    SpaceMemberUpdate,
    SpaceRooms, Topic,
    TopicDeleted, User
} from "pserv-ts-types";

type Deferred = {resolver: () => void, promise: Promise<void>};

export class ChatStateTracker {
    private readonly joinedSpaces = new ObservableIndexedObjectCollection<Space>('id');
    private readonly joinedRooms = new ObservableIndexedObjectCollection<Room>('id');
    private readonly spacesRoles = new IndexedCollection<string, ObservableIndexedObjectCollection<Role>>();
    private readonly roomsTopics = new IndexedCollection<string, ObservableIndexedObjectCollection<Topic>>();
    // Temporary not lazy loaded; server must implement GetTopicMessages command.
    private readonly topicsMessages = new IndexedCollection<string, ObservableIndexedObjectCollection<Message>>();

    // lazy loaded collections
    private readonly spacesRooms = new IndexedCollection<string, ObservableIndexedObjectCollection<RoomSummary>>();
    private readonly spacesMembers = new IndexedCollection<string, ObservableIndexedObjectCollection<SpaceMember>>();
    private readonly roomsMembers = new IndexedCollection<string, ObservableIndexedObjectCollection<RoomMember>>();
    private readonly deferredGetters = new IndexedCollection<string, Deferred>();

    private reconnecting: boolean = false;
    private me: User = null;

    public constructor(private readonly client: WebSocketChatClient) {
        this.createDeferredGetter('session');
        this.bind();
    }

    public async getMe(): Promise<User> {
        await this.deferredGetterReadiness('session');
        return this.me;
    }

    public async getJoinedSpaces(): Promise<ObservableIndexedObjectCollection<Space>> {
        await this.deferredGetterReadiness('session');
        return this.joinedSpaces;
    }

    public async getJoinedRooms(): Promise<ObservableIndexedObjectCollection<Room>> {
        await this.deferredGetterReadiness('session');
        return this.joinedRooms;
    }

    public async getSpaceRoles(spaceId: string): Promise<ObservableIndexedObjectCollection<Role> | null> {
        await this.deferredGetterReadiness('session');
        return this.spacesRoles.get(spaceId);
    }

    public async getRoomTopics(roomId: string): Promise<ObservableIndexedObjectCollection<Topic> | null> {
        await this.deferredGetterReadiness('session');
        return this.roomsTopics.get(roomId);
    }

    public async getTopicMessages(topicId: string): Promise<ObservableIndexedObjectCollection<Message> | null> {
        return this.topicsMessages.get(topicId);
    }

    public async getSpaceRooms(spaceId: string): Promise<ObservableIndexedObjectCollection<RoomSummary> | null> {
        const deferredGetterName = `spaces-rooms-${spaceId}`;
        if (!this.spacesRooms.has(spaceId) && !this.deferredGetters.has(deferredGetterName)) {
            this.createDeferredGetter(deferredGetterName);
            this.client.send('GetSpaceRooms', {id: spaceId});
        }
        await this.deferredGetterReadiness(deferredGetterName);
        return this.spacesRooms.get(spaceId);
    }

    public async getSpaceMembers(spaceId: string): Promise<ObservableIndexedObjectCollection<SpaceMember> | null> {
        const deferredGetterName = `spaces-members-${spaceId}`;
        if (!this.spacesMembers.has(spaceId) && !this.deferredGetters.has(deferredGetterName)) {
            this.createDeferredGetter(deferredGetterName);
            this.client.send('GetSpaceMembers', {id: spaceId});
        }
        await this.deferredGetterReadiness(deferredGetterName);
        return this.spacesMembers.get(spaceId);
    }

    public async getRoomMembers(roomId: string): Promise<ObservableIndexedObjectCollection<RoomMember> | null> {
        const deferredGetterName = `rooms-members-${roomId}`;
        if (!this.roomsMembers.has(roomId) && !this.deferredGetters.has(deferredGetterName)) {
            this.createDeferredGetter(deferredGetterName);
            this.client.send('GetRoomMembers', {id: roomId});
        }
        await this.deferredGetterReadiness(deferredGetterName);
        return this.roomsMembers.get(roomId);
    }

    private async deferredGetterReadiness(name: string): Promise<void> {
        if (this.deferredGetters.has(name)) {
            await this.deferredGetters.get(name).promise;
        }
    }

    private bind(): void {
        this.client.on(this.client.Event.disconnect, ev => this.handleDisconnect(ev as any as boolean));
        this.client.on('NewMessage', ev => this.handleNewMessage(ev));
        this.client.on('NewRole', ev => this.handleNewRole(ev));
        this.client.on('NewRoom', ev => this.handleNewRoom(ev));
        this.client.on('NewTopic', ev => this.handleNewTopic(ev));
        this.client.on('RoleDeleted', ev => this.handleRoleDeleted(ev));
        this.client.on('RoomDeleted', ev => this.handleRoomDeleted(ev));
        this.client.on('RoomJoined', ev => this.handleRoomJoined(ev));
        this.client.on('RoomLeft', ev => this.handleRoomLeft(ev));
        this.client.on('RoomMemberJoined', ev => this.handleRoomMemberJoined(ev));
        this.client.on('RoomMemberLeft', ev => this.handleRoomMemberLeft(ev));
        this.client.on('RoomMembers', ev => this.handleRoomMembers(ev));
        this.client.on('Session', ev => this.handleSession(ev));
        this.client.on('SpaceDeleted', ev => this.handleSpaceDeleted(ev));
        this.client.on('SpaceJoined', ev => this.handleSpaceJoined(ev));
        this.client.on('SpaceLeft', ev => this.handleSpaceLeft(ev));
        this.client.on('SpaceMemberJoined', ev => this.handleSpaceMemberJoined(ev));
        this.client.on('SpaceMemberLeft', ev => this.handleSpaceMemberLeft(ev));
        this.client.on('SpaceMembers', ev => this.handleSpaceMembers(ev));
        this.client.on('SpaceRooms', ev => this.handleSpaceRooms(ev));
        this.client.on('SpaceMemberUpdate', ev => this.handleSpaceMemberUpdate(ev));
        this.client.on('TopicDeleted', ev => this.handleTopicDeleted(ev));
    }

    private createDeferredGetter(name: string): void {
        if (this.deferredGetters.has(name)) {
            return;
        }
        const deferred: Deferred = {promise: undefined, resolver: undefined};
        deferred.promise = new Promise(resolve => deferred.resolver = () => {
            this.deferredGetters.delete(name);
            resolve();
        });
        this.deferredGetters.set([name, deferred]);
    }

    private handleDisconnect(reconnect: boolean): void {
        if (reconnect) {
            this.reconnecting = true;
            return;
        }
    }

    private handleNewMessage(ev: NewMessage): void {
        this.topicsMessages.get(ev.topicId).set(ev.message);
    }

    private handleNewRole(ev: NewRole): void {
        const collection = this.spacesRoles.get(ev.spaceId);
        collection.set(ev.role);
        this.joinedSpaces.get(ev.spaceId).roles = collection.items;
    }

    private handleNewRoom(ev: NewRoom): void {
        this.spacesRooms.get(ev.spaceId)?.set(ev.summary);
    }

    private handleNewTopic(ev: NewTopic): void {
        this.addJoinedRoomTopics(ev.roomId, ev.topic);
        this.joinedRooms.get(ev.roomId).topics.push(ev.topic);
    }

    private addJoinedRoomTopics(roomId: string, ...topics: Topic[]): void {
        if (this.roomsTopics.has(roomId)) {
            this.roomsTopics.get(roomId).set(...topics);
        } else {
            this.roomsTopics.set([roomId, new ObservableIndexedObjectCollection<Topic>('id', topics)]);
        }

        this.topicsMessages.set(...topics.map<[string, ObservableIndexedObjectCollection<Message>]>(topic => [
            topic.id,
            new ObservableIndexedObjectCollection<Message>('id')
        ]));
    }

    private handleRoleDeleted(ev: RoleDeleted): void {
        const collection = this.spacesRoles.get(ev.spaceId);
        collection.delete(ev.id);
        this.joinedSpaces.get(ev.spaceId).roles = collection.items;
    }

    private handleRoomDeleted(ev: RoomDeleted): void {
        if (ev.spaceId) {
            this.spacesRooms.get(ev.spaceId).delete(ev.id);
        }
        this.deleteJoinedRooms(ev.id);
    }

    private handleRoomJoined(ev: RoomJoined): void {
        this.addJoinedRooms(ev.room);
    }

    private addJoinedRooms(...rooms: Room[]): void {
        for (const room of rooms) {
            this.addJoinedRoomTopics(room.id, ...room.topics);
        }
        this.joinedRooms.set(...rooms);
    }

    private handleRoomLeft(ev: RoomLeft): void {
        this.deleteJoinedRooms(ev.id);
    }

    private deleteJoinedRooms(...roomIds: string[]): void {
        this.joinedRooms.delete(...roomIds);
        this.roomsMembers.delete(...roomIds);

        const topicIds: string[] = [];
        for (const roomId of roomIds) {
            topicIds.push(...(this.roomsTopics.get(roomId)?.map(topic => topic.id) ?? []));
        }
        this.topicsMessages.delete(...topicIds);

        this.roomsTopics.delete(...roomIds);
    }

    private handleRoomMemberJoined(ev: RoomMemberJoined): void {
        if (this.roomsMembers.has(ev.roomId)) {
            this.roomsMembers.get(ev.roomId).set(ev.member);
        }
    }

    private handleRoomMemberLeft(ev: RoomMemberLeft): void {
        if (this.roomsMembers.has(ev.roomId)) {
            this.roomsMembers.get(ev.roomId).delete(ev.userId);
        }
    }

    private handleRoomMembers(ev: RoomMembers): void {
        if (!this.roomsMembers.has(ev.id)) {
            this.roomsMembers.set([
                ev.id,
                new ObservableIndexedObjectCollection(
                    member => member.user?.id ?? member.spaceMember.user.id,
                    ev.members,
                )
            ]);
            this.deferredGetters.get(`rooms-members-${ev.id}`)?.resolver();
        }
    }

    private handleSession(ev: Session): void {
        if (this.me && !this.reconnecting) {
            return;
        }

        this.me = ev.user;
        this.reconnecting = false;

        this.joinedRooms.deleteAll();
        this.roomsTopics.deleteAll();
        this.roomsMembers.deleteAll();
        this.joinedSpaces.deleteAll();
        this.spacesRoles.deleteAll();
        this.spacesRooms.deleteAll();
        this.spacesMembers.deleteAll();

        this.addJoinedRooms(...ev.state.rooms);
        this.addJoinedSpaces(...ev.state.spaces);

        this.deferredGetters.get('session')?.resolver();
    }

    private handleSpaceDeleted(ev: SpaceDeleted): void {
        this.deleteJoinedRooms(
            ...this.joinedRooms.findBy('spaceId', ev.id).map(room => room.id)
        );
        this.spacesRoles.delete(ev.id);
        this.spacesMembers.delete(ev.id);
        this.spacesRooms.delete(ev.id);
        this.joinedSpaces.delete(ev.id);
    }
    
    private handleSpaceJoined(ev: SpaceJoined): void {
        this.addJoinedSpaces(ev.space);
    }

    private addJoinedSpaces(...spaces: Space[]): void {
        this.spacesRoles.set(...(spaces.map(space => [
            space.id,
            new ObservableIndexedObjectCollection<Role>('id', space.roles)
        ]) as [string, ObservableIndexedObjectCollection<Role>][]));
        this.joinedSpaces.set(...spaces);
    }

    private handleSpaceLeft(ev: SpaceLeft): void {
        this.handleSpaceDeleted(ev);
    }

    private handleSpaceMemberJoined(ev: SpaceMemberJoined): void {
        if (this.spacesMembers.has(ev.spaceId)) {
            this.spacesMembers.get(ev.spaceId).set(ev.member);
        }
    }

    private handleSpaceMemberLeft(ev: SpaceMemberLeft): void {
        if (this.spacesMembers.has(ev.spaceId)) {
            this.spacesMembers.get(ev.spaceId).delete(ev.userId);
        }
    }

    private handleSpaceMembers(ev: SpaceMembers): void {
        if (!this.spacesMembers.has(ev.id)) {
            this.spacesMembers.set([
                ev.id,
                new ObservableIndexedObjectCollection(member => member?.user.id, ev.members)
            ]);
            this.deferredGetters.get(`spaces-members-${ev.id}`)?.resolver();
        }
    }

    private handleSpaceRooms(ev: SpaceRooms): void {
        if (!this.spacesRooms.has(ev.id)) {
            this.spacesRooms.set([ev.id, new ObservableIndexedObjectCollection('id', ev.summaries)]);
            this.deferredGetters.get(`spaces-rooms-${ev.id}`)?.resolver();
        }
    }

    private handleSpaceMemberUpdate(ev: SpaceMemberUpdate): void {
        if (!this.spacesMembers.has(ev.spaceId)) {
            return;
        }

        // Update members of rooms related to this space
        for (const room of this.joinedRooms.findBy('spaceId', ev.spaceId).items) {
            const roomMembers = this.roomsMembers.get(room.id);
            if (!roomMembers) {
                // Skip update if member list for this room is not loaded
                continue;
            }
            const roomMember = roomMembers.get(ev.member.user.id);
            roomMember.spaceMember = ev.member;
            roomMembers.set(roomMember);
        }

        this.spacesMembers.get(ev.spaceId).set(ev.member);
    }

    private handleTopicDeleted(ev: TopicDeleted): void {
        const collection = this.roomsTopics.get(ev.roomId);
        collection.delete(ev.id);
        this.joinedRooms.get(ev.roomId).topics = collection.items;
    }
}