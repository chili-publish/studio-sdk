import {
    Dictionary,
    Media as GenericMedia,
    MediaDetail as GenericMediaDetail,
    MediaConnectorCapabilities,
    QueryOptions,
    QueryPage,
} from '@chili-studio/connector-types';
import { ArrayBufferPointer, ConnectorConfigOptions } from './Connector.Shared';

export type { MediaConnectorCapabilities } from '@chili-studio/connector-types';

export interface MediaConnector {
    detail(id: string, context: Dictionary): Promise<MediaDetail>;
    query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
    download(
        id: string,
        previewType: DownloadType,
        intent: DownloadIntent,
        context: Dictionary,
    ): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigOptions | null;
    getCapabilities(): MediaConnectorCapabilities;
}

export type DownloadIntent = 'web' | 'print' | 'animation';
export type DownloadType = 'thumbnail' | 'mediumres' | 'highres' | 'fullres' | 'original';
export type MediaType = 0 | 1;

export type MediaPage = QueryPage<Media>;
export type Media = GenericMedia<MediaType>;
export type MediaDetail = GenericMediaDetail<MediaType>;