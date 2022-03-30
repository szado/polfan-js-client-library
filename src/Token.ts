const apiUrl = 'https://polfan.pl/webservice/auth/token';
const defaultClientName = 'Polfan JS Library';

export interface TokenInterface {
    token: string,
    expiration: string
}

export async function getToken(login: string, password: string, clientName: string = defaultClientName): Promise<TokenInterface> {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            ContentType: 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            login, password, client_name: clientName
        })
    });
    return await response.json();
}