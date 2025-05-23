import {
    Dictionary,
    FilePointer,
    Media as GenericMedia,
    MediaDetail as GenericMediaDetail,
    MediaConnectorCapabilities,
    QueryOptions,
    QueryPage,
} from '@chili-studio/connector-types';
import { ArrayBufferPointer, ConnectorConfigOptions } from './Connector.Shared';

export type { FilePointer, MediaConnectorCapabilities } from '@chili-studio/connector-types';

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

export interface MediaConnectorUpload {
    upload(filePointers: FilePointer[], context: Dictionary): Promise<Media[]>;
}

export type DownloadIntent = 'web' | 'print' | 'animation';
export type DownloadType = 'thumbnail' | 'mediumres' | 'highres' | 'fullres' | 'original';

export type FileType = 0;
export type FolderType = 1;
export type MediaType = FileType | FolderType;

export type MediaPage = QueryPage<Media>;
export type Media = GenericMedia<MediaType>;
export type MediaDetail = GenericMediaDetail<MediaType>;
