import { ChatStateTracker } from "./ChatStateTracker";
import { ChatLocation, Message, FollowedTopic } from "../types/src";
import { ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
export declare const getCombinedId: (location: ChatLocation) => string;
export declare class MessagesManager {
    private tracker;
    private readonly list;
    private readonly followedTopics;
    private readonly followedTopicsPromises;
    constructor(tracker: ChatStateTracker);
    /**
     * Get collection of the messages written in topic.
     */
    get(location: ChatLocation): Promise<ObservableIndexedObjectCollection<Message> | undefined>;
    /**
     * Cache followed topics for all joined rooms in a space and fetch them in bulk if necessary.
     * Then you can get them using getRoomFollowedTopics().
     * @see getRoomFollowedTopics
     */
    cacheSpaceFollowedTopic(spaceId: string): Promise<void>;
    /**
     * Get followed topics for the given room.
     * @return Undefined if you are not in the room, collection otherwise.
     */
    getRoomFollowedTopics(roomId: string): Promise<ObservableIndexedObjectCollection<FollowedTopic> | undefined>;
    /**
     * Batch acknowledge all missed messages from any topics in given room.
     */
    ackRoomFollowedTopics(roomId: string): Promise<void>;
    /**
     * Calculate missed messages from any topic in given room.
     * @return Undefined if you are not in room, stats object otherwise.
     */
    calculateRoomMissedMessages(roomId: string): Promise<{
        missed: number;
        missedMore: boolean;
    } | undefined>;
    /**
     * For internal use. If you want to delete the message, execute a proper command on client object.
     * @internal
     */
    _deleteByTopicIds(roomId: string, ...topicIds: string[]): void;
    private createHistoryForNewTopic;
    private handleNewMessage;
    private handleFollowedTopicUpdated;
    private handleTopicFollowed;
    private handleTopicUnfollowed;
    private handleRoomDeleted;
    private handleRoomJoin;
    private handleRoomLeft;
    private handleNewTopic;
    private handleTopicDeleted;
    private handleSession;
    private updateLocallyFollowedTopicOnNewMessage;
    private setFollowedTopicsArray;
    private clearRoomFollowedTopicsStructures;
}
