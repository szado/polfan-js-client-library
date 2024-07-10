import { AbstractRestClient, RestClientResponse } from "./AbstractRestClient";
export interface File {
    id: string;
    url: string;
    original_name: string;
    mime_type: string;
    size: number;
}
export declare class FilesClient extends AbstractRestClient {
    protected defaultUrl: string;
    uploadFile(file: Parameters<typeof FormData.prototype.append>[1]): Promise<RestClientResponse<File>>;
    getFileMetadata(id: string): Promise<RestClientResponse<File>>;
}
