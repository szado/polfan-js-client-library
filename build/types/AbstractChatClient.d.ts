import { Bye, GetSession, JoinSpace, Session, SpaceJoined, Error as ErrorType, SpaceLeft, SpaceMemberJoined, SpaceMemberLeft, SpaceMemberUpdated, SpaceDeleted, SpaceMembers, SpaceRooms, NewRole, RoomDeleted, RoomJoined, RoomLeft, RoomMemberLeft, RoomMemberJoined, RoomMembers, NewRoom, NewTopic, TopicDeleted, NewMessage, GetPermissionOverwrites, GetComputedPermissions, LeaveSpace, CreateSpace, DeleteSpace, GetSpaceMembers, GetSpaceRooms, CreateRole, DeleteRole, AssignRole, DeassignRole, SetPermissionOverwrites, JoinRoom, LeaveRoom, CreateRoom, DeleteRoom, GetRoomMembers, CreateTopic, DeleteTopic, CreateMessage, Envelope, PermissionOverwrites, PermissionOverwritesUpdated, RoomMemberUpdated, UpdateRole, RoleUpdated, Ack, UserUpdated, UpdateRoom, RoomUpdated, UpdateSpace, SpaceUpdated, PermissionOverwriteTargets, GetPermissionOverwriteTargets, Owners, Ok, GetOwners, CreateOwner, RoleDeleted, FollowedTopicUpdated, TopicFollowed, TopicUnfollowed, FollowedTopics, FollowTopic, UnfollowTopic, GetFollowedTopics, Messages, GetMessages, Topics, GetTopics, TopicUpdated, UpdateTopic, GetDiscoverableSpaces, DiscoverableSpaces } from "./types/src/index";
import { EventTarget } from "./EventTarget";
type ArrayOfPromiseResolvers = [(value: any) => void, (reason?: any) => void];
export declare abstract class AbstractChatClient extends EventTarget {
    protected awaitingResponse: Map<string, ArrayOfPromiseResolvers>;
    protected sentCounter: number;
    abstract send<CommandType extends keyof CommandsMap>(commandType: CommandType, commandData: CommandsMap[CommandType][0]): Promise<CommandResult<CommandsMap[CommandType][1]>>;
    on<EventName extends keyof EventsMap>(eventName: EventName | string, handler: (event: EventsMap[EventName]) => void): this;
    once<EventName extends keyof EventsMap>(eventName: EventName, handler: (event: EventsMap[EventName]) => void): this;
    protected createEnvelope<CommandT>(type: string, data: CommandT): Envelope<CommandT>;
    protected createPromiseFromCommandEnvelope<CommandT extends keyof CommandsMap>(envelope: Envelope<CommandsMap[CommandT][0]>): Promise<CommandResult<CommandsMap[CommandT][1]>>;
    protected handleIncomingEnvelope(envelope: Envelope): void;
    protected handleEnvelopeSendError(envelope: Envelope, error: any): void;
}
export type CommandResult<ResultT> = {
    data?: ResultT;
    error?: Error;
};
/**
 * Map of incoming events.
 */
export type EventsMap = {
    Bye: Bye;
    Ok: Ok;
    Error: ErrorType;
    Session: Session;
    Permissions: Permissions;
    PermissionOverwrites: PermissionOverwrites;
    PermissionOverwritesUpdated: PermissionOverwritesUpdated;
    PermissionOverwriteTargets: PermissionOverwriteTargets;
    Owners: Owners;
    DiscoverableSpaces: DiscoverableSpaces;
    SpaceJoined: SpaceJoined;
    SpaceLeft: SpaceLeft;
    SpaceMemberJoined: SpaceMemberJoined;
    SpaceMemberLeft: SpaceMemberLeft;
    SpaceMemberUpdated: SpaceMemberUpdated;
    SpaceUpdated: SpaceUpdated;
    SpaceDeleted: SpaceDeleted;
    SpaceMembers: SpaceMembers;
    SpaceRooms: SpaceRooms;
    NewRole: NewRole;
    RoleDeleted: RoleDeleted;
    RoleUpdated: RoleUpdated;
    RoomJoined: RoomJoined;
    RoomLeft: RoomLeft;
    RoomMemberJoined: RoomMemberJoined;
    RoomMemberLeft: RoomMemberLeft;
    RoomMemberUpdated: RoomMemberUpdated;
    RoomMembers: RoomMembers;
    NewRoom: NewRoom;
    RoomDeleted: RoomDeleted;
    RoomUpdated: RoomUpdated;
    NewTopic: NewTopic;
    TopicDeleted: TopicDeleted;
    NewMessage: NewMessage;
    UserUpdated: UserUpdated;
    TopicFollowed: TopicFollowed;
    TopicUnfollowed: TopicUnfollowed;
    FollowedTopics: FollowedTopics;
    FollowedTopicUpdated: FollowedTopicUpdated;
    Messages: Messages;
    Topics: Topics;
    TopicUpdated: TopicUpdated;
};
/**
 * Map of commands and their corresponding events.
 */
