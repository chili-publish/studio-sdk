import { Dictionary } from './Connector.Shared';

export interface Media<MediaType> {
    id: string;
    name: string;
    relativePath: string;
    metaData: Dictionary;
    extension?: string;
    type: MediaType;
}

export type MediaDetail<MediaType> = Media<MediaType> & {
    width?: number;
    height?: number;
};

export type MediaConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    filtering: boolean;
    metadata?: boolean;
};
