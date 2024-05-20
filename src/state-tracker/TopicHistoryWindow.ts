import {Message, MessageReference, NewMessage, Room, Session, Topic} from "../types/src";
import {ChatStateTracker} from "./ChatStateTracker";
import {ObservableIndexedObjectCollection} from "../IndexedObjectCollection";

export enum WindowMode {
    UNINITIALIZED,
    LATEST,
    PAST,
}

export abstract class TraversableRemoteCollection<T> extends ObservableIndexedObjectCollection<T> {
    /**
     * Current mode od collection window. To change mode, call one of available fetch methods.
     */
    public get mode(): WindowMode {
        return this.currentMode;
    }

    /**
     * Maximum numer of items stored in window.
     * Null for unlimited.
     */
    public limit: number | null = 50;

    private currentMode: WindowMode = WindowMode.UNINITIALIZED;
    private fetchingModeInProgress: WindowMode = undefined;

    public async resetToLatest(): Promise<void> {
        this.throwIfFetchingInProgress();

        if (this.currentMode === WindowMode.LATEST) {
            return;
        }

        this.fetchingModeInProgress = WindowMode.LATEST;

        let result;

        try {
            result = await this.fetchLatestItems();
        } finally {
            this.fetchingModeInProgress = undefined;
        }

        this.deleteAll();
        this.addItems(result, 'tail');
        this.currentMode = WindowMode.LATEST;
    }

    public async fetchPrevious(): Promise<void> {
        this.throwIfFetchingInProgress();

        this.fetchingModeInProgress = WindowMode.PAST;

        let result;

        try {
            result = await this.fetchItemsBefore();
        } finally {
            this.fetchingModeInProgress = undefined;
        }

        if (! result) {
            return  this.resetToLatest();
        }

        if (result.length) {
            this.addItems(result, 'head');
            this.currentMode = (await this.isLatestItemLoaded()) ? WindowMode.LATEST : WindowMode.PAST;
        }
    }

    public async fetchNext(): Promise<void> {
        this.throwIfFetchingInProgress();

        let result;

        try {
            result = await this.fetchItemsAfter();
        } finally {
            this.fetchingModeInProgress = undefined;
        }

        if (! result) {
            await this.resetToLatest();
            return;
        }

        if (result.length) {
            this.addItems(result, 'tail');
            this.currentMode = (await this.isLatestItemLoaded()) ? WindowMode.LATEST : WindowMode.PAST;
        }
    }

    protected abstract fetchLatestItems(): Promise<T[]>;

    protected abstract fetchItemsBefore(): Promise<T[] | null>;

    protected abstract fetchItemsAfter(): Promise<T[] | null>;

    protected abstract isLatestItemLoaded(): Promise<boolean>;

    private throwIfFetchingInProgress(): void {
        if (this.fetchingModeInProgress) {
            throw new Error(`Items fetching in progress: ${WindowMode[this.fetchingModeInProgress]}`);
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
    public static readonly Mode: typeof WindowMode = WindowMode;

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
            this.mode === WindowMode.LATEST
            && ev.location.roomId === this.roomId
            && ev.location.topicId === this.topicId
        ) {
            this.set(ev.message);
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
        return lastMessageId ? this.has(lastMessageId) : false;
    }
}