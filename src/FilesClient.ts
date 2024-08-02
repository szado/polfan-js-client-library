import {AbstractRestClient, RestClientResponse} from "./AbstractRestClient";

export interface File {
    id: string;
    url: string;
    original_url: string;
    original_name: string;
    mime_type: string;
    size: number;
    image_dimensions: [number, number] | null;
}

export class FilesClient extends AbstractRestClient {
    protected defaultUrl: string = 'https://polfan.pl/webservice/api/files';

    public async uploadFile(file: Parameters<typeof FormData.prototype.append>[1]): Promise<RestClientResponse<File>> {
        const formData = new FormData();
        formData.append('file', file);

        let headers = {...this.getAuthHeaders(), Accept: 'application/json'};

        const response = await fetch(this.defaultUrl, {method: 'POST', body: formData, headers});

        return this.convertFetchResponse<File>(response);
    }

    public async getFileMetadata(id: string): Promise<RestClientResponse<File>> {
        return this.send('GET', '/' + id);
    }
}