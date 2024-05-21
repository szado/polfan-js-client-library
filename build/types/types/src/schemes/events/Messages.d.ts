import { ChatLocation } from "../ChatLocation";
import { Message } from "../Message";
export interface Messages {
    location: ChatLocation;
    messages: Message[];
}
