import {ChatStateTracker} from "./ChatStateTracker";
import {
    ChatLocation,
    Message,
    NewMessage,
    Topic,
    FollowedTopic,
    FollowedTopics,
    TopicFollowed,
    TopicUnfollowed,
    RoomDeleted,
    RoomLeft,
    TopicDeleted
} from "../types/src";
import {
    IndexedCollection,
    ObservableIndexedObjectCollection
} from "../IndexedObjectCollection";

export const getCombinedId = (location: ChatLocation) => (location.roomId ?? '') + (location.topicId ?? '');

export class MessagesManager {
    // Temporary not lazy loaded; server must implement GetTopicMessages command.
    private readonly list = new IndexedCollection<string, ObservableIndexedObjectCollection<Message>>();
    private readonly followedTopics = new IndexedCollection<string, ObservableIndexedObjectCollection<FollowedTopic>>();

    public constructor(private tracker: ChatStateTracker) {
        this.tracker.client.on('NewMessage', ev => this.handleNewMessage(ev));
        this.tracker.client.on('FollowedTopics', ev => this.handleFollowedTopics(ev));
        this.tracker.client.on('TopicFollowed', ev => this.handleTopicFollowed(ev));
        this.tracker.client.on('TopicUnfollowed', ev => this.handleTopicUnfollowed(ev));
        this.tracker.client.on('RoomDeleted', ev => this.handleRoomDeleted(ev));
        this.tracker.client.on('RoomLeft', ev => this.handleRoomLeft(ev));
        this.tracker.client.on('TopicDeleted', ev => this.handleTopicDeleted(ev));
    }

    /**
     * Get collection of the messages written in topic.
     */
    public async get(location: ChatLocation): Promise<ObservableIndexedObjectCollection<Message> | undefined> {
        return this.list.get(getCombinedId(location));
    }

    /**
     * Cache ack reports for all joined rooms in a space and fetch them in bulk if necessary.
     * Then you can get the reports using getRoomFollowedTopics().
     * @see getRoomFollowedTopics
     */
    public async cacheSpaceFollowedTopic(spaceId: string): Promise<void> {
        if (! (await this.tracker.spaces.get()).has(spaceId)) {
            throw new Error(`You are not in space ${spaceId}`);
        }

        // If we don't have ack reports for all rooms in space, fetch them
        const result = await this.tracker.client.send('GetFollowedTopics', {location: {spaceId}});

        if (result.error) {
            throw result.error;
        }

        this.setFollowedTopicsArray(result.data.followedTopics);
    }

    /**
     * Get ack reports for the given room. Undefined if you are not in the room.
     * @param roomId
     */
    public async getRoomFollowedTopics(roomId: string): Promise<ObservableIndexedObjectCollection<FollowedTopic> | undefined> {
        if (! (await this.tracker.rooms.get()).has(roomId)) {
            return undefined;
        }

        if (! this.followedTopics.has(roomId)) {
            const result = await this.tracker.client.send('GetFollowedTopics', {location: {roomId}});

            if (result.error) {
                throw result.error;
            }

            this.setFollowedTopicsArray(result.data.followedTopics);
        }

        return this.followedTopics.get(roomId);
    }

    /**
     * For internal use. If you want to delete the message, execute a proper command on client object.
     * @internal
     */
    public _deleteByTopicIds(roomId: string, ...topicIds: string[]): void {
        this.list.delete(...topicIds.map(topicId => getCombinedId({roomId, topicId})));
        this.followedTopics.get(roomId)?.delete(...topicIds);
    }

