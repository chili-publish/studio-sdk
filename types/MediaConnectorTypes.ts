import { MediaType } from './ConnectorTypes';

export enum MediaDownloadType {
    LowResolutionWeb = 'lowresWeb',
    HighResolutionWeb = 'highresWeb',
}

export type Media = {
    id: string;
    name: string;
    relativePath: string;
    type: MediaType;
    metaData: {
        [key: string]: string
    };
};

export type MediaPage = {
    pageSize: number;
    nextPageToken?: string;
    data: Media[];
};
