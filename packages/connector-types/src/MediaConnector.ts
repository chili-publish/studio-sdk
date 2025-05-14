import { Dictionary, QueryPage } from './Connector.Shared';

export type MediaPage = QueryPage<Media>;

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
};
