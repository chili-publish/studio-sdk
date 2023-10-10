import { QueryOptions, Dictionary, ArrayBufferPointer, ConnectorConfigOptions, ConnectorCapabilities } from "./Connector.Shared";

export interface MediaConnector {
    detail(id: string, context: Dictionary): Promise<MediaDetail>;
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    download(id: string, previewType: DownloadType, context: Dictionary): Promise<ArrayBufferPointer>
    upload(name: string, blob: ArrayBufferPointer, context: Dictionary): Promise<Media>
    remove(id: string, context: Dictionary): Promise<boolean>
    copy(id: string, newName: string, context: Dictionary): Promise<Media>
    getConfigurationOptions(): ConnectorConfigOptions | null;
    getCapabilities(): ConnectorCapabilities;
}

export enum DownloadType {
    lowresWeb = 'lowresWeb',
    highresWeb = 'highresWeb',
    outputVideo = 'outputVideo',
    outputPdf = 'outputPdf'
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
    extension?: string;
}

export interface MediaDetail extends Media {
    width?: number;
    height?: number;
}