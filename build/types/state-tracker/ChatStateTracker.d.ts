import { WebSocketChatClient } from "../WebSocketChatClient";
import { User } from "../types/src";
import { RoomsManager } from "./RoomsManager";
import { SpacesManager } from "./SpacesManager";
import { PermissionsManager } from "./PermissionsManager";
export declare class ChatStateTracker {
    readonly client: WebSocketChatClient;
    /**
     * State of your permissions.
     */
    readonly permissions: PermissionsManager;
    /**
     * State of the rooms you are in.
     */
    readonly rooms: RoomsManager;
    /**
     * State of the spaces you are in.
     */
    readonly spaces: SpacesManager;
    private _me;
    private readonly deferredSession;
    constructor(client: WebSocketChatClient);
    get me(): User | null;
    getMe(): Promise<User>;
    private handleSession;
}
