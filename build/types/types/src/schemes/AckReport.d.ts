export interface AckReport {
    roomId: string;
    topicId: string;
    lastAckMessageId: string | null;
    missed: number | null;
    missedMoreThan: number | null;
}
