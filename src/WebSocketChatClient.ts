import {ObservableInterface} from "./EventTarget";
import {AbstractChatClient, CommandResult, CommandsMap} from "./AbstractChatClient";
import {Envelope} from "pserv-ts-types";
import {ChatStateTracker} from "./state-tracker/ChatStateTracker";

export interface WebSocketClientOptions {
    url: string;
    token?: string;
    temporaryNick?: string;
    connectingTimeoutMs?: number;
    awaitQueueSendDelayMs?: number;
    stateTracking?: boolean;
}

enum WebSocketChatClientEvent {
    connect = 'connect',
    disconnect = 'disconnect',
    message = 'message',
    error = 'error',
}

export class WebSocketChatClient extends AbstractChatClient implements ObservableInterface {
    public readonly Event = WebSocketChatClientEvent;
    public readonly state?: ChatStateTracker;

    protected ws: WebSocket|null = null;
    protected sendQueue: [commandType: keyof CommandsMap, commandData: any][] = [];
    protected connectingTimeoutId: any;
    protected authenticated: boolean;
    protected authenticatedResolvers: [() => void, (error: Error) => void];

    public constructor(private readonly options: WebSocketClientOptions) {
        super();
        if (!this.options.token && !this.options.temporaryNick) {
            throw new Error('Token or temporary nick is required');
        }
        if (this.options.stateTracking ?? true) {
            this.state = new ChatStateTracker(this);
        }
    }

    public async connect(): Promise<void> {
        const authString = this.options.token ? `token=${this.options.token}` : `nick=${this.options.temporaryNick}`;
        this.ws = new WebSocket(`${this.options.url}?${authString}`);
        this.ws.onclose = ev => this.onClose(ev);
        this.ws.onmessage = ev => this.onMessage(ev);
        this.connectingTimeoutId = setTimeout(
            () => this.triggerConnectionTimeout(),
            this.options.connectingTimeoutMs ?? 10000
        );
        this.authenticated = false;
        return new Promise((...args) => this.authenticatedResolvers = args);
    }

    public disconnect(): void {
        this.sendQueue = [];
        this.ws?.close();
        this.ws = null;
    }

    public async send<CommandType extends keyof CommandsMap>(commandType: CommandType, commandData: CommandsMap[CommandType][0]):
       Promise<CommandResult<CommandsMap[CommandType][1]>> {
        if (!this.ws || [this.ws.CLOSED, this.ws.CLOSING].includes(this.ws.readyState)) {
            throw new Error('Cannot send; close or closing connection state');
        }

        if (this.ws.readyState === this.ws.CONNECTING || !this.authenticated) {
            this.sendQueue.push([commandType, commandData] as any);
            return;
        }

        if (this.ws.readyState !== this.ws.OPEN) {
            throw new Error(`Invalid websocket state=${this.ws.readyState}`);
        }

        const envelope = this.createEnvelope<CommandsMap[CommandType][0]>(commandType, commandData);
        this.ws.send(JSON.stringify(envelope));
        return this.createPromiseFromCommandEnvelope<CommandType>(envelope);
    }

    private onMessage(event: MessageEvent): void {
        const envelope: Envelope = JSON.parse(event.data);
        this.handleIncomingEnvelope(envelope);
        this.emit(envelope.type, envelope.data);
        this.emit(this.Event.message, envelope);

        // Login successfully
        if (!this.authenticated) {
            const isAuthenticated = envelope.type !== 'Error';
            this.authenticated = isAuthenticated;
            if (isAuthenticated) {
                this.authenticatedResolvers[0]();
                this.emit(this.Event.connect);
                this.sendFromQueue();
            } else {
                this.authenticatedResolvers[1](envelope.data);
            }
        }
    }

    private onClose(event: CloseEvent): void {
        clearTimeout(this.connectingTimeoutId);
        const reconnect = event.code !== 1000; // Connection was closed because of error
        if (reconnect) {
            this.connect();
        }
        this.emit(this.Event.disconnect, reconnect);
    }

    private sendFromQueue(): void {
        // Send awaiting data to server
        let lastDelay = 0;
        for (const dataIndex in this.sendQueue) {
            const data = this.sendQueue[dataIndex];
            setTimeout(() => this.send(...data), lastDelay);
            lastDelay += this.options.awaitQueueSendDelayMs ?? 500;
        }
        this.sendQueue = [];
        clearTimeout(this.connectingTimeoutId);
    }

    private triggerConnectionTimeout(): void {
        this.disconnect();
        this.emit(this.Event.error, new Error('Connection timeout'));
    }
}