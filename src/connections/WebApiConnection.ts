import {ChatConnectionInterface, ChatConnectionEvent, ConnectionOptionsInterface} from "./ConnectionAssets";
import {EventTarget} from "../ObservableInterface";

export interface WebApiConnectionOptionsInterface extends ConnectionOptionsInterface {
    attemptsToSend?: number;
    attemptDelayMs?: number;
}

export class WebApiConnection extends EventTarget implements ChatConnectionInterface {
    protected sendStack: {data: any, attempts: number, lastTimeoutId: any}[];

    public constructor(
        protected readonly options: WebApiConnectionOptionsInterface
    ) {
        super();
        if (!this.options.token && !this.options.temporaryNick) {
            throw new Error('Token or temporary nick is required for authentication');
        }
    }

    public send(data: any): void {
        this.sendStack.push({data: data, attempts: 0, lastTimeoutId: null});
        this.makeApiCall(this.sendStack.length - 1);
    }

    public destroy(): void {
        // Cancel all awaiting requests
        this.sendStack.forEach(item => {
            if (item.lastTimeoutId) {
                clearTimeout(item.lastTimeoutId);
            }
        });
        this.sendStack = [];
        this.emit(ChatConnectionEvent.destroy, false);
    }

    protected async onMessage(reqId: number, response: Response): Promise<void> {
        this.sendStack.splice(reqId, 1);
        this.emit(ChatConnectionEvent.message, await response.json());
    }

    protected onError(reqId: number, body: string): void {
        if (this.sendStack[reqId].attempts >= (this.options.attemptsToSend ?? 10)) {
            this.sendStack.splice(reqId, 1);
            this.emit(ChatConnectionEvent.error, new Error(
                `Cannot send ${body}; aborting after reaching the maximum connection errors`)
            );
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