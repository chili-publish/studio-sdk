import { Id } from './CommonTypes';
import { MediaType } from './ConnectorTypes';

export type MediaConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    filtering: boolean;
    metadata?: boolean;
    upload?: boolean;
};

export enum MediaDownloadType {
    thumbnail = 'thumbnail',
    mediumres = 'mediumres',
    highres = 'highres',
    original = 'original',
}

export enum MediaDownloadIntent {
    web = 'web',
}

export type Media = {
    id: Id;
    name: string;
    relativePath: string;
    type: MediaType;
    extension: string | null;
    metaData: {
        [key: string]: string;
    };
};

export interface MediaDetail extends Media {
    width?: number;
    height?: number;
}
