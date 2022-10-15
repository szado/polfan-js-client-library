export interface TokenInterface {
    token: string;
    expiration: string;
}
export declare function getToken(login: string, password: string, clientName?: string): Promise<TokenInterface>;
