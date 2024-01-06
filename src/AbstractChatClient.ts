import {
    Bye,
    GetSession,
    JoinSpace,
    Session,
    SpaceJoined,
    Error as ErrorType,
    SpaceLeft,
    SpaceMemberJoined,
    SpaceMemberLeft,
    SpaceMemberUpdated,
    SpaceDeleted,
    SpaceMembers,
    SpaceRooms,
    NewRole,
    RoomDeleted,
    RoomJoined,
    RoomLeft,
    RoomMemberLeft,
    RoomMemberJoined,
    RoomMembers,
    NewRoom,
    NewTopic,
    TopicDeleted,
    NewMessage,
    GetPermissionOverwrites,
    GetComputedPermissions,
    LeaveSpace,
    CreateSpace,
    DeleteSpace,
    GetSpaceMembers,
    GetSpaceRooms,
    CreateRole,
    DeleteRole,
    AssignRole,
    DeassignRole,
    SetPermissionOverwrites,
    JoinRoom,
    LeaveRoom,
    CreateRoom,
    DeleteRoom,
    GetRoomMembers,
    CreateTopic,
    DeleteTopic,
    CreateMessage,
    Envelope,
    PermissionOverwrites,
    PermissionOverwritesUpdated,
    RoomMemberUpdated,
    UpdateRole,
    RoleUpdated,
    AckReports,
    Ack,
    GetAckReports,
    UserUpdated,
    UpdateRoom,
    RoomUpdated,
    UpdateSpace,
    SpaceUpdated,
    PermissionOverwriteTargets,
    GetPermissionOverwriteTargets,
} from "pserv-ts-types";
import {EventTarget} from "./EventTarget";

type ArrayOfPromiseResolvers = [(value: any) => void, (reason?: any) => void];

export abstract class AbstractChatClient extends EventTarget {
    protected awaitingResponse: Map<string, ArrayOfPromiseResolvers> = new Map<string, ArrayOfPromiseResolvers>();
    protected sentCounter: number = 0;

    public abstract send<CommandType extends keyof CommandsMap>
        (commandType: CommandType, commandData: CommandsMap[CommandType][0]): Promise<CommandResult<CommandsMap[CommandType][1]>>;

    public on<EventName extends keyof EventsMap>
        (eventName: EventName | string, handler: (event: EventsMap[EventName]) => void): this {
        return super.on(eventName, handler);
    }

    public once<EventName extends keyof EventsMap>
        (eventName: EventName, handler: (event: EventsMap[EventName]) => void): this {
        return super.once(eventName, handler);
    }

    protected createEnvelope<CommandT>(type: string, data: CommandT): Envelope<CommandT> {
        return {
            type, data, ref: (++this.sentCounter).toString()
        };
    }

    protected createPromiseFromCommandEnvelope
        <CommandT extends keyof CommandsMap>(envelope: Envelope<CommandsMap[CommandT][0]>):
        Promise<CommandResult<CommandsMap[CommandT][1]>> {
        return new Promise((...args) =>
            this.awaitingResponse.set(envelope.ref as string, args));
    }

    protected handleIncomingEnvelope(envelope: Envelope): void {
        if (!this.awaitingResponse.has(envelope.ref)) {
            return;
        }
        const isError = envelope.type === 'Error';
        this.awaitingResponse.get(envelope.ref)[0]({
            data: isError ? null : envelope.data,
            error: isError ? envelope.data : null,
        } as CommandResult<any>);
        this.awaitingResponse.delete(envelope.ref);
    }

    protected handleEnvelopeSendError(envelope: Envelope, error: any): void {
        if (!this.awaitingResponse.has(envelope.ref)) {
            return;
        }
        this.awaitingResponse.get(envelope.ref)[0](error);
        this.awaitingResponse.delete(envelope.ref);
    }
}

export type CommandResult<ResultT> = {data?: ResultT, error?: Error};

/**
 * Map of incoming events.
 */
