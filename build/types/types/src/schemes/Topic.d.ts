import { MessageReference } from "./commands/CreateTopic";
import { Message } from "./Message";
export interface Topic {
    id: string;
    name: string;
    messageCount: number;
    messageRef?: MessageReference;
    lastMessage?: Message;
}
