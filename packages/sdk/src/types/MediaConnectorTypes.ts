import { Id } from './CommonTypes';
import { MediaType } from './ConnectorTypes';

export enum MediaDownloadType {
    LowResolutionWeb = 'lowresWeb',
    HighResolutionWeb = 'highresWeb',
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

export type MediaPage = {
    pageSize: number;
    nextPageToken?: string;
    data: Media[];
};