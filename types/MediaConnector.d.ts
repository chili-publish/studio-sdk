import { QueryOptions, Dictionary, ArrayBufferPointer, DownloadType } from "./Connector.Shared";

export interface MediaConnector {
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    detail(id: string): Promise<MediaDetail>;
    download(id: string, previewType: DownloadType, context: Dictionary): Promise<ArrayBufferPointer>
    upload(name: string, blob: ArrayBufferPointer): Promise<Media>
    remove(id: string): Promise<boolean>
    copy(id: string, newName: string): Promise<Media>
    getQueryOptions(): string[] | null;
    getDownloadOptions(): string[] | null;
    getCapabilities(): MediaConnectorCapabilities;
}

export type MediaConnectorCapabilities = {
    filtering: boolean;
    upload: boolean;
    query: boolean;
    detail: boolean;
    remove: boolean;
    copy: boolean;
}

export interface MediaPage {
    pageSize: number;
    data: Media[];
    links: {
        nextPage: string;
    };
}

export interface Media {
    id: String;
    name: String;
    relativePath: String;
    type: number;
    metaData: Dictionary;
}

export interface MediaDetail extends Media {
    width?: number;
    height?: number;
    extension?: string;
}