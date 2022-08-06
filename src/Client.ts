import {ConnectionEvent, ConnectionInterface} from "./connections/ConnectionInterface";
import {EventTarget} from "./ObservableInterface";
import {Envelope} from "./dtos/protocol/Envelope";
import {JoinRoom} from "./dtos/protocol/commands/JoinRoom";
import {Dto} from "./dtos/Dto";
import {RoomJoined} from "./dtos/protocol/events/RoomJoined";
import {LeaveRoom} from "./dtos/protocol/commands/LeaveRoom";
import {RoomLeft} from "./dtos/protocol/events/RoomLeft";
import {CreateRoom} from "./dtos/protocol/commands/CreateRoom";
import {Error} from "./dtos/protocol/events/Error";
import {SpaceRooms} from "./dtos/protocol/events/SpaceRooms";
import {DeleteRoom} from "./dtos/protocol/commands/DeleteRoom";
import {RoomDeleted} from "./dtos/protocol/events/RoomDeleted";
import {GetRoomMembers} from "./dtos/protocol/commands/GetRoomMembers";
import {RoomMembers} from "./dtos/protocol/events/RoomMembers";
import {JoinSpace} from "./dtos/protocol/commands/JoinSpace";
import {SpaceJoined} from "./dtos/protocol/events/SpaceJoined";
import {LeaveSpace} from "./dtos/protocol/commands/LeaveSpace";
import {SpaceLeft} from "./dtos/protocol/events/SpaceLeft";
import {CreateSpace} from "./dtos/protocol/commands/CreateSpace";
import {DeleteSpace} from "./dtos/protocol/commands/DeleteSpace";
import {SpaceDeleted} from "./dtos/protocol/events/SpaceDeleted";
import {GetSpaceMembers} from "./dtos/protocol/commands/GetSpaceMembers";
import {SpaceMembers} from "./dtos/protocol/events/SpaceMembers";
import {GetSpaceRooms} from "./dtos/protocol/commands/GetSpaceRooms";
import {GetSession} from "./dtos/protocol/commands/GetSession";
import {Session} from "./dtos/protocol/events/Session";
import {AssignRole} from "./dtos/protocol/commands/AssignRole";
import {SpaceMemberUpdate} from "./dtos/protocol/events/SpaceMemberUpdate";
import {DeassignRole} from "./dtos/protocol/commands/DeassignRole";
import {CreateRole} from "./dtos/protocol/commands/CreateRole";
import {NewRole} from "./dtos/protocol/events/NewRole";
import {DeleteRole} from "./dtos/protocol/commands/DeleteRole";
import {RoleDeleted} from "./dtos/protocol/events/RoleDeleted";
import {SetRolePermissions} from "./dtos/protocol/commands/SetRolePermissions";
import {Permissions} from "./dtos/protocol/events/Permissions";
import {SetUserPermissions} from "./dtos/protocol/commands/SetUserPermissions";
import {CreateTopic} from "./dtos/protocol/commands/CreateTopic";
import {NewTopic} from "./dtos/protocol/events/NewTopic";
import {DeleteTopic} from "./dtos/protocol/commands/DeleteTopic";
import {TopicDeleted} from "./dtos/protocol/events/TopicDeleted";
import {CreateMessage} from "./dtos/protocol/commands/CreateMessage";
import {NewMessage} from "./dtos/protocol/events/NewMessage";
import {GetComputedPermissions} from "./dtos/protocol/commands/GetComputedPermissions";
import {GetRolePermissions} from "./dtos/protocol/commands/GetRolePermissions";
import {GetUserPermissions} from "./dtos/protocol/commands/GetUserPermissions";
import {commands, events} from "./protocol";

