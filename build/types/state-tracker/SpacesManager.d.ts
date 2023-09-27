import { ChatStateTracker } from "./ChatStateTracker";
import { ObservableIndexedObjectCollection } from "../IndexedObjectCollection";
import { Role, RoomSummary, Space, SpaceMember } from "pserv-ts-types";
export declare class SpacesManager {
    private tracker;
    private readonly list;
    private readonly roles;
    private readonly rooms;
    private readonly members;
    private readonly deferredSession;
    constructor(tracker: ChatStateTracker);
    /**
     * Get collection of all the spaces you are in.
     */
    get(): Promise<ObservableIndexedObjectCollection<Space>>;
    /**
     * Get collection of space roles.
     */
    getRoles(spaceId: string): Promise<ObservableIndexedObjectCollection<Role> | undefined>;
    /**
     * Get collection of the all available rooms inside given space.
     */
    getRooms(spaceId: string): Promise<ObservableIndexedObjectCollection<RoomSummary> | undefined>;
    /**
     * Get collection of space members.
     */
    getMembers(spaceId: string): Promise<ObservableIndexedObjectCollection<SpaceMember> | undefined>;
    /**
     * Get a space member representing the current user.
     */
    getMe(spaceId: string): Promise<SpaceMember | undefined>;
    private handleNewRole;
    private handleNewRoom;
    private handleRoomDeleted;
    private handleRoleDeleted;
    private handleSpaceDeleted;
    private handleSpaceJoined;
    private addJoinedSpaces;
    private handleSpaceLeft;
    private handleSpaceMemberJoined;
    private handleSpaceMemberLeft;
    private handleSpaceMembers;
    private handleSpaceRooms;
    private handleSpaceMemberUpdated;
    private handleRoleUpdated;
    private handleSession;
}
