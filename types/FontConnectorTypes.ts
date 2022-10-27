import { MediaType } from "./ConnectorTypes";

export enum FontDownloadType {
    Preview = 'lowresWeb',
    Download = 'outputPdf',
}

export type Font = {
    id: string;
    name: string;
    fontFamily?: string | null;
    fontStyle?: string | null;
    relativePath: string;
    type: MediaType;
    metaData: Map<string, string>;
};

export type FontPage = {
    pageSize: number;
    nextPageToken?: string;
    data: Font[];
};
