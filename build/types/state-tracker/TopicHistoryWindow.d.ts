import { Message, MessageReference } from "../types/src";
import { ChatStateTracker } from "./ChatStateTracker";
import { ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
export declare enum WindowState {
    UNINITIALIZED = 0,
    LATEST = 1,
    PAST = 2
}
export declare abstract class TraversableRemoteCollection<T> extends ObservableIndexedObjectCollection<T> {
    /**
     * Current mode od collection window. To change mode, call one of available fetch methods.
     */
    get state(): WindowState;
    /**
     * Maximum numer of items stored in window.
     * Null for unlimited.
     */
    limit: number | null;
    private currentState;
    private fetchingState;
    resetToLatest(): Promise<void>;
    fetchPrevious(): Promise<void>;
    fetchNext(): Promise<void>;
    protected abstract fetchLatestItems(): Promise<T[]>;
    protected abstract fetchItemsBefore(): Promise<T[] | null>;
    protected abstract fetchItemsAfter(): Promise<T[] | null>;
    protected abstract isLatestItemLoaded(): Promise<boolean>;
    protected refreshMode(): Promise<void>;
    private throwIfFetchingInProgress;
    private addItems;
    /**
     * Return array with messages of count that matching limit.
     */
    private trimItemsArrayToLimit;
}
export declare class TopicHistoryWindow extends TraversableRemoteCollection<Message> {
    private roomId;
    private topicId;
    private tracker;
    /**
     * Reexported available window modes enum.
     */
    readonly WindowState: typeof WindowState;
    constructor(roomId: string, topicId: string, tracker: ChatStateTracker);
    /**
     * For internal use.
     * @internal
     */
    _setTopicReference(ref: MessageReference): void;
    private handleNewMessage;
    private handleSession;
    protected fetchItemsAfter(): Promise<Message[] | null>;
    protected fetchItemsBefore(): Promise<Message[] | null>;
    protected fetchLatestItems(): Promise<Message[]>;
    private getTopic;
    private getLatestMessageId;
    protected isLatestItemLoaded(): Promise<boolean>;
}
