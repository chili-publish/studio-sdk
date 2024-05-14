import { ArrayBufferPointer, ConnectorConfigValue, Dictionary, Id, QueryOptions } from './Connector.Shared';

export interface MediaConnector {
    detail(id: Id, context: Dictionary): Promise<MediaDetail>;
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    download(
        id: Id,
        previewType: DownloadType,
        intent: DownloadIntent,
        context: Dictionary,
    ): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigValue[];
    getCapabilities(): MediaConnectorCapabilities;
}


export enum DownloadIntent {
    web = 'web',
    print = 'print',
    animation = 'animation',
}

export enum DownloadType {
    thumbnail = 'thumbnail',
    mediumres = 'mediumres',
    fullres = 'fullres',
    highres = 'highres',
    original = 'original',
}

export interface MediaPage {
    pageSize: number;
    data: Media[];
    links: {
        nextPage: string;
    };
}

export enum MediaType {
    file = 0,
    collection = 1,
}

export type Media = {
    id: Id;
    name: string;
    relativePath: string;
    type: MediaType;
    extension: string | null;
    metaData: Dictionary;
};

export type MediaConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    filtering: boolean;
};

export interface MediaDetail extends Media {
    width?: number;
    height?: number;
}
