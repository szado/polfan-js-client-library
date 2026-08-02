import {ChatStateTracker} from "./ChatStateTracker";
import {Message, NewTopic, Room, RoomUpdated, Topic, TopicDeleted} from "../types/src";
import {IndexedCollection,} from "../IndexedObjectCollection";
import {TopicHistoryWindow, WindowState} from "./TopicHistoryWindow";

export class RoomMessagesHistory {
    private historyWindows = new IndexedCollection<string, TopicHistoryWindow>();
    private traverseLock: boolean = false;
    private timeLimitedHistory: boolean = false;

    public constructor(
        private room: Room,
        private tracker: ChatStateTracker,
    ) {
        this.tracker.client.on('RoomUpdated', ev => this.handleRoomUpdated(ev));
        this.tracker.client.on('NewTopic', ev => this.handleNewTopic(ev));
        this.tracker.client.on('TopicDeleted', ev => this.handleTopicDeleted(ev));

        this.updateHistoryMode(this.room);

        if (this.room.defaultTopic) {
            this.createHistoryWindowForTopic(this.room.defaultTopic);
        }
    }

    /**
     * Returns a history window object for the given topic ID, allowing you to view message history.
     * @param topicId
     * @param peek If true, do not create a cache for this topic and do not allow it to collect new messages.
     */
    public async getMessagesWindow(topicId: string, peek: boolean = false): Promise<TopicHistoryWindow | undefined> {
        if (!this.historyWindows.has(topicId) && !peek) {
            const topic = (await this.tracker.rooms.getTopics(this.room.id, [topicId])).get(topicId);

            if (topic) {
                this.createHistoryWindowForTopic(topic);
            }
        }

        return this.historyWindows.get(topicId);
    }

    /**
     * Re-synchronise this room's history after a reconnect without discarding
     * the existing window objects (which would blank the UI and, for ephemeral
     * rooms, permanently drop live-only history).
     *
     * The window bindings are preserved; only windows that the application had
     * actually pulled to the latest page (state === LATEST) are refreshed, with
     * a single request instead of a chain of catch-up requests. Windows that
     * were never pulled (LIVE) or belong to an ephemeral room are left untouched
     * so their in-memory context survives the reconnect.
     *
     * How a refreshed window is rebuilt depends on the room history mode:
     * rooms keeping the full history are simply reset to the latest page (it can
     * always be traversed back), while rooms with a time-limited history
     * (MaxAge) load the messages missed during the downtime on top of the
     * already loaded ones that still fit in the room's time window - messages
     * that aged out of it in the meantime are dropped.
     */
    public async resync(room: Room): Promise<void> {
        this.room = room;
        this.updateHistoryMode(room);

        if (this.room.defaultTopic) {
            this.createHistoryWindowForTopic(this.room.defaultTopic);
        }

        // Single point in time for every window of this room, so they all trim
        // their history against the same boundary.
        const fitsInTimeWindow = this.timeLimitedHistory ? this.createTimeWindowFilter() : null;

        for (const [, window] of Array.from(this.historyWindows.items)) {
            try {
                await window.setTraverseLock(this.traverseLock);

                // Ephemeral history lives only in memory (the server does not
                // persist it), so never refetch/replace it on reconnect.
                if (this.traverseLock) {
                    continue;
                }

                if (window.state !== WindowState.LATEST) {
                    continue;
                }

                if (fitsInTimeWindow) {
                    await window.resyncToLatest(fitsInTimeWindow);
                } else {
                    await window.resetToLatest(true);
                }
            } catch (_e) {
                // Best effort: the connection can drop again mid-resync. The
                // window keeps its current content and stays usable, so the
                // application can refresh it on demand.
            }
        }
    }

    private async handleRoomUpdated(ev: RoomUpdated): Promise<void> {
        if (this.room.id === ev.room.id) {
            this.room = ev.room;

            this.updateHistoryMode(ev.room);

            if (ev.room.defaultTopic) {
                this.createHistoryWindowForTopic(ev.room.defaultTopic);
            }

            for (const [, window] of Array.from(this.historyWindows.items)) {
                await window.setTraverseLock(this.traverseLock);
            }
        }
    }

    private handleNewTopic(ev: NewTopic): void {
        if (this.room.id === ev.roomId) {
            this.createHistoryWindowForTopic(ev.topic);
        }
    }

    private handleTopicDeleted(ev: TopicDeleted): void {
        if (this.room.id === ev.location.roomId) {
            this.historyWindows.delete(ev.location.topicId);
        }
    }

    private createHistoryWindowForTopic(topic: Topic): void {
        if (this.historyWindows.has(topic.id)) {
            return;
        }

        const historyWindow = new TopicHistoryWindow(this.room.id, topic.id, this.tracker);

        void historyWindow.setTraverseLock(this.traverseLock);

        this.historyWindows.set([topic.id, historyWindow]);

        // Current behavior of deletion a message with referenced topic is to delete the whole side topic
        // So we need to listen for topic deletions here
        historyWindow.on('reftopicsdeleted', (deletedTopicIds: string[]) => {
            for (const topicId of deletedTopicIds) {
                this.historyWindows.delete(topicId);
            }
            this.tracker.rooms._deleteTopicsFromRoom(this.room.id, ...deletedTopicIds);
        });

        // If new topic refers to some message from this room, update other structures
        if (topic.refMessage) {
            const refHistoryWindow = this.historyWindows.get(topic.refMessage.location.topicId);
            refHistoryWindow?._updateMessageReference(topic);
        }
    }

    private updateHistoryMode(room: Room): void {
        this.traverseLock = room.history?.mode === 'Ephemeral';
        this.timeLimitedHistory = room.history?.mode === 'MaxAge';
    }

    /**
     * Build a predicate telling whether an already loaded message still fits in
     * the room's time-limited history window, so that messages the server has
     * dropped in the meantime are not kept locally forever.
     */
    private createTimeWindowFilter(): (message: Message) => boolean {
        const maxAge = this.room.history?.maxAge;

        if (! maxAge || maxAge <= 0) {
            // Length of the window is unknown - keep what is loaded and let the
            // server decide what it still returns.
            return () => true;
        }

        const oldestAllowedAt = Date.now() - maxAge * 1000; // maxAge is in seconds.

        return (message: Message) => {
            const createdAt = Date.parse(message.createdAt);
            // Messages without a usable timestamp are kept - dropping them would
            // lose history that the server may still have.
            return isNaN(createdAt) || createdAt >= oldestAllowedAt;
        };
    }
}