export type EventsMap = {
    // General Events
    Bye: Bye,
    Error: ErrorType,
    Session: Session,
    Permissions: Permissions,
    PermissionOverwrites: PermissionOverwrites,
    PermissionOverwritesUpdated: PermissionOverwritesUpdated,
    PermissionOverwriteTargets: PermissionOverwriteTargets,
    // Space events
    SpaceJoined: SpaceJoined,
    SpaceLeft: SpaceLeft,
    SpaceMemberJoined: SpaceMemberJoined,
    SpaceMemberLeft: SpaceMemberLeft,
    SpaceMemberUpdated: SpaceMemberUpdated,
    SpaceUpdated: SpaceUpdated,
    SpaceDeleted: SpaceDeleted,
    SpaceMembers: SpaceMembers,
    SpaceRooms: SpaceRooms,
    NewRole: NewRole,
    RoleDeleted: RoomDeleted,
    RoleUpdated: RoleUpdated,
    // Room events
    RoomJoined: RoomJoined,
    RoomLeft: RoomLeft,
    RoomMemberJoined: RoomMemberJoined,
    RoomMemberLeft: RoomMemberLeft,
    RoomMemberUpdated: RoomMemberUpdated,
    RoomMembers: RoomMembers,
    NewRoom: NewRoom,
    RoomDeleted: RoomDeleted,
    RoomUpdated: RoomUpdated,
    // Topic events
    NewTopic: NewTopic,
    TopicDeleted: TopicDeleted,
    NewMessage: NewMessage,
    AckReports: AckReports,
    UserUpdated: UserUpdated,
};

/**
 * Map of commands and their corresponding events.
 */
export type CommandsMap = {
    // General commands
    GetSession: [GetSession, EventsMap['Session']],
    SetPermissionOverwrites: [SetPermissionOverwrites, EventsMap['PermissionOverwritesUpdated']],
    GetPermissionOverwrites: [GetPermissionOverwrites, EventsMap['PermissionOverwrites']],
    GetComputedPermissions: [GetComputedPermissions, EventsMap['Permissions']],
    GetPermissionOverwriteTargets: [GetPermissionOverwriteTargets, EventsMap['PermissionOverwriteTargets']],
    // Space commands
    JoinSpace: [JoinSpace, EventsMap['SpaceJoined']],
    LeaveSpace: [LeaveSpace, EventsMap['SpaceLeft']],
    CreateSpace: [CreateSpace, EventsMap['SpaceJoined']],
    UpdateSpace: [UpdateSpace, EventsMap['SpaceUpdated']],
    DeleteSpace: [DeleteSpace, EventsMap['SpaceDeleted']],
    GetSpaceMembers: [GetSpaceMembers, EventsMap['SpaceMembers']],
    GetSpaceRooms: [GetSpaceRooms, EventsMap['SpaceRooms']],
    CreateRole: [CreateRole, EventsMap['NewRole']],
    DeleteRole: [DeleteRole, EventsMap['RoleDeleted']],
    UpdateRole: [UpdateRole, EventsMap['RoleUpdated']],
    AssignRole: [AssignRole, EventsMap['SpaceMemberUpdated'] | EventsMap['RoomMemberUpdated']],
    DeassignRole: [DeassignRole, EventsMap['SpaceMemberUpdated'] | EventsMap['RoomMemberUpdated']],
    // Room commands
    JoinRoom: [JoinRoom, EventsMap['RoomJoined']],
    LeaveRoom: [LeaveRoom, EventsMap['RoomLeft']],
    CreateRoom: [CreateRoom, EventsMap['NewRoom']],
    DeleteRoom: [DeleteRoom, EventsMap['RoomDeleted']],
    UpdateRoom: [UpdateRoom, EventsMap['RoomUpdated']],
    GetRoomMembers: [GetRoomMembers, EventsMap['RoomMembers']],
    // Topic commands
    CreateTopic: [CreateTopic, EventsMap['NewTopic']],
    DeleteTopic: [DeleteTopic, EventsMap['TopicDeleted']],
    CreateMessage: [CreateMessage, EventsMap['NewMessage']],
    Ack: [Ack, EventsMap['AckReports']],
    GetAckReports: [GetAckReports, EventsMap['AckReports']],
}