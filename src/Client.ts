import {ChatConnectionEvent, ChatConnectionInterface} from "./connections/ConnectionAssets";
import {EventTarget} from "./ObservableInterface";
import {Envelope} from "./dtos/protocol/Envelope";
import {JoinRoom} from "./dtos/protocol/commands/JoinRoom";
import {Dto} from "./dtos/Dto";
import {RoomJoined} from "./dtos/protocol/events/RoomJoined";
import {LeaveRoom} from "./dtos/protocol/commands/LeaveRoom";
import {RoomLeft} from "./dtos/protocol/events/RoomLeft";
import {CreateRoom} from "./dtos/protocol/commands/CreateRoom";
import {Error as ErrorEvent} from "./dtos/protocol/events/Error";
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
import {WebSocketConnection} from "./connections/WebSocketConnection";
import {RestApiConnection} from "./connections/RestApiConnection";

type ArrayOfPromiseResolvers = [(value: any) => void, (reason?: any) => void];
type CmdResult<EventDto> = EventDto | ErrorEvent;
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

export enum ClientEvent {
    message = 'message',
    renewal = 'renewalStart',
    renewalSuccess = 'renewalSuccess',
    renewalError = 'renewalError',
}

export interface TokenInterface {
    token: string,
    expiration: string
}

export interface MyAccountInterface {
    id: number;
    nick: string;
    avatar: string;
}

export class Client extends EventTarget {
    public static readonly defaultClientName = 'polfan-server-js-client';
    public static readonly defaultWebSocketUrl = 'ws://pserv.shado.p5.tiktalik.io:1600/ws';
    public static readonly defaultWebApiUrl = 'http://pserv.shado.p5.tiktalik.io:1600/api';
    public static readonly defaultRestApiUrl = 'https://polfan.pl/webservice/api';
    public static readonly defaultAvatarUrlPrefix = 'https://polfan.pl/modules/users/avatars/';

    public static async getToken(
        login: string,
        password: string,
        clientName: string = Client.defaultClientName
    ): Promise<TokenInterface> {
        const connection = new RestApiConnection({url: Client.defaultRestApiUrl});
        const response = await connection.send('POST', 'auth/tokens', {
            login, password, client_name: clientName
        });
        if (response.ok) {
            return response.data;
        }
        throw new Error(`Cannot create user token: ${response.data.errors[0]}`);
    }

    public static createByToken(token: string): Client {
        return new Client(
            new WebSocketConnection({token, url: Client.defaultWebSocketUrl}),
            new RestApiConnection({token, url: Client.defaultRestApiUrl}),
        );
    }

    public static createByTemporaryNick(temporaryNick: string): Client {
        return new Client(
            new WebSocketConnection({temporaryNick, url: Client.defaultWebSocketUrl}),
            new RestApiConnection({url: Client.defaultRestApiUrl}),
        );
    }

    protected commandsCount = 0;
    protected awaitingResponse: Map<string, ArrayOfPromiseResolvers> = new Map<string, ArrayOfPromiseResolvers>();
    protected eventsMap: {[x: string]: typeof Dto};

    public constructor(
        public readonly chatConnection: ChatConnectionInterface,
        public readonly restConnection: RestApiConnection,
    ) {
        super();
        this.setCustomEventMap({}); // Set default event map.
        this.chatConnection.on(ChatConnectionEvent.message, (payload: any) => this.onMessage(payload));
        this.chatConnection.on(ChatConnectionEvent.destroy, (reconnect: boolean) => this.onDisconnect(reconnect));
    }

    /**
     * Send command to chat server.
     * @param commandPayload Command payload object.
     * @param commandType Command type; if not specified, it will be guessed from the command payload class name.
     * @return Promise which resolves to the event returned by server (including `Error`)
     * in response to command and rejects with connection error.
     */
    public async sendCommand<CommandT extends Dto = any>(
        commandPayload: CommandT,
        commandType?: string
    ): Promise<CommandsToEventsType<CommandT>> {
        const message = this.createEnvelope(commandType ?? guessCommandType(commandPayload), commandPayload);
        this.chatConnection.send(message.toRaw());
        return new Promise(
            (...args) => this.awaitingResponse.set(message.ref as string, args)
        );
    }

    /**
     * Set custom DTO classes for events.
     */
    public setCustomEventMap(customMap: {[x: string]: typeof Dto}): this {
        this.eventsMap = {...events, ...customMap};
        return this;
    }

    public destroy(): this {
        this.chatConnection.destroy();
        return this;
    }

    public async getMe(): Promise<MyAccountInterface> {
        const response = await this.restConnection.send('GET', 'auth/me');
        if (response.ok) {
            return response.data;
        }
        throw new Error(`Cannot get current user account: ${response.data.errors[0]}`);
    }

    private onMessage(message: any) {
        const dto = this.createEvent(message);

        const [resolve] = this.awaitingResponse.get(message.ref ?? '') ?? [];
        if (resolve) {
            resolve(dto ?? message.data);
            this.awaitingResponse.delete(message.ref as string);
        }

        this.emit(ClientEvent.message, message);
        this.emit(message.type ?? 'unknown', message, dto);
    }

    private onDisconnect(reconnect: boolean): void {
        this.awaitingResponse.forEach(([resolve, reject], key: string) => {
            reject('Disconnected');
            this.awaitingResponse.delete(key);
        });
        if (reconnect) {
            this.emit(ClientEvent.renewal);
            this.chatConnection.once(ChatConnectionEvent.ready, () => this.emit(ClientEvent.renewalSuccess));
            this.chatConnection.once(ChatConnectionEvent.error, () => this.emit(ClientEvent.renewalError));
        }
    }

    private createEnvelope(commandType: string, dto: Dto): Envelope {
        return new Envelope({
            type: commandType,
            ref: (++this.commandsCount).toString(),
            data: dto
        });
    }

    private createEvent(message: Envelope): Dto | null {
        if ((message.type ?? false) && this.eventsMap.hasOwnProperty(message.type)) {
            return new (this.eventsMap[message.type] as any)(message.data);
        }
        return null;
    }
}