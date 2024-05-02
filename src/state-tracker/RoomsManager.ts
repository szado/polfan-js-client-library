import {IndexedCollection, ObservableIndexedObjectCollection} from "../IndexedObjectCollection";
import {
    NewMessage,
    NewTopic,
    Room, RoomDeleted,
    RoomJoined, RoomLeft,
    RoomMember, RoomMemberJoined, RoomMemberLeft, RoomMembers,
    RoomMemberUpdated, RoomUpdated, Session, SpaceDeleted, SpaceLeft, SpaceMemberLeft,
    SpaceMemberUpdated,
    Topic,
    TopicDeleted,
    UserUpdated,
} from "../types/src";
import {ChatStateTracker} from "./ChatStateTracker";
import {DeferredTask, PromiseRegistry} from "./AsyncUtils";
import {MessagesManager} from "./MessagesManager";

export class RoomsManager {
    public readonly messages: MessagesManager;

    private readonly list = new ObservableIndexedObjectCollection<Room>('id');
    private readonly topics = new IndexedCollection<string, ObservableIndexedObjectCollection<Topic>>();
    private readonly members = new IndexedCollection<string, ObservableIndexedObjectCollection<RoomMember>>();
    private readonly deferredSession = new DeferredTask();
    private readonly membersPromises = new PromiseRegistry();

    public constructor(private tracker: ChatStateTracker) {
        this.messages = new MessagesManager(tracker);

        this.tracker.client.on('NewMessage', ev => this.handleNewMessage(ev));
        this.tracker.client.on('NewTopic', ev => this.handleNewTopic(ev));
        this.tracker.client.on('TopicDeleted', ev => this.handleTopicDeleted(ev));
        this.tracker.client.on('RoomJoined', ev => this.handleRoomJoined(ev));
        this.tracker.client.on('RoomLeft', ev => this.handleRoomLeft(ev));
        this.tracker.client.on('RoomUpdated', ev => this.handleRoomUpdated(ev));
        this.tracker.client.on('RoomDeleted', ev => this.handleRoomDeleted(ev));
        this.tracker.client.on('RoomMemberJoined', ev => this.handleRoomMemberJoined(ev));
        this.tracker.client.on('RoomMemberLeft', ev => this.handleRoomMemberLeft(ev));
        this.tracker.client.on('RoomMembers', ev => this.handleRoomMembers(ev));
        this.tracker.client.on('RoomMemberUpdated', ev => this.handleRoomMemberUpdated(ev));
        this.tracker.client.on('SpaceMemberLeft', ev => this.handleSpaceMemberLeft(ev));
        this.tracker.client.on('SpaceMemberUpdated', ev => this.handleSpaceMemberUpdated(ev));
        this.tracker.client.on('SpaceDeleted', ev => this.handleSpaceDeleted(ev));
        this.tracker.client.on('SpaceLeft', ev => this.handleSpaceDeleted(ev));
        this.tracker.client.on('UserUpdated', ev => this.handleUserUpdated(ev));
        this.tracker.client.on('Session', ev => this.handleSession(ev));
    }

    /**
     * Get collection of room members.
     */
    public async getMembers(roomId: string): Promise<ObservableIndexedObjectCollection<RoomMember> | undefined> {
        if (this.membersPromises.notExist(roomId)) {
            this.membersPromises.registerByFunction(async () => {
                const result = await this.tracker.client.send('GetRoomMembers', {id: roomId});
                if (result.error) {
                    throw result.error;
                }
                this.handleRoomMembers(result.data);
            }, roomId);
        }

        await this.membersPromises.get(roomId);
        return this.members.get(roomId);
    }

    /**
     * Get a room member representing the current user.
     */
    public async getMe(roomId: string): Promise<RoomMember | undefined> {
        const userId = (await this.tracker.getMe()).id;

        if (! this.list.has(roomId)) {
            // User is not in passed room.
            return undefined;
        }

        const members = await this.getMembers(roomId);
        return members.items.find(member => (member.user?.id ?? member.spaceMember.user.id) === userId);
    }

    /**
     * Get collection of all the rooms you are in.
     */
    public async get(): Promise<ObservableIndexedObjectCollection<Room>> {
        await this.deferredSession.promise;
        return this.list;
    }

    /**
     * Get collection of room topics.
     */
    public async getTopics(roomId: string): Promise<ObservableIndexedObjectCollection<Topic> | undefined> {
        await this.deferredSession.promise;
        return this.topics.get(roomId);
    }

    private deleteRoom(...roomIds: string[]): void {
        this.list.delete(...roomIds);
        this.members.delete(...roomIds);
        this.membersPromises.forget(...roomIds);

        for (const roomId of roomIds) {
            const topicIds: string[] = this.topics.get(roomId)?.map(topic => topic.id) ?? [];
            this.messages._deleteByTopicIds(roomId, ...topicIds);
        }

        this.topics.delete(...roomIds);
    }

