import { ChatLocation } from "./ChatLocation";
export interface FollowedTopic {
    location: ChatLocation;
    lastAckMessageId: string | null;
    missed: number | null;
}