type ArrayOfPromiseResolvers = [(value: any) => void, (reason?: any) => void];
type CmdResult<EventDto> = EventDto | Error;
type CommandsToEventsType<CommandT> =
    // General commands
    CommandT extends GetSession ? CmdResult<Session> :
    CommandT extends SetUserPermissions ? CmdResult<Permissions> :
    CommandT extends GetUserPermissions ? CmdResult<Permissions> :
    CommandT extends GetComputedPermissions ? CmdResult<Permissions> :
    // Space commands
    CommandT extends JoinSpace ? CmdResult<SpaceJoined> :
    CommandT extends LeaveSpace ? CmdResult<SpaceLeft> :
    CommandT extends CreateSpace ? CmdResult<SpaceJoined> :
    CommandT extends DeleteSpace ? CmdResult<SpaceDeleted> :
    CommandT extends GetSpaceMembers ? CmdResult<SpaceMembers> :
    CommandT extends GetSpaceRooms ? CmdResult<SpaceRooms> :
    CommandT extends CreateRole ? CmdResult<NewRole> :
    CommandT extends DeleteRole ? CmdResult<RoleDeleted> :
    CommandT extends AssignRole ? CmdResult<SpaceMemberUpdate> :
    CommandT extends DeassignRole ? CmdResult<SpaceMemberUpdate> :
    CommandT extends SetRolePermissions ? CmdResult<Permissions> :
    CommandT extends GetRolePermissions ? CmdResult<Permissions> :
    // Room commands
    CommandT extends JoinRoom ? CmdResult<RoomJoined> :
    CommandT extends LeaveRoom ? CmdResult<RoomLeft> :
    CommandT extends CreateRoom ? CmdResult<RoomJoined> :
    CommandT extends DeleteRoom ? CmdResult<RoomDeleted> :
    CommandT extends GetRoomMembers ? CmdResult<RoomMembers> :
    // Topic commands
    CommandT extends CreateTopic ? CmdResult<NewTopic> :
    CommandT extends DeleteTopic ? CmdResult<TopicDeleted> :
    CommandT extends CreateMessage ? CmdResult<NewMessage> :
    any;

function guessCommandType(obj: any): string {
    for (const type in commands) {
        if (obj instanceof commands[type]) {
            return type;
        }
    }
    return Object.getPrototypeOf(obj).constructor.name;
}

export class Client extends EventTarget {
    protected commandsCount = 0;
    protected awaitingResponse: Map<string, ArrayOfPromiseResolvers> = new Map<string, ArrayOfPromiseResolvers>();
    protected eventsMap: {[x: string]: typeof Dto};

    public constructor(private connection: ConnectionInterface) {
        super();
        this.setCustomEventMap({}); // Set default event map.
        this.connection.on(ConnectionEvent.message, payload => this.onMessage(payload));
        this.connection.on(ConnectionEvent.disconnect, () => this.onDisconnect());
    }

    /**
     * Send command to server.
     * @param commandPayload Command payload object.
     * @param commandType Command type; if not specified, it will be guessed from the command payload class name.
     * @return Promise which resolves to the event returned by server (including `Error`)
     * in response to command and rejects with connection error.
     */
    public async exec<CommandT extends Dto = any>(
        commandPayload: CommandT,
        commandType?: string
    ): Promise<CommandsToEventsType<CommandT>> {
        const message = this.createEnvelope(commandType ?? guessCommandType(commandPayload), commandPayload);
        this.connection.send(message.toJson());
        return new Promise(
            (...args) => this.awaitingResponse.set(message.meta.ref as string, args)
        );
    }

    /**
     * Set custom DTO classes for events.
     */
    public setCustomEventMap(customMap: {[x: string]: typeof Dto}): this {
        this.eventsMap = {...events, ...customMap};
        return this;
    }

    private onMessage(payload: string) {
        const message: Envelope = JSON.parse(payload);
        const dto = this.createEventByEnvelope(message);

        const [resolve] = this.awaitingResponse.get(message.meta.ref ?? '') ?? [];
        if (resolve) {
            resolve(dto ?? message.data);
            this.awaitingResponse.delete(message.meta.ref as string);
        }

        this.emit('message', message);
        this.emit(message.meta.type ?? 'unknown', message, dto);
    }

    private onDisconnect(): void {
        this.awaitingResponse.forEach(([resolve, reject], key: string) => {
            reject('Disconnected');
            this.awaitingResponse.delete(key);
        });
    }

    private createEnvelope(commandType: string, dto: Dto): Envelope {
        return new Envelope({
            meta: {
                type: commandType,
                ref: (++this.commandsCount).toString()
            },
            data: dto
        });
    }

    private createEventByEnvelope(message: Envelope): Dto | null {
        if ((message.meta.type ?? false) && this.eventsMap.hasOwnProperty(message.meta.type)) {
            return new (this.eventsMap[message.meta.type] as any)(message.data);
        }
        return null;
    }
}