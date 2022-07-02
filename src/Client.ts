import {ConnectionInterface} from "./ConnectionInterface";
import {MessageInterface, MessageType} from "./MessageInterface";
import {EventTarget} from "./ObservableInterface";
import {v4 as uuid} from "uuid";

type ArrayOfPromiseResolvers = [(value: any) => void, (reason?: any) => void];

export class Client extends EventTarget {
    private awaitingResponse: Map<string, ArrayOfPromiseResolvers> = new Map<string, ArrayOfPromiseResolvers>();

    public constructor(
        private connection: ConnectionInterface
    ) {
        super();
        this.connection.on('message', payload => this.onMessage(payload));
    }

    /**
     * Send command to server with given data.
     * Returns Promise which resolves to the event data returned by server in response to command.
     * Rejects with data from the Error event or with connection error.
     */
    public async call<ResponseT = any>(command: string, data: any): Promise<ResponseT> {
        const message = this.getMessage(command, data);
        this.connection.send(message);
        return new Promise<ResponseT>(
            (...args) => this.awaitingResponse.set(message.meta.ref, args)
        );
    }

    private getMessage(command: string, data: any): MessageInterface
    {
        return {
            meta: {
                type: command,
                ref: uuid()
            },
            data: data
        };
    }

    private onMessage(payload: string) {
        const message: MessageInterface = JSON.parse(payload);

        // Resolve promise if exists
        const [resolve, reject] = this.awaitingResponse.get(message.meta.ref) ?? [];
        if (resolve && reject) {
            if (message.meta.type === MessageType.Error) {
                reject(message.data)
            } else {
                resolve(message.data);
            }
            this.awaitingResponse.delete(message.meta.ref);
        }

        // Emit event
        this.emit(message.meta.type, message);
    }
}