import { Topic } from "./Topic";
export type RoomType = 'Text';
export interface Room {
    id: string;
    spaceId: string | null;
    name: string;
    description: string;
    type: RoomType;
    defaultTopic: Topic | null;
}
