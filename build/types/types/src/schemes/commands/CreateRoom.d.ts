import { RoomType } from "../Room";
export interface CreateRoom {
    spaceId: string;
    name: string;
    description: string;
    type: RoomType;
}
