import {Bye} from "./dtos/protocol/events/Bye";
import {Ok} from "./dtos/protocol/events/Ok";
import {Error} from "./dtos/protocol/events/Error";
import {Session} from "./dtos/protocol/events/Session";
import {Permissions} from "./dtos/protocol/events/Permissions";
import {SpaceJoined} from "./dtos/protocol/events/SpaceJoined";
import {SpaceLeft} from "./dtos/protocol/events/SpaceLeft";
import {SpaceMemberJoined} from "./dtos/protocol/events/SpaceMemberJoined";
import {SpaceMemberLeft} from "./dtos/protocol/events/SpaceMemberLeft";
import {SpaceMemberUpdate} from "./dtos/protocol/events/SpaceMemberUpdate";
import {SpaceDeleted} from "./dtos/protocol/events/SpaceDeleted";
import {SpaceMembers} from "./dtos/protocol/events/SpaceMembers";
import {SpaceRooms} from "./dtos/protocol/events/SpaceRooms";
import {NewRole} from "./dtos/protocol/events/NewRole";
import {RoleDeleted} from "./dtos/protocol/events/RoleDeleted";
import {RoomJoined} from "./dtos/protocol/events/RoomJoined";
import {RoomLeft} from "./dtos/protocol/events/RoomLeft";
import {RoomMemberJoined} from "./dtos/protocol/events/RoomMemberJoined";
import {RoomMemberLeft} from "./dtos/protocol/events/RoomMemberLeft";
import {RoomMembers} from "./dtos/protocol/events/RoomMembers";
import {NewRoom} from "./dtos/protocol/events/NewRoom";
import {RoomDeleted} from "./dtos/protocol/events/RoomDeleted";
import {NewTopic} from "./dtos/protocol/events/NewTopic";
import {TopicDeleted} from "./dtos/protocol/events/TopicDeleted";
import {NewMessage} from "./dtos/protocol/events/NewMessage";
import {GetSession} from "./dtos/protocol/commands/GetSession";
import {SetUserPermissions} from "./dtos/protocol/commands/SetUserPermissions";
import {GetUserPermissions} from "./dtos/protocol/commands/GetUserPermissions";
import {GetComputedPermissions} from "./dtos/protocol/commands/GetComputedPermissions";
import {JoinSpace} from "./dtos/protocol/commands/JoinSpace";
import {LeaveSpace} from "./dtos/protocol/commands/LeaveSpace";
import {CreateSpace} from "./dtos/protocol/commands/CreateSpace";
import {DeleteSpace} from "./dtos/protocol/commands/DeleteSpace";
import {GetSpaceMembers} from "./dtos/protocol/commands/GetSpaceMembers";
import {GetSpaceRooms} from "./dtos/protocol/commands/GetSpaceRooms";
import {CreateRole} from "./dtos/protocol/commands/CreateRole";
import {DeleteRole} from "./dtos/protocol/commands/DeleteRole";
import {AssignRole} from "./dtos/protocol/commands/AssignRole";
import {DeassignRole} from "./dtos/protocol/commands/DeassignRole";
import {SetRolePermissions} from "./dtos/protocol/commands/SetRolePermissions";
import {GetRolePermissions} from "./dtos/protocol/commands/GetRolePermissions";
import {JoinRoom} from "./dtos/protocol/commands/JoinRoom";
import {LeaveRoom} from "./dtos/protocol/commands/LeaveRoom";
import {CreateRoom} from "./dtos/protocol/commands/CreateRoom";
import {DeleteRoom} from "./dtos/protocol/commands/DeleteRoom";
import {GetRoomMembers} from "./dtos/protocol/commands/GetRoomMembers";
import {CreateTopic} from "./dtos/protocol/commands/CreateTopic";
import {DeleteTopic} from "./dtos/protocol/commands/DeleteTopic";
import {CreateMessage} from "./dtos/protocol/commands/CreateMessage";
import {Dto} from "./dtos/Dto";

export const events = {
    // General events
    Bye,
    Ok,
    Error,
    Session,
    Permissions,
    // Space events
    SpaceJoined,
    SpaceLeft,
    SpaceMemberJoined,
    SpaceMemberLeft,
    SpaceMemberUpdate,
    SpaceDeleted,
    SpaceMembers,
    SpaceRooms,
    NewRole,
    RoleDeleted,
    // Room events
    RoomJoined,
    RoomLeft,
    RoomMemberJoined,
    RoomMemberLeft,
    RoomMembers,
    NewRoom,
    RoomDeleted,
    // Topic events
    NewTopic,
    TopicDeleted,
    NewMessage,
} as {[x: string]: typeof Dto};

export const commands = {
    // General commands
    GetSession,
    SetUserPermissions,
    GetUserPermissions,
    GetComputedPermissions,
    // Space commands
    JoinSpace,
    LeaveSpace,
    CreateSpace,
    DeleteSpace,
    GetSpaceMembers,
    GetSpaceRooms,
    CreateRole,
    DeleteRole,
    AssignRole,
    DeassignRole,
    SetRolePermissions,
    GetRolePermissions,
    // Room commands
    JoinRoom,
    LeaveRoom,
    CreateRoom,
    DeleteRoom,
    GetRoomMembers,
    // Topic commands
    CreateTopic,
    DeleteTopic,
    CreateMessage,
} as {[x: string]: typeof Dto}