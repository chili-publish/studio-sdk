import {
    BaseMediaDetail,
    ConnectorConfigOptions,
    Media as CoreMedia,
    Dictionary,
    MediaConnectorCapabilities,
    MediaPage,
    QueryOptions,
} from '@chili-studio/connector-types';
import { ArrayBufferPointer } from './Connector.Shared';

export type { MediaConnectorCapabilities, MediaPage } from '@chili-studio/connector-types';

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

export type Media = CoreMedia & { type: number};
export type MediaDetail = BaseMediaDetail & Media;