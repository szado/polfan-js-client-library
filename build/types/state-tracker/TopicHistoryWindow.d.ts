import { Message, Topic } from "../types/src";
import { ChatStateTracker } from "./ChatStateTracker";
import { CollectionEventMap, ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
export declare enum WindowState {
    /**
     * The latest messages (those received live) are available in the history window, history has not been fetched.
     */
    LIVE = 0,
    /**
     * The latest messages has been fetched and are available in the history window.
     */
    LATEST = 1,
    /**
     * The historical messages have been fetched and are available in the history window.
     * Latest messages are not available and will not be available.
     */
    PAST = 2,
    /**
     * The oldest messages have been fetched and are available in the history window.
     * Next attempts to fetch previous messages will result with no-op.
     */
    OLDEST = 3
}
export declare abstract class TraversableRemoteCollection<ItemT, EventMapT extends CollectionEventMap = CollectionEventMap> extends ObservableIndexedObjectCollection<ItemT, EventMapT> {
    /**
     * Current mode od collection window. To change mode, call one of available fetch methods.
     */
    get state(): WindowState;
    protected internalState: {
        current: WindowState;
        ongoing?: WindowState;
        limit: number | null;
        retainRatio: number;
        fetchLimit: number;
        lastFetchCount: number;
        oldestId: string | null;
    };
    /**
     * Number of items to fetch per request.
     */
    get fetchLimit(): number;
    /**
     * Sets number of items to fetch per request.
     */
    set fetchLimit(value: number);
    /**
     * Maximum number of items stored in window (High Watermark).
     * Null for unlimited.
     */
    get limit(): number | null;
    /**
     * Maximum number of items stored in window (High Watermark).
     * Null for unlimited.
     */
    set limit(value: number | null);
    /**
     * Percentage of limit to keep when trimming.
     */
    get retainRatio(): number;
    /**
     * Percentage of limit to keep when trimming.
     */
    set retainRatio(value: number);
    get hasLatest(): boolean;
    get hasOldest(): boolean;
    abstract createMirror(): TraversableRemoteCollection<ItemT, EventMapT>;
    resetToLatest(force?: boolean): Promise<void>;
    /**
     * Refresh the window with the latest page, but keep the already loaded items
     * accepted by the `retain` predicate instead of replacing everything.
     *
     * This is the reconnect-friendly variant of resetToLatest: the items missed
     * while the connection was down are pulled with a single request and merged
     * on top of the retained ones, so the context the application already had
     * does not disappear.
     *
     * An empty or partial page is not a reason to drop anything: it only means
     * the collection has little (or nothing) left on the remote side, while the
     * items loaded earlier are still valid. They are dropped only when the
     * fetched page is full and does not reach them, because then items in
     * between are missing and keeping the loaded ones would leave a silent hole
     * in the window - in that case the window falls back to the plain
     * resetToLatest result.
     */
    resyncToLatest(retain?: (item: ItemT) => boolean): Promise<void>;
    fetchPrevious(): Promise<void>;
    fetchNext(): Promise<void>;
    jumpTo(id: string): Promise<void>;
    protected abstract fetchLatestItems(): Promise<ItemT[]>;
    protected abstract fetchItemsBefore(): Promise<ItemT[] | null>;
    protected abstract fetchItemsAfter(): Promise<ItemT[] | null>;
    protected abstract fetchItemsAround(id: string): Promise<ItemT[] | null>;
    protected abstract isLatestItemLoaded(): Promise<boolean>;
    protected refreshFetchedState(): Promise<void>;
    protected addItems(newItems: ItemT[], to: 'head' | 'tail'): void;
    protected emitChangeWithDiff(itemChanged: boolean, originalState: WindowState): void;
    /**
     * Return the freshly fetched latest page preceded by the currently loaded
     * items that are still worth keeping (see resyncToLatest).
     */
    private mergeWithLoadedItems;
    /**
     * Return array with messages trimmed using High/Low Watermark strategy.
     */
    private trimItemsArrayToLimit;
}
export type TopicHistoryWindowEventMap = CollectionEventMap & {
    reftopicsdeleted: string[];
};
export declare class TopicHistoryWindow extends TraversableRemoteCollection<Message, TopicHistoryWindowEventMap> {
    private roomId;
    private topicId;
    private tracker;
    /**
     * Reexported available window modes enum.
     */
    readonly WindowState: typeof WindowState;
    protected internalState: typeof TraversableRemoteCollection<Message>['prototype']['internalState'] & {
        traverseLock: boolean;
    };
    constructor(roomId: string, topicId: string, tracker: ChatStateTracker, bindEvents?: boolean);
    createMirror(): TopicHistoryWindow;
    get isTraverseLocked(): boolean;
    setTraverseLock(lock: boolean): Promise<void>;
    resetToLatest(force?: boolean): Promise<void>;
    resyncToLatest(retain?: (item: Message) => boolean): Promise<void>;
    fetchNext(): Promise<void>;
    fetchPrevious(): Promise<void>;
    jumpTo(id: string): Promise<void>;
    /**
     * For internal use.
     * @internal
     */
    _updateMessageReference(refTopic: Topic): void;
    protected fetchItemsAfter(): Promise<Message[] | null>;
    protected fetchItemsAround(id: string): Promise<Message[] | null>;
    protected fetchItemsBefore(): Promise<Message[] | null>;
    protected fetchLatestItems(): Promise<Message[]>;
    private getTopic;
    private getLatestMessageId;
    protected isLatestItemLoaded(): Promise<boolean>;
    private handleNewMessage;
    private handleMessagesRedacted;
}
