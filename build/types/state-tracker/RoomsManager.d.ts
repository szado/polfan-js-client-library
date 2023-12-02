import { ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
import { Room, RoomMember, SpaceMember, Topic } from "pserv-ts-types";
import { ChatStateTracker } from "./ChatStateTracker";
import { MessagesManager } from "./MessagesManager";
export declare class RoomsManager {
    private tracker;
    readonly messages: MessagesManager;
    private readonly list;
    private readonly topics;
    private readonly members;
    private readonly deferredSession;
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
    /**
     * For internal use. If you want to leave the room, execute a proper command on client object.
     * @internal
     */
    _delete(...roomIds: string[]): void;
    /**
     * For internal use. If you want to leave the room, execute a proper command on client object.
     * @internal
     */
    _deleteBySpaceId(spaceId: string): void;
    /**
     * For internal use.
     * @internal
     */
    _handleSpaceMemberUpdate(spaceId: string, member: SpaceMember): void;
    private handleRoomMemberUpdated;
    private handleTopicDeleted;
    private handleNewTopic;
    private addJoinedRoomTopics;
    private handleRoomJoined;
    private addJoinedRooms;
    private handleRoomLeft;
    private handleRoomMemberJoined;
    private handleRoomMemberLeft;
    private handleRoomMembers;
    private handleSession;
    private handleUserChanged;
}
