import {Message, MessageReference, NewMessage, Session, Topic} from "../types/src";
import {ChatStateTracker} from "./ChatStateTracker";
import {ObservableIndexedObjectCollection} from "../IndexedObjectCollection";

export enum WindowState {
    /**
     * No messages exist in the history window.
     */
    EMPTY,

    /**
     * The latest messages (those received live) are available in the history window, history has not been fetched.
     */
    LATEST_LIVE,

    /**
     * The latest messages has been fetched and are available in the history window.
     */
    LATEST_FETCHED,

    /**
     * The historical messages have been fetched and are available in the history window.
     * Latest messages are not available and will not be available.
     */
    PAST_FETCHED,
}

export abstract class TraversableRemoteCollection<T> extends ObservableIndexedObjectCollection<T> {
    /**
     * Current mode od collection window. To change mode, call one of available fetch methods.
     */
    public get state(): WindowState {
        return this.currentState;
    }

    /**
     * Maximum numer of items stored in window.
     * Null for unlimited.
     */
    public limit: number | null = 50;

    private currentState: WindowState = WindowState.EMPTY;
    private fetchingState: WindowState = undefined;

    public async resetToLatest(): Promise<void> {
        this.throwIfFetchingInProgress();

        if (this.currentState === WindowState.LATEST_FETCHED) {
            return;
        }

        this.fetchingState = WindowState.LATEST_FETCHED;

        let result;

        try {
            result = await this.fetchLatestItems();
        } finally {
            this.fetchingState = undefined;
        }

        this.deleteAll();
        this.addItems(result, 'tail');
        this.currentState = WindowState.LATEST_FETCHED;
    }

    public async fetchPrevious(): Promise<void> {
        this.throwIfFetchingInProgress();

        this.fetchingState = WindowState.PAST_FETCHED;

        let result;

        try {
            result = await this.fetchItemsBefore();
        } finally {
            this.fetchingState = undefined;
        }

        if (! result) {
            return  this.resetToLatest();
        }

        if (result.length) {
            this.addItems(result, 'head');
            await this.refreshFetchedState();
        }
    }

    public async fetchNext(): Promise<void> {
        this.throwIfFetchingInProgress();

        let result;

        try {
            result = await this.fetchItemsAfter();
        } finally {
            this.fetchingState = undefined;
        }

        if (! result) {
            await this.resetToLatest();
            return;
        }

        if (result.length) {
            this.addItems(result, 'tail');
            await this.refreshFetchedState();
        }
    }

    protected abstract fetchLatestItems(): Promise<T[]>;

    protected abstract fetchItemsBefore(): Promise<T[] | null>;

    protected abstract fetchItemsAfter(): Promise<T[] | null>;

    protected abstract isLatestItemLoaded(): Promise<boolean>;

    protected async refreshFetchedState(): Promise<void> {
        this.currentState = (await this.isLatestItemLoaded()) ? WindowState.LATEST_FETCHED : WindowState.PAST_FETCHED;
    }

    protected refreshLiveState(): void {
        if (this.currentState === WindowState.EMPTY && this.length) {
            this.currentState = WindowState.LATEST_LIVE;
        }
    }

    private throwIfFetchingInProgress(): void {
        if (this.fetchingState) {
            throw new Error(`Items fetching in progress: ${WindowState[this.fetchingState]}`);
        }
    }

    private addItems(newItems: T[], to: 'head' | 'tail'): void {
        let result;

        if (to === 'head') {
            result = this.trimItemsArrayToLimit([...newItems, ...this.items], 'tail');
        }

        if (to === 'tail') {
            result = this.trimItemsArrayToLimit([...this.items, ...newItems], 'head');
        }

        this.deleteAll();
        this.set(...result);
    }

    /**
     * Return array with messages of count that matching limit.
     */
    private trimItemsArrayToLimit(items: T[], from: 'head' | 'tail'): T[] {
        if (this.limit === null) {
            return items;
        }

        if (from === 'head') {
            return items.slice(-this.limit);
        }

        if (from === 'tail') {
            return items.slice(0, this.limit);
        }
    }
}

export class TopicHistoryWindow extends TraversableRemoteCollection<Message> {
    /**
     * Reexported available window modes enum.
     */
    public readonly WindowState: typeof WindowState = WindowState;

    public constructor(
        private roomId: string,
        private topicId: string,
        private tracker: ChatStateTracker,
    ) {
        super('id');
        this.tracker.client.on('Session', ev => this.handleSession(ev));
        this.tracker.client.on('NewMessage', ev => this.handleNewMessage(ev));
    }

    /**
     * For internal use.
     * @internal
     */
    public _setTopicReference(ref: MessageReference): void {
        const refMessage = this.get(ref.messageId);

        if (refMessage) {
            // Update referenced topic ID in message
            this.set({...refMessage, topicRef: ref.topicId});
        }
    }

    private async handleNewMessage(ev: NewMessage): Promise<void> {
        if (
            [WindowState.LATEST_FETCHED, WindowState.LATEST_LIVE, WindowState.EMPTY].includes(this.state)
            && ev.location.roomId === this.roomId
            && ev.location.topicId === this.topicId
        ) {
            this.set(ev.message);
            this.refreshLiveState();
        }
    }

    private handleSession(ev: Session): void {
        this.resetToLatest();
    }

    protected async fetchItemsAfter(): Promise<Message[] | null> {
        const afterId = this.getAt(this.length - 1)?.id;

        if (! afterId) {
            // If there is no message to refer, fetch latest
            return null;
        }

        const result = await this.tracker.client.send('GetMessages', {
            location: {roomId: this.roomId, topicId: this.topicId},
            after: afterId,
        });

        if (result.error) {
            throw new Error(`Cannot fetch messages: ${result.error.message}`);
        }

        return result.data.messages;
    }

    protected async fetchItemsBefore(): Promise<Message[] | null> {
        const beforeId = this.getAt(0)?.id;

        if (! beforeId) {
            // If there is no message to refer, fetch latest
            return null;
        }

        const result = await this.tracker.client.send('GetMessages', {
            location: {roomId: this.roomId, topicId: this.topicId},
            before: beforeId,
        });

        if (result.error) {
            throw new Error(`Cannot fetch messages: ${result.error.message}`);
        }

        return result.data.messages;
    }

    protected async fetchLatestItems(): Promise<Message[]> {
        const result = await this.tracker.client.send('GetMessages', {
            location: {roomId: this.roomId, topicId: this.topicId},
        });

        if (result.error) {
            throw new Error(`Cannot fetch messages: ${result.error.message}`);
        }

        return result.data.messages;
    }

    private async getTopic(): Promise<Topic | undefined> {
        return (await this.tracker.rooms.getTopics(this.roomId, [this.topicId])).get(this.topicId);
    }

    private async getLatestMessageId(): Promise<string | undefined> {
        return (await this.getTopic())?.lastMessage?.id;
    }

    protected async isLatestItemLoaded(): Promise<boolean> {
        const lastMessageId = await this.getLatestMessageId();
        return lastMessageId ? this.has(lastMessageId) : true;
    }
}