import { ConnectionOptionsInterface } from "./ConnectionAssets";
export interface RestResponseInterface {
    ok: boolean;
    status: number;
    data: any;
}
export declare class RestApiConnection {
    protected options: ConnectionOptionsInterface;
    constructor(options: ConnectionOptionsInterface);
    send(method: string, uri: string, data?: any): Promise<RestResponseInterface>;
    protected getUrl(uri: string): string;
    private removeStartingSlash;
    private removeEndingSlash;
}
