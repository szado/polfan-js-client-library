import {EventTarget} from "../ObservableInterface";
import {ConnectionEvent, ConnectionInterface, ConnectionState} from "./ConnectionInterface";

interface WebSocketConnectionConfig {
    url: string;
    token: string;
}

export class WebSocketConnection extends EventTarget implements ConnectionInterface {
    public state: ConnectionState = ConnectionState.disconnected;

    private ws: WebSocket|null = null;

    public constructor(private config: WebSocketConnectionConfig) {
        super();
    }

    public connect(): void {
        this.ws = new WebSocket(`${this.config.url}?token=${this.config.token}`);
        this.ws.onopen = () => this.onOpen();
        this.ws.onclose = () => this.onClose();
        this.ws.onerror = () => this.onClose();
        this.ws.onmessage = ev => this.onMessage(ev);
    }

    public disconnect(): void {
        this.ws?.close();
    }

    public send(data: string): void {
        this.ws?.send(data);
    }

    private onMessage(event: MessageEvent): void {
        this.emit(ConnectionEvent.message, event.data);
    }

    private onClose(): void {
        this.state = ConnectionState.disconnected;
        this.emit(ConnectionEvent.disconnect);
    }

    private onOpen(): void {
        this.state = ConnectionState.ready;
        this.emit(ConnectionEvent.connect);
    }
}