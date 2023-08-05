import {WebSocketChatClient} from "../WebSocketChatClient";
import {Session, User} from "pserv-ts-types";
import {DeferredTasksManager} from "./DeferredTasksManager";
import {RoomsManager} from "./RoomsManager";
import {SpacesManager} from "./SpacesManager";

export class ChatStateTracker {
    public readonly deferred = new DeferredTasksManager();
    public readonly rooms: RoomsManager = new RoomsManager(this);
    public readonly spaces = new SpacesManager(this);
    private me: User = null;

    public constructor(public readonly client: WebSocketChatClient) {
        this.deferred.create('session');
        this.client.on('Session', ev => this.handleSession(ev));
    }

    public async getMe(): Promise<User> {
        await this.deferred.task('session');
        return this.me;
    }

    private handleSession(ev: Session): void {
        this.me = ev.user;
        this.deferred.complete('session');
    }
}