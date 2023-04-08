import {AbstractChatClient, CommandResult, CommandsMap} from "./AbstractChatClient";
import {ObservableInterface} from "./EventTarget";
import {Envelope} from "pserv-ts-types";

export interface WebApiChatClientOptions {
    url: string;
    token?: string;
    temporaryNick?: string;
    attemptsToSend?: number;
    attemptDelayMs?: number;
}

enum WebApiChatClientEvent {
    message = 'message',
    error = 'error',
    destroy = 'destroy',
}

export class WebApiChatClient extends AbstractChatClient implements ObservableInterface {
    public readonly Event = WebApiChatClientEvent;

    protected sendStack: {data: any, attempts: number, lastTimeoutId: any}[];

    public constructor(private readonly options: WebApiChatClientOptions) {
        super();
        if (!this.options.token && !this.options.temporaryNick) {
            throw new Error('Token or temporary nick is required');
        }
    }

    public async send<CommandType extends keyof CommandsMap>(commandType: CommandType, commandData: CommandsMap[CommandType][0]):
        Promise<CommandResult<CommandsMap[CommandType][1]>> {
        const envelope = this.createEnvelope(commandType, commandData);
        this.sendStack.push({data: envelope, attempts: 0, lastTimeoutId: null});
        this.makeApiCall(this.sendStack.length - 1);
        return this.createPromiseFromCommandEnvelope(envelope);
    }

    public destroy(): void {
        // Cancel all awaiting requests
        this.sendStack.forEach(item => {
            if (item.lastTimeoutId) {
                clearTimeout(item.lastTimeoutId);
            }
            this.awaitingResponse.delete(item.data.ref);
        });
        this.sendStack = [];
        this.emit(this.Event.destroy, false);
    }

    protected async onMessage(reqId: number, response: Response): Promise<void> {
        this.sendStack.splice(reqId, 1);
        const envelope: Envelope = await response.json();
        this.handleIncomingEnvelope(envelope);
        this.emit(envelope.type, envelope.data);
        this.emit(this.Event.message, envelope);
    }

    protected onError(reqId: number, body: string): void {
        if (this.sendStack[reqId].attempts >= (this.options.attemptsToSend ?? 10)) {
            this.sendStack.splice(reqId, 1);
            this.handleEnvelopeSendError(this.sendStack[reqId].data, new Error(
                `Cannot send ${body}; aborting after reaching the maximum connection errors`
            ));
            return;
        }
        this.sendStack[reqId].lastTimeoutId = setTimeout(
            () => this.makeApiCall(reqId),
            this.options.attemptDelayMs ?? 3000
        );
    }

    protected makeApiCall(reqId: number): void {
        this.sendStack[reqId].attempts++;
        const bodyJson = JSON.stringify(this.sendStack[reqId].data);
        const headers: any = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        if (this.options.token) {
            headers.Authorization = `Bearer ${this.options.token}`;
        } else if (this.options.temporaryNick) {
            headers.Authorization = `Temp ${this.options.temporaryNick}`;
        }

        fetch(this.options.url, {
            headers,
            body: bodyJson,
            method: 'POST',
        })
            .then(response => this.onMessage(reqId, response))
            .catch(() => this.onError(reqId, bodyJson));
    }
}