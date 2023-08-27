import {WebSocketChatClient} from "../WebSocketChatClient";
import {Session, User} from "pserv-ts-types";
import {RoomsManager} from "./RoomsManager";
import {SpacesManager} from "./SpacesManager";
import {PermissionsManager} from "./PermissionsManager";
import {DeferredTask} from "./DeferredTask";

export class ChatStateTracker {
    /**
     * State of the rooms you are in.
     */
    public readonly rooms: RoomsManager = new RoomsManager(this);
    /**
     * State of the spaces you are in.
     */
    public readonly spaces = new SpacesManager(this);
    /**
     * State of your permissions.
     */
    public readonly permissions = new PermissionsManager(this);

    private me: User = null;
    private readonly deferredSession = new DeferredTask();

    public constructor(public readonly client: WebSocketChatClient) {
        this.client.on('Session', ev => this.handleSession(ev));
    }

    public async getMe(): Promise<User> {
        await this.deferredSession.promise;
        return this.me;
    }

    private handleSession(ev: Session): void {
        this.me = ev.user;
        this.deferredSession.resolve();
    }
}