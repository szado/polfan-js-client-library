import { Bye, GetSession, JoinSpace, Session, SpaceJoined, Error as ErrorType, SpaceLeft, SpaceMemberJoined, SpaceMemberLeft, SpaceMemberUpdated, SpaceDeleted, SpaceMembers, SpaceRooms, NewRole, RoomDeleted, RoomJoined, RoomLeft, RoomMemberLeft, RoomMemberJoined, RoomMembers, NewRoom, NewTopic, TopicDeleted, NewMessage, GetPermissionOverwrites, GetComputedPermissions, LeaveSpace, CreateSpace, DeleteSpace, GetSpaceMembers, GetSpaceRooms, CreateRole, DeleteRole, AssignRole, DeassignRole, SetPermissionOverwrites, JoinRoom, LeaveRoom, CreateRoom, DeleteRoom, GetRoomMembers, CreateTopic, DeleteTopic, CreateMessage, Envelope, PermissionOverwrites, PermissionOverwritesChanged, RoomMemberUpdated, UpdateRole, RoleUpdated, AckReports, Ack, GetAckReports, UserChanged } from "pserv-ts-types";
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
    Error: ErrorType;
    Session: Session;
    Permissions: Permissions;
    PermissionOverwrites: PermissionOverwrites;
    PermissionOverwritesChanged: PermissionOverwritesChanged;
    SpaceJoined: SpaceJoined;
    SpaceLeft: SpaceLeft;
    SpaceMemberJoined: SpaceMemberJoined;
    SpaceMemberLeft: SpaceMemberLeft;
    SpaceMemberUpdated: SpaceMemberUpdated;
    SpaceDeleted: SpaceDeleted;
    SpaceMembers: SpaceMembers;
    SpaceRooms: SpaceRooms;
    NewRole: NewRole;
    RoleDeleted: RoomDeleted;
    RoleUpdated: RoleUpdated;
    RoomJoined: RoomJoined;
    RoomLeft: RoomLeft;
    RoomMemberJoined: RoomMemberJoined;
    RoomMemberLeft: RoomMemberLeft;
    RoomMemberUpdated: RoomMemberUpdated;
    RoomMembers: RoomMembers;
    NewRoom: NewRoom;
    RoomDeleted: RoomDeleted;
    NewTopic: NewTopic;
    TopicDeleted: TopicDeleted;
    NewMessage: NewMessage;
    AckReports: AckReports;
    UserChanged: UserChanged;
};
/**
 * Map of commands and their corresponding events.
 */
export type CommandsMap = {
    GetSession: [GetSession, EventsMap['Session']];
    SetPermissionOverwrites: [SetPermissionOverwrites, EventsMap['PermissionOverwritesChanged']];
    GetPermissionOverwrites: [GetPermissionOverwrites, EventsMap['PermissionOverwrites']];
    GetComputedPermissions: [GetComputedPermissions, EventsMap['Permissions']];
    JoinSpace: [JoinSpace, EventsMap['SpaceJoined']];
    LeaveSpace: [LeaveSpace, EventsMap['SpaceLeft']];
    CreateSpace: [CreateSpace, EventsMap['SpaceJoined']];
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
    GetRoomMembers: [GetRoomMembers, EventsMap['RoomMembers']];
    CreateTopic: [CreateTopic, EventsMap['NewTopic']];
    DeleteTopic: [DeleteTopic, EventsMap['TopicDeleted']];
    CreateMessage: [CreateMessage, EventsMap['NewMessage']];
    Ack: [Ack, EventsMap['AckReports']];
    GetAckReports: [GetAckReports, EventsMap['AckReports']];
};
export {};
