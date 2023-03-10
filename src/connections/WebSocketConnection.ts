import {EventTarget} from "../ObservableInterface";
import {
    ChatConnectionEvent,
    ChatConnectionInterface,
    ConnectionOptionsInterface,
} from "./ConnectionAssets";

export interface WebSocketConnectionInterface extends ConnectionOptionsInterface {
    awaitQueueSendDelayMs?: number;
    connectingTimeoutMs?: number;
}

export class WebSocketConnection extends EventTarget implements ChatConnectionInterface {
    protected ws: WebSocket|null = null;
    protected sendQueue: any[] = [];
    protected connectingTimeoutId: any;
    protected authenticated: boolean;

    public constructor(private readonly options: WebSocketConnectionInterface) {
        super();
        if (!this.options.token && !this.options.temporaryNick) {
            throw new Error('Token or temporary nick is required');
        }
    }

    public init() {
        if (this.ws) {
            this.destroy();
        }
        this.connect();
    }

    public send(data: any): void {
        if (!this.ws || this.ws.readyState === this.ws.CLOSED) {
            this.connect();
        }
        if (this.ws.readyState === this.ws.CONNECTING || !this.authenticated) {
            this.sendQueue.push(data);
            return;
        }
        const dataJson = JSON.stringify(data);
        if (this.ws.readyState !== this.ws.OPEN) {
            this.emit(ChatConnectionEvent.error, new Error(`Cannot send ${dataJson}; invalid connection state`));
            return;
        }
        this.ws.send(dataJson);
    }

    public destroy(): void {
        this.sendQueue = [];
        this.ws?.close();
        this.ws = null;
    }

    private connect(): void {
        this.authenticated = false;
        const authString = this.options.token ? `token=${this.options.token}` : `nick=${this.options.temporaryNick}`;
        this.ws = new WebSocket(`${this.options.url}?${authString}`);
        this.ws.onclose = ev => this.onClose(ev);
        this.ws.onmessage = ev => this.onMessage(ev);
        this.connectingTimeoutId = setTimeout(
            () => this.triggerConnectionTimeout(),
            this.options.connectingTimeoutMs ?? 10000
        );
    }

    private onMessage(event: MessageEvent): void {
        const payload = JSON.parse(event.data);
        // Login successfully
        if (!this.authenticated && payload.type && payload.type !== 'Error') {
            this.authenticated = true;
            this.emit(ChatConnectionEvent.ready);
            this.sendFromQueue();
        }
        this.emit(ChatConnectionEvent.message, payload);
    }

    private onClose(event: CloseEvent): void {
        clearTimeout(this.connectingTimeoutId);
        const reconnect = event.code !== 1000; // Connection was closed because of error
        if (reconnect) {
            this.connect();
        }
        this.emit(ChatConnectionEvent.destroy, reconnect);
    }

    private sendFromQueue(): void {
        // Send awaiting data to server
        let lastDelay = 0;
        for (const dataIndex in this.sendQueue) {
            const data = this.sendQueue[dataIndex];
            setTimeout(() => this.send(data), lastDelay);
            lastDelay += this.options.awaitQueueSendDelayMs ?? 500;
        }
        this.sendQueue = [];
        clearTimeout(this.connectingTimeoutId);
    }

    private triggerConnectionTimeout(): void {
        this.destroy();
        this.emit(ChatConnectionEvent.error, new Error('Connection timeout'));
    }
}