import { Message } from "../Message";
import { ChatLocation } from "../ChatLocation";
export interface NewMessage {
    location: ChatLocation;
    message: Message;
}
