export interface RestClientOptions {
    url?: string;
    token: string;
}
export interface RestClientResponse<T> {
    ok: boolean;
    status: number;
    data: T;
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export declare abstract class AbstractRestClient {
    private readonly options;
    protected abstract defaultUrl: string;
    protected constructor(options: RestClientOptions);
    protected send<ResponseT = any>(method: HttpMethod, uri: string, data?: any): Promise<RestClientResponse<ResponseT>>;
    protected getUrl(uri: string): string;
    private removeStartingSlash;
    private removeEndingSlash;
}
