import { Bye, GetSession, JoinSpace, Ok, Session, SpaceJoined, Error as ErrorType, SpaceLeft, SpaceMemberJoined, SpaceMemberLeft, SpaceMemberUpdate, SpaceDeleted, SpaceMembers, SpaceRooms, NewRole, RoomDeleted, RoomJoined, RoomLeft, RoomMemberLeft, RoomMemberJoined, RoomMembers, NewRoom, NewTopic, TopicDeleted, NewMessage, GetUserPermissions, SetUserPermissions, GetComputedPermissions, LeaveSpace, CreateSpace, DeleteSpace, GetSpaceMembers, GetSpaceRooms, CreateRole, DeleteRole, AssignRole, DeassignRole, SetRolePermissions, GetRolePermissions, JoinRoom, LeaveRoom, CreateRoom, DeleteRoom, GetRoomMembers, CreateTopic, DeleteTopic, CreateMessage, Envelope } from "pserv-ts-types";
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
    SpaceJoined: SpaceJoined;
    SpaceLeft: SpaceLeft;
    SpaceMemberJoined: SpaceMemberJoined;
    SpaceMemberLeft: SpaceMemberLeft;
    SpaceMemberUpdate: SpaceMemberUpdate;
    SpaceDeleted: SpaceDeleted;
    SpaceMembers: SpaceMembers;
    SpaceRooms: SpaceRooms;
    NewRole: NewRole;
    RoleDeleted: RoomDeleted;
    RoomJoined: RoomJoined;
    RoomLeft: RoomLeft;
    RoomMemberJoined: RoomMemberJoined;
    RoomMemberLeft: RoomMemberLeft;
    RoomMembers: RoomMembers;
    NewRoom: NewRoom;
    RoomDeleted: RoomDeleted;
    NewTopic: NewTopic;
    TopicDeleted: TopicDeleted;
    NewMessage: NewMessage;
};
/**
 * Map of commands and their corresponding events.
 */
export type CommandsMap = {
    GetSession: [GetSession, EventsMap['Session']];
    SetUserPermissions: [SetUserPermissions, EventsMap['Permissions']];
    GetUserPermissions: [GetUserPermissions, EventsMap['Permissions']];
    GetComputedPermissions: [GetComputedPermissions, EventsMap['Permissions']];
    JoinSpace: [JoinSpace, EventsMap['SpaceJoined']];
    LeaveSpace: [LeaveSpace, EventsMap['SpaceLeft']];
    CreateSpace: [CreateSpace, EventsMap['SpaceJoined']];
    DeleteSpace: [DeleteSpace, EventsMap['SpaceDeleted']];
    GetSpaceMembers: [GetSpaceMembers, EventsMap['SpaceMembers']];
    GetSpaceRooms: [GetSpaceRooms, EventsMap['SpaceRooms']];
    CreateRole: [CreateRole, EventsMap['NewRole']];
    DeleteRole: [DeleteRole, EventsMap['RoleDeleted']];
    AssignRole: [AssignRole, EventsMap['SpaceMemberUpdate']];
    DeassignRole: [DeassignRole, EventsMap['SpaceMemberUpdate']];
    SetRolePermissions: [SetRolePermissions, EventsMap['Permissions']];
    GetRolePermissions: [GetRolePermissions, EventsMap['Permissions']];
    JoinRoom: [JoinRoom, EventsMap['RoomJoined']];
    LeaveRoom: [LeaveRoom, EventsMap['RoomLeft']];
    CreateRoom: [CreateRoom, EventsMap['NewRoom']];
    DeleteRoom: [DeleteRoom, EventsMap['RoomDeleted']];
    GetRoomMembers: [GetRoomMembers, EventsMap['RoomMembers']];
    CreateTopic: [CreateTopic, EventsMap['NewTopic']];
    DeleteTopic: [DeleteTopic, EventsMap['TopicDeleted']];
    CreateMessage: [CreateMessage, EventsMap['NewMessage']];
};
export {};
