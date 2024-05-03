import {ChatStateTracker} from "./ChatStateTracker";
import {
    ChatLocation,
    Message,
    NewMessage,
    Topic,
    FollowedTopic,
    TopicFollowed,
    TopicUnfollowed,
    RoomDeleted,
    RoomLeft,
    TopicDeleted,
    FollowedTopicUpdated, RoomJoined, NewTopic, Session,
} from "../types/src";
import {
    IndexedCollection,
    ObservableIndexedObjectCollection
} from "../IndexedObjectCollection";
import {PromiseRegistry} from "./AsyncUtils";

export const getCombinedId = (location: ChatLocation) => (location.roomId ?? '') + (location.topicId ?? '');

export class MessagesManager {
    // Temporary not lazy loaded; server must implement GetTopicMessages command.
    private readonly list = new IndexedCollection<string, ObservableIndexedObjectCollection<Message>>();
    private readonly followedTopics = new IndexedCollection<string, ObservableIndexedObjectCollection<FollowedTopic>>();
    private readonly followedTopicsPromises = new PromiseRegistry();

    public constructor(private tracker: ChatStateTracker) {
        this.tracker.client.on('Session', ev => this.handleSession(ev));
        this.tracker.client.on('RoomJoined', ev => this.handleRoomJoin(ev));
        this.tracker.client.on('NewTopic', ev => this.handleNewTopic(ev));
        this.tracker.client.on('FollowedTopicUpdated', ev => this.handleFollowedTopicUpdated(ev));
        this.tracker.client.on('TopicFollowed', ev => this.handleTopicFollowed(ev));
        this.tracker.client.on('TopicUnfollowed', ev => this.handleTopicUnfollowed(ev));
        this.tracker.client.on('NewMessage', ev => this.handleNewMessage(ev));
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
     * Cache followed topics for all joined rooms in a space and fetch them in bulk if necessary.
     * Then you can get them using getRoomFollowedTopics().
     * @see getRoomFollowedTopics
     */
    public async cacheSpaceFollowedTopic(spaceId: string): Promise<void> {
        if (! (await this.tracker.spaces.get()).has(spaceId)) {
            throw new Error(`You are not in space ${spaceId}`);
        }

        const roomIds = (await this.tracker.rooms.get()).findBy('spaceId', spaceId).items.map(room => room.id);

        if (! roomIds.length) {
            // We don't need to ping server for followed topics for this space, if user has no joined rooms
            return;
        }

        // If we don't have ack reports for all rooms in space, fetch them
        const result = await this.tracker.client.send('GetFollowedTopics', {location: {spaceId}});

        if (result.error) {
            throw result.error;
        }

        this.setFollowedTopicsArray(roomIds, result.data.followedTopics);
    }

    /**
     * Get followed topics for the given room.
     * @return Undefined if you are not in the room, collection otherwise.
     */
    public async getRoomFollowedTopics(roomId: string): Promise<ObservableIndexedObjectCollection<FollowedTopic> | undefined> {
        if (! (await this.tracker.rooms.get()).has(roomId)) {
            return undefined;
        }

        if (! this.followedTopics.has(roomId)) {
            if (this.followedTopicsPromises.notExist(roomId)) {
                this.followedTopicsPromises.registerByFunction(async () => {
                    const result = await this.tracker.client.send('GetFollowedTopics', {location: {roomId}});

                    if (result.error) {
                        throw result.error;
                    }

                    this.setFollowedTopicsArray([roomId], result.data.followedTopics);
                }, roomId);
            }

            await this.followedTopicsPromises.get(roomId);
        }

        return this.followedTopics.get(roomId);
    }

    /**
     * Batch acknowledge all missed messages from any topics in given room.
     */
    public async ackRoomFollowedTopics(roomId: string): Promise<void> {
        const collection = await this.getRoomFollowedTopics(roomId);

        if (! collection) {
            return;
        }

        for (const followedTopic of collection.items) {
            if (followedTopic.missed) {
                await this.tracker.client.send('Ack', {location: followedTopic.location});
            }
        }
    }

    /**
     * Calculate missed messages from any topic in given room.
     * @return Undefined if you are not in room, stats object otherwise.
     */
    public async calculateRoomMissedMessages(roomId: string): Promise<{missed: number, missedMore: boolean} | undefined> {
        const collection = await this.getRoomFollowedTopics(roomId);

        if (! collection) {
            return undefined;
        }

        let missed: number = 0, missedMore: boolean = false;

        for (const followedTopic of collection.items) {
            missed += followedTopic.missed ?? followedTopic.missedMoreThan ?? 0;
            if (followedTopic.missedMoreThan) {
                missedMore = true;
            }
        }

        return {missed, missedMore};
    }

    /**
     * For internal use. If you want to delete the message, execute a proper command on client object.
     * @internal
     */
    public _deleteByTopicIds(roomId: string, ...topicIds: string[]): void {
        this.list.delete(...topicIds.map(topicId => getCombinedId({roomId, topicId})));
        this.followedTopics.get(roomId)?.delete(...topicIds);
    }

    private createHistoryForNewTopic(roomId: string, ...newTopics: Topic[]): void {
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
    }

    private handleNewMessage(ev: NewMessage): void {
        this.list.get(getCombinedId(ev.location))?.set(ev.message);
        this.updateLocallyFollowedTopicOnNewMessage(ev);
    }

    private handleFollowedTopicUpdated(ev: FollowedTopicUpdated): void {
        this.followedTopics.get(ev.followedTopic.location.roomId)?.set(ev.followedTopic);
    }

    private handleTopicFollowed(ev: TopicFollowed): void {
        this.setFollowedTopicsArray([ev.followedTopic.location.roomId], [ev.followedTopic]);
    }

    private handleTopicUnfollowed(ev: TopicUnfollowed): void {
        this.followedTopics.get(ev.location.roomId)?.delete(ev.location.topicId);
    }

    private handleRoomDeleted(ev: RoomDeleted): void {
        this.clearRoomFollowedTopicsStructures(ev.id);
    }

    private handleRoomJoin(ev: RoomJoined): void {
        if (ev.room.defaultTopic) {
            this.createHistoryForNewTopic(ev.room.id, ev.room.defaultTopic)
        }
        this.clearRoomFollowedTopicsStructures(ev.room.id);
    }

    private handleRoomLeft(ev: RoomLeft): void {
        this.clearRoomFollowedTopicsStructures(ev.id);
    }

    private async handleNewTopic(ev: NewTopic): Promise<void> {
        this.createHistoryForNewTopic(ev.roomId, ev.topic);

        if (this.followedTopics.has(ev.roomId)) {
            // Check if the new topic is followed by user
            // only if client asked for followed topics list before for this room
            const result = await this.tracker.client.send(
                'GetFollowedTopics',
                {location: {roomId: ev.roomId, topicId: ev.topic.id}},
            );
            const followedTopic = result.data.followedTopics[0];
            if (followedTopic) {
                this.followedTopics.get(ev.roomId).set(followedTopic);
            }
        }
    }

    private handleTopicDeleted(ev: TopicDeleted): void {
        this.followedTopics.get(ev.location.roomId)?.delete(ev.location.topicId);
    }

    private handleSession(ev: Session): void {
        ev.state.rooms.forEach(room => {
            if (room.defaultTopic) {
                this.createHistoryForNewTopic(room.id, room.defaultTopic);
            }
        });
    }

    private updateLocallyFollowedTopicOnNewMessage(ev: NewMessage): void {
        const roomFollowedTopics = this.followedTopics.get(ev.location.roomId);
        const followedTopic = roomFollowedTopics?.get(ev.location.topicId);

        if (! roomFollowedTopics || ! followedTopic) {
            // Skip if we don't follow this room or targeted topic
            return;
        }

        const isMe = ev.message.author.id === this.tracker.me?.id;

        let update: Partial<FollowedTopic>;

        if (isMe) {
            // Reset missed messages count if new message is authored by me
            update = {missed: 0, missedMoreThan: null, lastAckMessageId: ev.message.id};
        } else {
            // ...add 1 otherwise
            update = {
                missed: followedTopic.missed === null ? null : followedTopic.missed + 1,
                missedMoreThan: followedTopic.missedMoreThan === null ? null : followedTopic.missedMoreThan,
            };
        }

        roomFollowedTopics.set({...followedTopic, ...update});
    }

    private setFollowedTopicsArray(roomIds: string[], followedTopics: FollowedTopic[]): void {
        const roomToTopics: {[roomId: string]: FollowedTopic[]} = {};

        // Reassign followed topics to limit collection change event emit
        followedTopics.forEach(followedTopic => {
            roomToTopics[followedTopic.location.roomId] ??= [];
            roomToTopics[followedTopic.location.roomId].push(followedTopic);
        });

        roomIds.forEach(roomId => {
            if (! this.followedTopics.has(roomId)) {
                this.followedTopics.set([roomId, new ObservableIndexedObjectCollection<FollowedTopic>(
                    followedTopic => followedTopic.location.topicId
                )]);
            }

            if (roomToTopics[roomId]) {
                this.followedTopics.get(roomId).set(...roomToTopics[roomId]);
            }
        });
    }

    private clearRoomFollowedTopicsStructures(roomId: string): void {
        this.followedTopics.delete(roomId);
        this.followedTopicsPromises.forget(roomId);
    }
}