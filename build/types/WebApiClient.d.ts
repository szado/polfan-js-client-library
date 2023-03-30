import { AbstractClient, CommandResult, CommandsMap } from "./AbstractClient";
import { ObservableInterface } from "./EventTarget";
export interface WebApiClientOptions {
    url: string;
    token?: string;
    temporaryNick?: string;
    attemptsToSend?: number;
    attemptDelayMs?: number;
}
declare enum WebApiClientEvent {
    message = "message",
    error = "error",
    destroy = "destroy"
}
export declare class WebApiClient extends AbstractClient implements ObservableInterface {
    private readonly options;
    readonly Event: typeof WebApiClientEvent;
    protected sendStack: {
        data: any;
        attempts: number;
        lastTimeoutId: any;
    }[];
    constructor(options: WebApiClientOptions);
    send<CommandType extends keyof CommandsMap>(commandType: CommandType, commandData: CommandsMap[CommandType][0]): Promise<CommandResult<CommandsMap[CommandType][1]>>;
    destroy(): void;
    protected onMessage(reqId: number, response: Response): Promise<void>;
    protected onError(reqId: number, body: string): void;
    protected makeApiCall(reqId: number): void;
}
export {};
