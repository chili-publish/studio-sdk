import { ArrayBufferPointer, ConnectorConfigValue, Dictionary, QueryOptions } from './Connector.Shared';

export interface MediaConnector {
    detail(id: string, context: Dictionary): Promise<MediaDetail>;
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    download(id: string, previewType: DownloadType, context: Dictionary): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigValue[] | null;
    getCapabilities(): MediaConnectorCapabilities;
}

export type DownloadType = 'lowresWeb' | 'highresWeb' | 'outputVideo' | 'outputPdf';

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

export type MediaConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    filtering: boolean;
};
