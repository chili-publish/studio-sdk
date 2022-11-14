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
    metaData: Map<string, string>;
};

export type MediaPage = {
    pageSize: number;
    nextPageToken?: string;
    data: Media[];
};
