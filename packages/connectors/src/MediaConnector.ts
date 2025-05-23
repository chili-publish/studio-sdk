<<<<<<< HEAD
import {
    Dictionary,
    Media as GenericMedia,
    MediaDetail as GenericMediaDetail,
    MediaConnectorCapabilities,
    QueryOptions,
    QueryPage,
} from '@chili-studio/connector-types';
import { ArrayBufferPointer, ConnectorConfigOptions } from './Connector.Shared';

export type { MediaConnectorCapabilities } from '@chili-studio/connector-types';
=======
import { ArrayBufferPointer, ConnectorConfigValue, Dictionary, QueryOptions, FilePointer } from './Connector.Shared';
>>>>>>> abcb41a ([Feature] Media connector upload (#605))

export interface MediaConnector {
    detail(id: string, context: Dictionary): Promise<MediaDetail>;
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    download(
        id: string,
        previewType: DownloadType,
        intent: DownloadIntent,
        context: Dictionary,
    ): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigOptions | null;
    getCapabilities(): MediaConnectorCapabilities;
}

export interface MediaConnectorUpload {
    upload(filePointers: FilePointer[], context: Dictionary): Promise<Media[]>;
}

export type DownloadIntent = 'web' | 'print' | 'animation';
export type DownloadType = 'thumbnail' | 'mediumres' | 'highres' | 'fullres' | 'original';
export type MediaType = 0 | 1;

<<<<<<< HEAD
export type MediaPage = QueryPage<Media>;
export type Media = GenericMedia<MediaType>;
export type MediaDetail = GenericMediaDetail<MediaType>;
=======
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
    upload?: boolean;
};
>>>>>>> abcb41a ([Feature] Media connector upload (#605))
