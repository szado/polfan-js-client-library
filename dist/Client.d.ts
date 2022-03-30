import { ConnectionInterface } from "./ConnectionInterface";
import { EventTarget } from "./ObservableInterface";
export declare class Client extends EventTarget {
    private connection;
    private awaitingResponse;
    constructor(connection: ConnectionInterface);
    /**
     * Send command to server with given data.
     * Returns Promise which resolves to the event data returned by server in response to command.
     * Rejects with data from the Error event or with connection error.
     */
    call<ResponseT = any>(command: string, data: any): Promise<ResponseT>;
    private getMessage;
    private onMessage;
}
