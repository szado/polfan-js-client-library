import { User } from "./User";
export interface Message {
    id: string;
    createdAt: string;
    author: User;
    content: string;
    topicRef: string | null;
}
