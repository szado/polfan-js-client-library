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

export abstract class AbstractRestClient {
    protected abstract defaultUrl: string;

    protected constructor(
        private readonly options: RestClientOptions,
    ) {}

    protected async send<ResponseT = any>(
        method: HttpMethod,
        uri: string,
        data: any = undefined
    ): Promise<RestClientResponse<ResponseT>> {
        const headers: any = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        if (this.options.token) {
            headers.Authorization = `Bearer ${this.options.token}`;
        }

        let url = this.getUrl(uri);
        let body = undefined;

        if (data) {
            if (['GET', 'DELETE'].includes(method)) {
                url += new URLSearchParams(data).toString()
            } else {
                body = JSON.stringify(data);
            }
        }

        const result = await fetch(url, {method, body, headers});

        return {
            ok: result.ok,
            status: result.status,
            data: await result.json(),
        };
    }

    protected getUrl(uri: string): string {
        return this.removeEndingSlash(this.options.url ?? this.defaultUrl) + '/' + this.removeStartingSlash(uri);
    }

    private removeStartingSlash(text: string): string {
        return text.replace(/^\/+/, '');
    }

    private removeEndingSlash(text: string): string {
        return text.replace(/\/+$/, '');
    }
}