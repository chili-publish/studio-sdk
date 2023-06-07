import { Id } from './CommonTypes';
import { MediaType } from './ConnectorTypes';

export enum FontDownloadType {
    Preview = 'lowresWeb',
    Download = 'outputPdf',
}

export type Font = {
    id: string;
    name: string;
    family: string | null;
    style: string | null;
    relativePath: string;
    type: MediaType;
    extension: string | null;
    metaData: Map<string, string>;
};

export type FontPage = {
    pageSize: number;
    nextPageToken?: string;
    data: Font[];
};
