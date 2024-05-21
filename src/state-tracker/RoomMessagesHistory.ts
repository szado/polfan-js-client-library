import {ChatStateTracker} from "./ChatStateTracker";
import {NewTopic, Room, RoomUpdated, Topic, TopicDeleted} from "../types/src";
import {IndexedCollection,} from "../IndexedObjectCollection";
import {TopicHistoryWindow} from "./TopicHistoryWindow";

export class RoomMessagesHistory {
    private historyWindows = new IndexedCollection<string, TopicHistoryWindow>();

    public constructor(
        private room: Room,
        private tracker: ChatStateTracker,
    ) {
        this.tracker.client.on('RoomUpdated', ev => this.handleRoomUpdated(ev));
        this.tracker.client.on('NewTopic', ev => this.handleNewTopic(ev));
        this.tracker.client.on('TopicDeleted', ev => this.handleTopicDeleted(ev));

        if (this.room.defaultTopic) {
            this.createHistoryWindowForTopic(this.room.defaultTopic);
        }
    }

    /**
     * Returns a history window object for the given topic ID, allowing you to view message history.
     */
    public async getMessagesWindow(topicId: string): Promise<TopicHistoryWindow | undefined> {
        let historyWindow = this.historyWindows.get(topicId);

        if (! historyWindow) {
            const topic = (await this.tracker.rooms.getTopics(this.room.id, [topicId])).get(topicId);

            if (topic) {
                this.createHistoryWindowForTopic(topic);
            }
        }

        return this.historyWindows.get(topicId);
    }

    private handleRoomUpdated(ev: RoomUpdated): void {
        if (this.room.id === ev.room.id) {
            this.room = ev.room;

            if (ev.room.defaultTopic) {
                this.createHistoryWindowForTopic(ev.room.defaultTopic);
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

        this.historyWindows.set([topic.id, new TopicHistoryWindow(this.room.id, topic.id, this.tracker)]);

        // If new topic refers to some message from this room, update other structures
        if (topic.messageRef) {
            const refHistoryWindow = this.historyWindows.get(topic.messageRef.topicId);

            refHistoryWindow._setTopicReference({
                topicId: topic.id, // Reverse the reference
                messageId: topic.messageRef.messageId,
            });
        }
    }
}