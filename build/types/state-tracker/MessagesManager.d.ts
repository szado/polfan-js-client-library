import { ChatStateTracker } from "./ChatStateTracker";
import { AckReport, Message, Topic } from "pserv-ts-types";
import { IndexedCollection, ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
export declare const getCombinedId: (...ids: string[]) => string;
export declare class MessagesManager {
    private tracker;
    private readonly list;
    private readonly acks;
    constructor(tracker: ChatStateTracker);
    /**
     * Get collection of the messages written in topic.
     */
    get(roomId: string, topicId: string): Promise<ObservableIndexedObjectCollection<Message> | undefined>;
    /**
     * Get ack reports for rooms you are in the given space.
     * @param spaceId
     */
    getSpaceAckReports(spaceId: string): Promise<IndexedCollection<string, ObservableIndexedObjectCollection<AckReport>> | undefined>;
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
    _handleNewTopics(roomId: string, ...topics: Topic[]): void;
    private handleNewMessage;
    private handleAckReports;
    private createAckReportsForNewTopics;
    private updateLocallyAckReportOnNewMessage;
}