    /**
     * For internal use. If you want to add new topic, execute a proper command on client object.
     * @internal
     */
    public _handleNewTopics(roomId: string, ...newTopics: Topic[]):void {
        for (const newTopic of newTopics) {
            const newTopicCombinedId = getCombinedId({roomId, topicId: newTopic.id});

            this.list.set([newTopicCombinedId, new ObservableIndexedObjectCollection<Message>('id')]);

            // If new topic refers to some message from this room, update other structures
            if (newTopic.messageRef) {
                const refTopicCombinedId = getCombinedId({roomId, topicId: newTopic.messageRef.topicId});
                const refTopicMessages = this.list.get(refTopicCombinedId);
                const refMessage = refTopicMessages?.get(newTopic.messageRef.messageId);

                if (refMessage) {
                    // Update referenced topic ID in message
                    refTopicMessages.set({...refMessage, topicRef: newTopic.id});
                }
            }
        }

        this.createFollowedStructuresForNewTopics(roomId, newTopics);
    }

    private handleNewMessage(ev: NewMessage): void {
        this.list.get(getCombinedId(ev.location)).set(ev.message);
        this.updateLocallyFollowedTopicOnNewMessage(ev);
    }

    private handleFollowedTopics(ev: FollowedTopics): void {
        this.setFollowedTopicsArray(ev.followedTopics);
    }

    private createFollowedStructuresForNewTopics(roomId: string, topics: Topic[]): void {
        const followedTopic = this.followedTopics.get(roomId);

        if (! followedTopic) {
            // If we don't follow ack reports for this room, skip
            return;
        }

        const followedTopics: FollowedTopic[] = topics.map(topic => ({
            location: {roomId, topicId: topic.id}, lastAckMessageId: null, missed: 0, missedMoreThan: null
        }));

        followedTopic.set(...followedTopics);
    }

    private updateLocallyFollowedTopicOnNewMessage(ev: NewMessage): void {
        const followedTopic = this.followedTopics.get(ev.location.roomId);

        if (! followedTopic) {
            // If we don't follow ack reports for this room, skip
            return;
        }

        const isMe = ev.message.author.id === this.tracker.me?.id;
        const currentFollowedTopic = followedTopic.get(ev.location.topicId);
        let update: Partial<FollowedTopic>;

        if (isMe) {
            // Reset missed messages count if new message is authored by me
            update = {missed: 0, missedMoreThan: null, lastAckMessageId: ev.message.id};
        } else {
            // ...add 1 otherwise
            update = {
                missed: currentFollowedTopic.missed === null ? null : currentFollowedTopic.missed + 1,
                missedMoreThan: currentFollowedTopic.missedMoreThan === null ? null : currentFollowedTopic.missedMoreThan,
            };
        }

        followedTopic.set({...currentFollowedTopic, ...update});
    }

    private handleTopicFollowed(ev: TopicFollowed): void {
        this.setFollowedTopicsArray([ev.followedTopic]);
    }

    private handleTopicUnfollowed(ev: TopicUnfollowed): void {
        this.followedTopics.get(ev.location.roomId)?.delete(ev.location.topicId);
    }

    private handleRoomDeleted(ev: RoomDeleted): void {
        this.followedTopics.delete(ev.id);
    }

    private handleRoomLeft(ev: RoomLeft): void {
        this.followedTopics.delete(ev.id);
    }

    private handleTopicDeleted(ev: TopicDeleted): void {
        this.followedTopics.get(ev.location.roomId)?.delete(ev.location.topicId);
    }

    private setFollowedTopicsArray(followedTopics: FollowedTopic[]): void {
        const roomToTopics: {[roomId: string]: FollowedTopic[]} = {};

        // Reassign reports to limit collection change event emit
        followedTopics.forEach(followedTopic => {
            roomToTopics[followedTopic.location.roomId] ??= [];
            roomToTopics[followedTopic.location.roomId].push(followedTopic);
        });

        for (const roomId in roomToTopics) {
            if (! this.followedTopics.has(roomId)) {
                this.followedTopics.set([
                    roomId,
                    new ObservableIndexedObjectCollection<FollowedTopic>(report => report.location.topicId),
                ]);
            }
            this.followedTopics.get(roomId).set(...roomToTopics[roomId]);
        }
    }
}