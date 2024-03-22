import { Topic } from "./Topic";
export type RoomType = 'text';
export interface Room {
    id: string;
    spaceId: string | null;
    name: string;
    description: string;
    type: RoomType;
    defaultTopic: Topic | null;
}
