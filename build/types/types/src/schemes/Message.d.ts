import { User } from "./User";
export declare enum MessageType {
    Text = "Text",
    RoomJoin = "RoomJoin",
    RoomLeave = "RoomLeave",
    SpaceJoin = "SpaceJoin",
    SpaceLeave = "SpaceLeave"
}
export interface Message {
    id: string;
    createdAt: string;
    type: MessageType;
    user: User;
    content?: string;
    topicRef: string | null;
    attachments: string[] | null;
}
