import { ChatLocation } from "../ChatLocation";
import { CreateMessage } from "./CreateMessage";
export interface MessageReference {
    topicId: string;
    messageId: string;
}
export interface CreateTopic {
    location: ChatLocation;
    name: string;
    messageRef: MessageReference | null;
    initialMessage: Omit<CreateMessage, 'location'> | null;
}
