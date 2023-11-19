import {ChatStateTracker} from "./ChatStateTracker";
import {AckReport, AckReports, Message, NewMessage, Topic} from "pserv-ts-types";
import {
    IndexedCollection,
    ObservableIndexedObjectCollection
} from "../IndexedObjectCollection";

export const getCombinedId = (...ids: string[]) => ids.join('_');

export class MessagesManager {
    // Temporary not lazy loaded; server must implement GetTopicMessages command.
    private readonly list = new IndexedCollection<string, ObservableIndexedObjectCollection<Message>>();
    private readonly acks: IndexedCollection<string, ObservableIndexedObjectCollection<AckReport>> = new IndexedCollection();

    public constructor(private tracker: ChatStateTracker) {
        this.tracker.client.on('NewMessage', ev => this.handleNewMessage(ev));
        this.tracker.client.on('AckReports', ev => this.handleAckReports(ev));
    }

    /**
     * Get collection of the messages written in topic.
     */
    public async get(roomId: string, topicId: string): Promise<ObservableIndexedObjectCollection<Message> | undefined> {
        return this.list.get(getCombinedId(roomId, topicId));
    }

    /**
     * Cache ack reports for all joined rooms in a space and fetch them in bulk if necessary.
     * Then you can get the reports using getRoomAckReports().
     * @see getRoomAckReports
     */
    public async cacheSpaceAckReports(spaceId: string): Promise<void> {
        if (! (await this.tracker.spaces.get()).has(spaceId)) {
            throw `You are not in space ${spaceId}`;
        }

        const roomIds = (await this.tracker.rooms.get()).findBy('spaceId', spaceId).map(room => room.id);
        const missingRoomIds = roomIds.filter(roomId => ! this.acks.has(roomId));

        if (missingRoomIds.length) {
            // If we don't have ack reports for all rooms in space, fetch them
            const result = await this.tracker.client.send('GetAckReports', {spaceId});

            if (result.error) {
                throw result.error;
            }

            missingRoomIds.forEach(roomId => {
                const reports = result.data.reports.filter(report => report.roomId === roomId);
                this.acks.set([roomId, new ObservableIndexedObjectCollection('topicId', reports)]);
            });
        }
    }

    /**
     * Get ack reports for the given room. Undefined if you are not in the room.
     * @param roomId
     */
    public async getRoomAckReports(roomId: string): Promise<ObservableIndexedObjectCollection<AckReport> | undefined> {
        const room = (await this.tracker.rooms.get()).get(roomId);

        if (! room) {
            return undefined;
        }

        if (! this.acks.has(roomId)) {
            const result = await this.tracker.client.send('GetAckReports', {roomId});

            if (result.error) {
                throw result.error;
            }

            this.acks.set([roomId, new ObservableIndexedObjectCollection('topicId', result.data.reports)]);
        }

        return this.acks.get(roomId);
    }

    /**
     * For internal use. If you want to delete the message, execute a proper command on client object.
     * @internal
     */
    public _deleteByTopicIds(roomId: string, ...topicIds: string[]): void {
        this.list.delete(...topicIds.map(topicId => getCombinedId(roomId, topicId)));
        this.acks.get(roomId)?.delete(...topicIds);
    }

    /**
     * For internal use. If you want to add new topic, execute a proper command on client object.
     * @internal
     */
    public _handleNewTopics(roomId: string, ...topics: Topic[]): void {
        this.list.set(...topics.map<[string, ObservableIndexedObjectCollection<Message>]>(topic => [
            getCombinedId(roomId, topic.id),
            new ObservableIndexedObjectCollection<Message>('id'),
        ]));
        this.createAckReportsForNewTopics(roomId, topics);
    }

    private handleNewMessage(ev: NewMessage): void {
        this.list.get(getCombinedId(ev.roomId, ev.topicId)).set(ev.message);
        this.updateLocallyAckReportOnNewMessage(ev);
    }

    private handleAckReports(ev: AckReports): void {
        ev.reports.forEach(report => {
            const ackReports = this.acks.get(report.roomId);
            if (ackReports) {
                ackReports.set(report);
            }
        });
    }

    private createAckReportsForNewTopics(roomId: string, topics: Topic[]): void {
        const ackReports = this.acks.get(roomId);

        if (! ackReports) {
            // If we don't follow ack reports for this room, skip
            return;
        }

        const newReports: AckReport[] = topics.map(topic => ({
            roomId, topicId: topic.id, lastAckMessageId: null, missed: 0, missedMoreThan: null
        }));

        ackReports.set(...newReports);
    }

    private updateLocallyAckReportOnNewMessage(ev: NewMessage): void {
        const ackReports = this.acks.get(ev.roomId);

        if (! ackReports) {
            // If we don't follow ack reports for this room, skip
            return;
        }

        const isMe = ev.message.author.id === this.tracker.me?.id;
        const currentAckReport = ackReports.get(ev.topicId);
        let update: Partial<AckReport>;

        if (isMe) {
            // Reset missed messages count if new message is authored by me
            update = {missed: 0, missedMoreThan: null, lastAckMessageId: ev.message.id};
        } else {
            // ...add 1 otherwise
            update = {
                missed: currentAckReport.missed === null ? null : currentAckReport.missed + 1,
                missedMoreThan: currentAckReport.missedMoreThan === null ? null : currentAckReport.missedMoreThan,
            };
        }

        ackReports.set({...currentAckReport, ...update});
    }
}