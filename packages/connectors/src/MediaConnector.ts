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
    analyze(id: string, features: MediaFeatureRequest[], context: Dictionary): Promise<MediaFeatures>

    getConfigurationOptions(): ConnectorConfigValue[] | null;
    getCapabilities(): MediaConnectorCapabilities;
}

export const enum MediaFeatureRequest {
    smartCrop = 'smartCrop',
}

export type MediaFeatures = {
    subject?: MediaSubject,
    poi?: MediaPointOfInterest,
    category?: string,
}

export type MediaPointOfInterest = {
    x: number;
    y: number;
}

export type MediaSubject = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type DownloadIntent = 'web' | 'print' | 'animation';
export type DownloadType = 'thumbnail' | 'mediumres' | 'highres' | 'fullres' | 'original';

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
    metadata?: boolean;
    analyzeSmartCrop?: boolean;
};
