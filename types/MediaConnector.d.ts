import { QueryOptions, Dictionary, ArrayBufferPointer, DownloadType, ConnectorConfigOptions } from "./Connector.Shared";

export interface MediaConnector {
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    detail(id: string, context: Dictionary): Promise<MediaDetail>;
    download(id: string, previewType: DownloadType, context: Dictionary): Promise<ArrayBufferPointer>
    upload(name: string, blob: ArrayBufferPointer, context: Dictionary): Promise<Media>
    remove(id: string, context: Dictionary): Promise<boolean>
    copy(id: string, newName: string, context: Dictionary): Promise<Media>
    getConfigurationOptions(): ConnectorConfigOptions | null;
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
    id: string;
    name: string;
    relativePath: string;
    type: number;
    metaData: Dictionary;
}

export interface MediaDetail extends Media {
    width?: number;
    height?: number;
    extension?: string;
}