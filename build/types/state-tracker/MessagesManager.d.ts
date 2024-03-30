import { ChatStateTracker } from "./ChatStateTracker";
import { AckReport, ChatLocation, Message, Topic } from "../types/src";
import { ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
export declare const getCombinedId: (location: ChatLocation) => string;
export declare class MessagesManager {
    private tracker;
    private readonly list;
    private readonly acks;
    constructor(tracker: ChatStateTracker);
    /**
     * Get collection of the messages written in topic.
     */
    get(location: ChatLocation): Promise<ObservableIndexedObjectCollection<Message> | undefined>;
    /**
     * Cache ack reports for all joined rooms in a space and fetch them in bulk if necessary.
     * Then you can get the reports using getRoomAckReports().
     * @see getRoomAckReports
     */
    cacheSpaceAckReports(spaceId: string): Promise<void>;
    /**
     * Get ack reports for the given room. Undefined if you are not in the room.
     * @param roomId
     */
    getRoomAckReports(roomId: string): Promise<ObservableIndexedObjectCollection<AckReport> | undefined>;
    /**
     * For internal use. If you want to delete the message, execute a proper command on client object.
     * @internal
     */
    _deleteByTopicIds(roomId: string, ...topicIds: string[]): void;
    /**
     * For internal use. If you want to add new topic, execute a proper command on client object.
     * @internal
     */
    _handleNewTopics(roomId: string, ...newTopics: Topic[]): void;
    private handleNewMessage;
    private handleAckReports;
    private createAckReportsForNewTopics;
    private updateLocallyAckReportOnNewMessage;
}
