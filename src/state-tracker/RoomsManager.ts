import {IndexedCollection, ObservableIndexedObjectCollection} from "../IndexedObjectCollection";
import {
    NewTopic,
    Room,
    RoomJoined, RoomLeft,
    RoomMember, RoomMemberJoined, RoomMemberLeft, RoomMembers,
    RoomMemberUpdated, Session,
    SpaceMember,
    Topic,
    TopicDeleted,
    UserChanged,
} from "pserv-ts-types";
import {ChatStateTracker} from "./ChatStateTracker";
import {DeferredTask} from "./DeferredTask";
import {MessagesManager} from "./MessagesManager";

export class RoomsManager {
    public readonly messages: MessagesManager;

    private readonly list = new ObservableIndexedObjectCollection<Room>('id');
    private readonly topics = new IndexedCollection<string, ObservableIndexedObjectCollection<Topic>>();
    private readonly members = new IndexedCollection<string, ObservableIndexedObjectCollection<RoomMember>>();
    private readonly deferredSession = new DeferredTask();

    public constructor(private tracker: ChatStateTracker) {
        this.messages = new MessagesManager(tracker);

        this.tracker.client.on('NewTopic', ev => this.handleNewTopic(ev));
        this.tracker.client.on('TopicDeleted', ev => this.handleTopicDeleted(ev));
        this.tracker.client.on('RoomJoined', ev => this.handleRoomJoined(ev));
        this.tracker.client.on('RoomLeft', ev => this.handleRoomLeft(ev));
        this.tracker.client.on('RoomMemberJoined', ev => this.handleRoomMemberJoined(ev));
        this.tracker.client.on('RoomMemberLeft', ev => this.handleRoomMemberLeft(ev));
        this.tracker.client.on('RoomMembers', ev => this.handleRoomMembers(ev));
        this.tracker.client.on('RoomMemberUpdated', ev => this.handleRoomMemberUpdated(ev));
        this.tracker.client.on('UserChanged', ev => this.handleUserChanged(ev));
        this.tracker.client.on('Session', ev => this.handleSession(ev));
    }

    /**
     * Get collection of room members.
     */
    public async getMembers(roomId: string): Promise<ObservableIndexedObjectCollection<RoomMember> | undefined> {
        if (! this.members.has(roomId)) {
            const result = await this.tracker.client.send('GetRoomMembers', {id: roomId});

            if (result.error) {
                throw result.error;
            }

            this.handleRoomMembers(result.data);
        }

        return this.members.get(roomId);
    }

    /**
     * Get a room member representing the current user.
     */
    public async getMe(roomId: string): Promise<RoomMember | undefined> {
        const userId = (await this.tracker.getMe()).id;
        const members = await this.getMembers(roomId);

        if (! members) {
            // User is not in passed room.
            return undefined;
        }

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

    /**
     * For internal use. If you want to leave the room, execute a proper command on client object.
     * @internal
     */
    public _delete(...roomIds: string[]): void {
        this.list.delete(...roomIds);
        this.members.delete(...roomIds);

        for (const roomId of roomIds) {
            const topicIds: string[] = this.topics.get(roomId)?.map(topic => topic.id) ?? [];
            this.messages._deleteByTopicIds(roomId, ...topicIds);
        }

        this.topics.delete(...roomIds);
    }

    /**
     * For internal use. If you want to leave the room, execute a proper command on client object.
     * @internal
     */
    public _deleteBySpaceId(spaceId: string): void {
        this._delete(
            ...this.list.findBy('spaceId', spaceId).map(room => room.id)
        );
    }

    /**
     * For internal use.
     * @internal
     */
    public _handleSpaceMemberUpdate(spaceId: string, member: SpaceMember): void {
        // Update members of rooms related to this space
        for (const room of this.list.findBy('spaceId', spaceId).items) {
            const roomMembers = this.members.get(room.id);

            if (! roomMembers) {
                // Skip update if member list for this room is not loaded
                continue;
            }

            const roomMember = roomMembers.get(member.user.id);
            roomMember.spaceMember = member;
            roomMembers.set(roomMember);
        }
    }

    private handleRoomMemberUpdated(ev: RoomMemberUpdated): void {
        if (! this.members.has(ev.roomId)) {
            return;
        }

        this.members.get(ev.roomId).set(ev.member);
    }

    private handleTopicDeleted(ev: TopicDeleted): void {
        const collection = this.topics.get(ev.roomId);
        collection.delete(ev.id);
        this.list.get(ev.roomId).topics = collection.items;
    }

    private handleNewTopic(ev: NewTopic): void {
        this.addJoinedRoomTopics(ev.roomId, ev.topic);
        this.list.get(ev.roomId).topics.push(ev.topic);
    }

    private addJoinedRoomTopics(roomId: string, ...topics: Topic[]): void {
        if (this.topics.has(roomId)) {
            this.topics.get(roomId).set(...topics);
        } else {
            this.topics.set([roomId, new ObservableIndexedObjectCollection<Topic>('id', topics)]);
        }

        this.messages._handleNewTopics(roomId, ...topics);
    }

    private handleRoomJoined(ev: RoomJoined): void {
        this.addJoinedRooms(ev.room);
    }

    private addJoinedRooms(...rooms: Room[]): void {
        for (const room of rooms) {
            this.addJoinedRoomTopics(room.id, ...room.topics);
        }
        this.list.set(...rooms);
    }

    private handleRoomLeft(ev: RoomLeft): void {
        this._delete(ev.id);
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

    private handleUserChanged(ev: UserChanged): void {
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
}