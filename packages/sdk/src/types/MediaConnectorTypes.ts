import { Media as GenericMedia, MediaDetail as GenericMediaDetail } from '@chili-studio/connector-types';
import { MediaType } from './ConnectorTypes';
export type { MediaConnectorCapabilities } from '@chili-studio/connector-types';

export enum MediaDownloadType {
    thumbnail = 'thumbnail',
    mediumres = 'mediumres',
    highres = 'highres',
    original = 'original',
}

export enum MediaDownloadIntent {
    web = 'web',
    print = 'print',
    animation = 'animation',
}

export type Media = GenericMedia<MediaType>;
export type MediaDetail = GenericMediaDetail<MediaType>;
