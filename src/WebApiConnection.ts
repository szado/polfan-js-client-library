import {ConnectionEvent, ConnectionInterface, ConnectionState} from "./ConnectionInterface";
import {EventTarget} from "./ObservableInterface";

export interface WebApiConnectionConfig {
    token: string;
    url: string;
}

export class WebApiConnection extends EventTarget implements ConnectionInterface {
    public state: ConnectionState = ConnectionState.ready;

    public constructor(
        private readonly config: WebApiConnectionConfig
    ) {
        super();
    }

    public connect(): void {
        this.emit(ConnectionEvent.connect);
    }

    public disconnect(): void {
        this.emit(ConnectionEvent.disconnect);
    }

    public send(data: object): void {
        fetch(this.config.url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.config.token}`,
                ContentType: 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response: Response) => response.text())
            .then(this.onMessage);
    }

    private onMessage(message: string): void {
        this.emit(ConnectionEvent.message, message);
    }
}