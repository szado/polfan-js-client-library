import {ConnectionOptionsInterface} from "./ConnectionAssets";

export interface RestResponseInterface {
    ok: boolean;
    status: number;
    data: any;
}

export class RestApiConnection {
    public constructor(protected options: ConnectionOptionsInterface) {
        if (this.options.temporaryNick) {
            throw new Error('Temporary nick is not supported authentication method for REST API');
        }
    }

    public async send(method: string, uri: string, data: any = undefined): Promise<RestResponseInterface> {
        const headers: any = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        if (this.options.token) {
            headers.Authorization = `Bearer ${this.options.token}`;
        }

        const body = data === undefined ? undefined : JSON.stringify(data);
        const result = await fetch(this.getUrl(uri), {method, body, headers});

        return {
            ok: result.ok,
            status: result.status,
            data: await result.json(),
        };
    }

    protected getUrl(uri: string): string {
        return this.removeEndingSlash(this.options.url) + '/' + this.removeStartingSlash(uri);
    }

    private removeStartingSlash(text: string): string {
        return text.replace(/^\/+/, '');
    }

    private removeEndingSlash(text: string): string {
        return text.replace(/\/+$/, '');
    }
}