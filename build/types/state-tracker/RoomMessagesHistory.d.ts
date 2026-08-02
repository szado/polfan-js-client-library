import { ChatStateTracker } from "./ChatStateTracker";
import { Room } from "../types/src";
import { TopicHistoryWindow } from "./TopicHistoryWindow";
export declare class RoomMessagesHistory {
    private room;
    private tracker;
    private historyWindows;
    private traverseLock;
    private timeLimitedHistory;
    constructor(room: Room, tracker: ChatStateTracker);
    /**
     * Returns a history window object for the given topic ID, allowing you to view message history.
     * @param topicId
     * @param peek If true, do not create a cache for this topic and do not allow it to collect new messages.
     */
    getMessagesWindow(topicId: string, peek?: boolean): Promise<TopicHistoryWindow | undefined>;
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
     * that aged out of it in the meantime are dropped. Messages returned in both
     * are deduplicated, and a room where nothing (or almost nothing) was written
     * during the downtime keeps its loaded history instead of being emptied by a
     * short latest page.
     */
    resync(room: Room): Promise<void>;
    private handleRoomUpdated;
    private handleNewTopic;
    private handleTopicDeleted;
    private createHistoryWindowForTopic;
    private updateHistoryMode;
    /**
     * Build a predicate telling whether an already loaded message still fits in
     * the room's time-limited history window, so that messages the server has
     * dropped in the meantime are not kept locally forever.
     */
    private createTimeWindowFilter;
}
