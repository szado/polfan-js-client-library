import {ConnectionInterface} from "./ConnectionInterface";
import {uuidv4 as uuid} from "uuid";
import {MessageInterface, MessageType} from "./MessageInterface";
import {EventHandler, ObservableInterface} from "./ObservableInterface";

type ArrayOfPromiseResolvers = [(value: any) => void, (reason?: any) => void];

export class Client implements ObservableInterface {
    private events: Map<string, EventHandler[]> = new Map<string, EventHandler[]>();
    private awaitingResponse: Map<string, ArrayOfPromiseResolvers> = new Map<string, ArrayOfPromiseResolvers>();

    public constructor(
        private connection: ConnectionInterface
    ) {
        this.connection.on('message', this.onMessage);
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

    /**
     * Bind your listener function to given type of event which comes from server.
     */
    public on(eventName: string, handler: EventHandler): Client {
        const handlers = this.events.get(eventName) ?? [];
        handlers.push(handler);
        this.events.set(eventName, handlers);
        return this;
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

    private onMessage(message: MessageInterface) {
        const [resolve, reject] = this.awaitingResponse.get(message.meta.ref) ?? [];
        if (resolve && reject) {
            if (message.meta.type === MessageType.Error) {
                reject(message.data)
            } else {
                resolve(message.data);
            }
            this.awaitingResponse.delete(message.meta.ref);
        }
        this.events.get(message.meta.type)?.forEach(callback => callback(message));
    }
}