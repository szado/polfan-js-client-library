import { ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
import { Room, RoomMember, Topic } from "../types/src";
import { ChatStateTracker } from "./ChatStateTracker";
import { MessagesManager } from "./MessagesManager";
export declare class RoomsManager {
    private tracker;
    readonly messages: MessagesManager;
    private readonly list;
    private readonly topics;
    private readonly members;
    private readonly deferredSession;
    private readonly membersPromises;
    constructor(tracker: ChatStateTracker);
    /**
     * Get collection of room members.
     */
    getMembers(roomId: string): Promise<ObservableIndexedObjectCollection<RoomMember> | undefined>;
    /**
     * Get a room member representing the current user.
     */
    getMe(roomId: string): Promise<RoomMember | undefined>;
    /**
     * Get collection of all the rooms you are in.
     */
    get(): Promise<ObservableIndexedObjectCollection<Room>>;
    /**
     * Get collection of room topics.
     */
    getTopics(roomId: string): Promise<ObservableIndexedObjectCollection<Topic> | undefined>;
    private deleteRoom;
    private deleteRoomsBySpaceId;
    private handleSpaceMemberUpdated;
    private handleSpaceMemberLeft;
    private handleRoomMemberUpdated;
    private handleSpaceDeleted;
    private handleTopicDeleted;
    private handleNewTopic;
    private addJoinedRoomTopics;
    private handleRoomJoined;
    private handleRoomUpdated;
    private handleRoomDeleted;
    private addJoinedRooms;
    private handleRoomLeft;
    private handleRoomMemberJoined;
    private handleRoomMemberLeft;
    private handleRoomMembers;
    private handleSession;
    private handleUserUpdated;
    private handleNewMessage;
}
