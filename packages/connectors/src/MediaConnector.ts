import { ArrayBufferPointer, Dictionary, Id, QueryOptions } from './Connector.Shared';
import { ConnectorConfigValue } from './external/Connector.Shared.external';
import { MediaConnectorCapabilities, MediaDetail, MediaDownloadIntent, MediaDownloadType, MediaType as SharedMediaType } from './external/MediaConnector.Shared.external';

export interface MediaConnector {
    detail(id: Id, context: Dictionary): Promise<MediaDetail>;
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    download(
        id: Id,
        previewType: DownloadType,
        intent: DownloadIntent,
        context: Dictionary,
    ): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigValue[];
    getCapabilities(): MediaConnectorCapabilities;
}

export type DownloadIntent = `${MediaDownloadIntent}`;
export type DownloadType = `${MediaDownloadType}`;

export interface MediaPage {
    pageSize: number;
    data: Media[];
    links: {
        nextPage: string;
    };
}

export type MediaType = `${SharedMediaType}`;

export type MediaT<T> = {
    id: Id;
    name: string;
    relativePath: string;
    type: T;
    extension: string | null;
    metaData: Dictionary;
};

export type Media = MediaT<MediaType>;
