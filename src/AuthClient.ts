import {AbstractRestClient} from "./AbstractRestClient";

export interface TokenInterface {
    token: string,
    expiration: string
}

export interface MyAccountInterface {
    id: string;
    nick: string;
    avatar: string;
}

export class AuthClient extends AbstractRestClient {
    protected defaultUrl: string = 'https://polfan.pl/webservice/api';

    public static async createToken(
        login: string,
        password: string,
        clientName: string = 'pserv-js-client'
    ): Promise<TokenInterface> {
        const response = await new AuthClient({token: null}).send('POST', 'auth/tokens', {
            login, password, client_name: clientName
        });
        if (response.ok) {
            return response.data;
        }
        throw new Error(`Cannot create user token: ${response.data.errors[0]}`);
    }

    public async deleteToken(token: string): Promise<void> {
        const response = await this.send('DELETE', `auth/tokens/${token}`);
        if (!response.ok) {
            throw new Error(`Cannot delete access token: ${response.data.errors[0]}`);
        }
    }

    public async getMe(): Promise<MyAccountInterface> {
        const response = await this.send('GET', 'auth/me');
        if (response.ok) {
            response.data.id = response.data.id.toString();
            return response.data;
        }
        throw new Error(`Cannot get current user account: ${response.data.errors[0]}`);
    }
}