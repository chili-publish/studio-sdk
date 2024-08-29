import { ArrayBufferPointer, ConnectorConfigValue, Dictionary, QueryOptions } from './Connector.Shared';

export interface MediaConnector {
    detail(id: string, context: Dictionary): Promise<MediaDetail>;
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    download(
        id: string,
        previewType: DownloadType,
        intent: DownloadIntent,
        context: Dictionary,
    ): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigValue[] | null;
    getCapabilities(): MediaConnectorCapabilities;
}

export type DownloadIntent = 'web' | 'print' | 'animation';
export type DownloadType = 'thumbnail' | 'mediumres' | 'highres' | 'fullres' | 'original';

export interface MediaPage {
    data: Media[];
    nextPage?: string;    
}

export interface Media {
    id: string;
    name: string;
    parentCollection: string;
    type: number;
    metadata: Dictionary;
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
    metadata?: boolean;
};
