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
        gaps: string[];
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
    /**
     * IDs of the items the window could not stitch to the ones loaded before
     * them: there is a gap in front of each of them, i.e. the item right above
     * it in the window is not its real predecessor and an unknown number of
     * items in between was never fetched.
     *
     * Such a gap appears when the collection is resynchronised after a
     * reconnect (see resyncToLatest) and more items than a single page arrived
     * while the connection was down. The markers are kept in the window order
     * and disappear together with the items they point at.
     */
    get gaps(): readonly string[];
    get hasOldest(): boolean;
    abstract createMirror(): TraversableRemoteCollection<ItemT, EventMapT>;
    resetToLatest(force?: boolean): Promise<void>;
    /**
     * Refresh the window with the latest page, keeping the already loaded items
     * instead of replacing them.
     *
     * This is the reconnect-friendly variant of resetToLatest: the items missed
     * while the connection was down are pulled with a single request and merged
     * on top of the loaded ones (items returned in both are deduplicated), so
     * the context the application already had does not disappear. The window
     * size limit is the only thing that pushes the oldest items out.
     *
     * An empty or partial page is not a reason to drop anything: it only means
     * the collection has little (or nothing) left on the remote side, while the
     * items loaded earlier are still valid. When the page is full and does not
     * reach the loaded items, an unknown number of items in between was never
     * fetched - both parts are still kept, and the seam between them is recorded
     * in `gaps` so the application can show where the history is not continuous.
     */
    resyncToLatest(): Promise<void>;
    fetchPrevious(): Promise<void>;
    fetchNext(): Promise<void>;
    jumpTo(id: string): Promise<void>;
    delete(...ids: string[]): void;
    deleteAll(): void;
    protected abstract fetchLatestItems(): Promise<ItemT[]>;
    protected abstract fetchItemsBefore(): Promise<ItemT[] | null>;
    protected abstract fetchItemsAfter(): Promise<ItemT[] | null>;
    protected abstract fetchItemsAround(id: string): Promise<ItemT[] | null>;
    protected abstract isLatestItemLoaded(): Promise<boolean>;
    protected refreshFetchedState(): Promise<void>;
    protected addItems(newItems: ItemT[], to: 'head' | 'tail'): void;
    protected emitChangeWithDiff(itemChanged: boolean, originalState: WindowState): void;
    /**
     * Record that the history is not continuous in front of the given item.
     */
    protected markGapBefore(id: string): void;
    /**
     * Forget the gap markers pointing at items that are no longer in the window
     * (trimmed, deleted or replaced), so `gaps` never refers to nothing.
     */
    protected dropDanglingGaps(): void;
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
    resyncToLatest(): Promise<void>;
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
