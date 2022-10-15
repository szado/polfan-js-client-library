import { ConnectionInterface } from "./connections/ConnectionInterface";
import { EventTarget } from "./ObservableInterface";
import { JoinRoom } from "./dtos/protocol/commands/JoinRoom";
import { Dto } from "./dtos/Dto";
import { RoomJoined } from "./dtos/protocol/events/RoomJoined";
import { LeaveRoom } from "./dtos/protocol/commands/LeaveRoom";
import { RoomLeft } from "./dtos/protocol/events/RoomLeft";
import { CreateRoom } from "./dtos/protocol/commands/CreateRoom";
import { Error } from "./dtos/protocol/events/Error";
import { SpaceRooms } from "./dtos/protocol/events/SpaceRooms";
import { DeleteRoom } from "./dtos/protocol/commands/DeleteRoom";
import { RoomDeleted } from "./dtos/protocol/events/RoomDeleted";
import { GetRoomMembers } from "./dtos/protocol/commands/GetRoomMembers";
import { RoomMembers } from "./dtos/protocol/events/RoomMembers";
import { JoinSpace } from "./dtos/protocol/commands/JoinSpace";
import { SpaceJoined } from "./dtos/protocol/events/SpaceJoined";
import { LeaveSpace } from "./dtos/protocol/commands/LeaveSpace";
import { SpaceLeft } from "./dtos/protocol/events/SpaceLeft";
import { CreateSpace } from "./dtos/protocol/commands/CreateSpace";
import { DeleteSpace } from "./dtos/protocol/commands/DeleteSpace";
import { SpaceDeleted } from "./dtos/protocol/events/SpaceDeleted";
import { GetSpaceMembers } from "./dtos/protocol/commands/GetSpaceMembers";
import { SpaceMembers } from "./dtos/protocol/events/SpaceMembers";
import { GetSpaceRooms } from "./dtos/protocol/commands/GetSpaceRooms";
import { GetSession } from "./dtos/protocol/commands/GetSession";
import { Session } from "./dtos/protocol/events/Session";
import { AssignRole } from "./dtos/protocol/commands/AssignRole";
import { SpaceMemberUpdate } from "./dtos/protocol/events/SpaceMemberUpdate";
import { DeassignRole } from "./dtos/protocol/commands/DeassignRole";
import { CreateRole } from "./dtos/protocol/commands/CreateRole";
import { NewRole } from "./dtos/protocol/events/NewRole";
import { DeleteRole } from "./dtos/protocol/commands/DeleteRole";
import { RoleDeleted } from "./dtos/protocol/events/RoleDeleted";
import { SetRolePermissions } from "./dtos/protocol/commands/SetRolePermissions";
import { Permissions } from "./dtos/protocol/events/Permissions";
import { SetUserPermissions } from "./dtos/protocol/commands/SetUserPermissions";
import { CreateTopic } from "./dtos/protocol/commands/CreateTopic";
import { NewTopic } from "./dtos/protocol/events/NewTopic";
import { DeleteTopic } from "./dtos/protocol/commands/DeleteTopic";
import { TopicDeleted } from "./dtos/protocol/events/TopicDeleted";
import { CreateMessage } from "./dtos/protocol/commands/CreateMessage";
import { NewMessage } from "./dtos/protocol/events/NewMessage";
import { GetComputedPermissions } from "./dtos/protocol/commands/GetComputedPermissions";
import { GetRolePermissions } from "./dtos/protocol/commands/GetRolePermissions";
import { GetUserPermissions } from "./dtos/protocol/commands/GetUserPermissions";
declare type ArrayOfPromiseResolvers = [(value: any) => void, (reason?: any) => void];
declare type CmdResult<EventDto> = EventDto | Error;
declare type CommandsToEventsType<CommandT> = CommandT extends GetSession ? CmdResult<Session> : CommandT extends SetUserPermissions ? CmdResult<Permissions> : CommandT extends GetUserPermissions ? CmdResult<Permissions> : CommandT extends GetComputedPermissions ? CmdResult<Permissions> : CommandT extends JoinSpace ? CmdResult<SpaceJoined> : CommandT extends LeaveSpace ? CmdResult<SpaceLeft> : CommandT extends CreateSpace ? CmdResult<SpaceJoined> : CommandT extends DeleteSpace ? CmdResult<SpaceDeleted> : CommandT extends GetSpaceMembers ? CmdResult<SpaceMembers> : CommandT extends GetSpaceRooms ? CmdResult<SpaceRooms> : CommandT extends CreateRole ? CmdResult<NewRole> : CommandT extends DeleteRole ? CmdResult<RoleDeleted> : CommandT extends AssignRole ? CmdResult<SpaceMemberUpdate> : CommandT extends DeassignRole ? CmdResult<SpaceMemberUpdate> : CommandT extends SetRolePermissions ? CmdResult<Permissions> : CommandT extends GetRolePermissions ? CmdResult<Permissions> : CommandT extends JoinRoom ? CmdResult<RoomJoined> : CommandT extends LeaveRoom ? CmdResult<RoomLeft> : CommandT extends CreateRoom ? CmdResult<RoomJoined> : CommandT extends DeleteRoom ? CmdResult<RoomDeleted> : CommandT extends GetRoomMembers ? CmdResult<RoomMembers> : CommandT extends CreateTopic ? CmdResult<NewTopic> : CommandT extends DeleteTopic ? CmdResult<TopicDeleted> : CommandT extends CreateMessage ? CmdResult<NewMessage> : any;
export declare class Client extends EventTarget {
    private connection;
    protected commandsCount: number;
    protected awaitingResponse: Map<string, ArrayOfPromiseResolvers>;
    protected eventsMap: {
        [x: string]: typeof Dto;
    };
    constructor(connection: ConnectionInterface);
    /**
     * Send command to server.
     * @param commandPayload Command payload object.
     * @param commandType Command type; if not specified, it will be guessed from the command payload class name.
     * @return Promise which resolves to the event returned by server (including `Error`)
     * in response to command and rejects with connection error.
     */
    exec<CommandT extends Dto = any>(commandPayload: CommandT, commandType?: string): Promise<CommandsToEventsType<CommandT>>;
    /**
     * Set custom DTO classes for events.
     */
    setCustomEventMap(customMap: {
        [x: string]: typeof Dto;
    }): this;
    private onMessage;
    private onDisconnect;
    private createEnvelope;
    private createEventByEnvelope;
}
export {};
