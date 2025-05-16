import { Dictionary, QueryPage } from './Connector.Shared';

export type MediaPage = QueryPage<Media>;

export interface Media {
    id: string;
    name: string;
    relativePath: string;
    metaData: Dictionary;
    extension?: string;
}

export interface BaseMediaDetail {
    width?: number;
    height?: number;
}

export type MediaConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    filtering: boolean;
    metadata?: boolean;
};
