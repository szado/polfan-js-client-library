import { ChatConnectionInterface, ConnectionOptionsInterface } from "./ConnectionAssets";
import { EventTarget } from "../ObservableInterface";
export interface WebApiConnectionOptionsInterface extends ConnectionOptionsInterface {
    attemptsToSend?: number;
    attemptDelayMs?: number;
}
export declare class WebApiConnection extends EventTarget implements ChatConnectionInterface {
    protected readonly options: WebApiConnectionOptionsInterface;
    protected sendStack: {
        data: any;
        attempts: number;
        lastTimeoutId: any;
    }[];
    constructor(options: WebApiConnectionOptionsInterface);
    send(data: any): void;
    destroy(): void;
    protected onMessage(reqId: number, response: Response): Promise<void>;
    protected onError(reqId: number, body: string): void;
    protected makeApiCall(reqId: number): void;
}
