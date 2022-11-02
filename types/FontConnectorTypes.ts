import { MediaType } from './ConnectorTypes';

export enum FontDownloadType {
    Preview = 'lowresWeb',
    Download = 'outputPdf',
}

export type Font = {
    id: string;
    name: string;
    family?: string | null;
    style?: string | null;
    relativePath: string;
    type: MediaType;
    metaData: Map<string, string>;
};