export type CommandsMap = {
    GetSession: [GetSession, EventsMap['Session']];
    SetPermissionOverwrites: [SetPermissionOverwrites, EventsMap['PermissionOverwritesUpdated']];
    GetPermissionOverwrites: [GetPermissionOverwrites, EventsMap['PermissionOverwrites']];
    GetComputedPermissions: [GetComputedPermissions, EventsMap['Permissions']];
    GetPermissionOverwriteTargets: [GetPermissionOverwriteTargets, EventsMap['PermissionOverwriteTargets']];
    GetOwners: [GetOwners, EventsMap['Owners']];
    CreateOwner: [CreateOwner, EventsMap['Owners']];
    DeleteOwner: [CreateOwner, EventsMap['Owners']];
    GetDiscoverableSpaces: [GetDiscoverableSpaces, EventsMap['DiscoverableSpaces']];
    JoinSpace: [JoinSpace, EventsMap['SpaceJoined']];
    LeaveSpace: [LeaveSpace, EventsMap['SpaceLeft']];
    CreateSpace: [CreateSpace, EventsMap['SpaceJoined']];
    UpdateSpace: [UpdateSpace, EventsMap['SpaceUpdated']];
    DeleteSpace: [DeleteSpace, EventsMap['SpaceDeleted']];
    GetSpaceMembers: [GetSpaceMembers, EventsMap['SpaceMembers']];
    GetSpaceRooms: [GetSpaceRooms, EventsMap['SpaceRooms']];
    CreateRole: [CreateRole, EventsMap['NewRole']];
    DeleteRole: [DeleteRole, EventsMap['RoleDeleted']];
    UpdateRole: [UpdateRole, EventsMap['RoleUpdated']];
    AssignRole: [AssignRole, EventsMap['SpaceMemberUpdated'] | EventsMap['RoomMemberUpdated']];
    DeassignRole: [DeassignRole, EventsMap['SpaceMemberUpdated'] | EventsMap['RoomMemberUpdated']];
    JoinRoom: [JoinRoom, EventsMap['RoomJoined']];
    LeaveRoom: [LeaveRoom, EventsMap['RoomLeft']];
    CreateRoom: [CreateRoom, EventsMap['NewRoom']];
    DeleteRoom: [DeleteRoom, EventsMap['RoomDeleted']];
    UpdateRoom: [UpdateRoom, EventsMap['RoomUpdated']];
    GetRoomMembers: [GetRoomMembers, EventsMap['RoomMembers']];
    CreateTopic: [CreateTopic, EventsMap['NewTopic']];
    DeleteTopic: [DeleteTopic, EventsMap['TopicDeleted']];
    CreateMessage: [CreateMessage, EventsMap['NewMessage']];
    Ack: [Ack, EventsMap['FollowedTopicUpdated'] | EventsMap['Ok']];
    FollowTopic: [FollowTopic, EventsMap['TopicFollowed']];
    UnfollowTopic: [UnfollowTopic, EventsMap['TopicUnfollowed']];
    GetFollowedTopics: [GetFollowedTopics, EventsMap['FollowedTopics']];
    GetMessages: [GetMessages, EventsMap['Messages']];
    GetTopics: [GetTopics, EventsMap['Topics']];
    UpdateTopic: [UpdateTopic, EventsMap['TopicUpdated']];
};
export {};