    private deleteRoomsBySpaceId(spaceId: string): void {
        this.deleteRoom(
            ...this.list.findBy('spaceId', spaceId).map(room => room.id)
        );
    }

    private handleSpaceMemberUpdated(ev: SpaceMemberUpdated): void {
        // Update members of rooms related to this space
        for (const room of this.list.findBy('spaceId', ev.spaceId).items) {
            const roomMembers = this.members.get(room.id);

            if (! roomMembers || ! roomMembers.has(ev.userId)) {
                // Skip update if member list for this room is not loaded
                // or user is not in room
                continue;
            }

            const roomMember = roomMembers.get(ev.userId);
            const user = roomMember.spaceMember.user;

            // Update space member but first fill user object (it's null in event object)
            roomMember.spaceMember = {...ev.member, user};
            roomMembers.set(roomMember);
        }
    }

    private handleSpaceMemberLeft(ev: SpaceMemberLeft): void {
        this.list
            .findBy('spaceId', ev.spaceId).items
            .forEach(room => this.members.get(room.id)?.delete(ev.userId));
    }

    private handleRoomMemberUpdated(ev: RoomMemberUpdated): void {
        if (! this.members.has(ev.roomId)) {
            // We do not track member list for this room.
            return;
        }

        const members = this.members.get(ev.roomId);
        const member = members.get(ev.userId);
        const newMember = ev.member;
        const user = member.spaceMember?.user ?? member.user;

        if (newMember.spaceMember) {
            newMember.spaceMember.user = user;
        } else {
            newMember.user = user;
        }

        members.set(newMember);
    }

    private handleSpaceDeleted(ev: SpaceDeleted | SpaceLeft): void {
        this.deleteRoomsBySpaceId(ev.id);
    }

    private handleTopicDeleted(ev: TopicDeleted): void {
        const collection = this.topics.get(ev.location.roomId);
        collection.delete(ev.location.topicId);

        const room = this.list.get(ev.location.roomId);
        if (room.defaultTopic?.id === ev.location.topicId) {
            this.list.set({...room, defaultTopic: null});
        }
    }

    private handleNewTopic(ev: NewTopic): void {
        this.addJoinedRoomTopics(ev.roomId, ev.topic);
    }

    private addJoinedRoomTopics(roomId: string, ...topics: Topic[]): void {
        if (this.topics.has(roomId)) {
            this.topics.get(roomId).set(...topics);
        } else {
            this.topics.set([roomId, new ObservableIndexedObjectCollection<Topic>('id', topics)]);
        }
    }

    private handleRoomJoined(ev: RoomJoined): void {
        this.addJoinedRooms(ev.room);
    }

    private handleRoomUpdated(ev: RoomUpdated): void {
        this.list.set({
            ...this.list.get(ev.room.id),
            name: ev.room.name,
            description: ev.room.description,
        } as Room);
    }

    private handleRoomDeleted(ev: RoomDeleted): void {
        this.deleteRoom(ev.id);
    }

    private addJoinedRooms(...rooms: Room[]): void {
        for (const room of rooms) {
            if (room.defaultTopic) {
                this.addJoinedRoomTopics(room.id, room.defaultTopic);
            }
        }
        this.list.set(...rooms);
    }

    private handleRoomLeft(ev: RoomLeft): void {
        this.deleteRoom(ev.id);
    }

    private handleRoomMemberJoined(ev: RoomMemberJoined): void {
        if (this.members.has(ev.roomId)) {
            this.members.get(ev.roomId).set(ev.member);
        }
    }

    private handleRoomMemberLeft(ev: RoomMemberLeft): void {
        if (this.members.has(ev.roomId)) {
            this.members.get(ev.roomId).delete(ev.userId);
        }
    }

    private handleRoomMembers(ev: RoomMembers): void {
        if (! this.members.has(ev.id)) {
            this.members.set([
                ev.id,
                new ObservableIndexedObjectCollection(
                    member => member.user?.id ?? member.spaceMember.user.id,
                    ev.members,
                )
            ]);
        }
    }

    private handleSession(ev: Session): void {
        this.list.deleteAll();
        this.topics.deleteAll();
        this.members.deleteAll();

        this.addJoinedRooms(...ev.state.rooms);

        this.deferredSession.resolve();
    }

    private handleUserUpdated(ev: UserUpdated): void {
        this.members.items.forEach((members) => {
            const member = members.get(ev.user.id);

            if (! member) {
                // Skip room; updated user is not here
                return;
            }

            const newMember: RoomMember = {...member};

            if (member.user) {
                newMember.user = ev.user;
            } else {
                newMember.spaceMember.user = ev.user;
            }

            members.set(newMember);
        });
    }

    private handleNewMessage(ev: NewMessage): void {
        const topics = this.topics.get(ev.location.roomId);
        const topic = topics.get(ev.location.topicId);

        if (topic) {
            topics.set({
                ...topic,
                messageCount: topic.messageCount + 1,
                lastMessage: ev.message,
            });
        }
    }
}