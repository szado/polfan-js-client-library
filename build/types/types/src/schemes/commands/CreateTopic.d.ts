import { ChatLocation } from "../ChatLocation";
import { CreateMessage } from "./CreateMessage";
export interface CreateTopic {
    location: ChatLocation;
    name: string;
    refMessageId?: string;
    initialMessage?: Omit<CreateMessage, 'location'>;
}
