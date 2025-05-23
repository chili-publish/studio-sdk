import { Media as GenericMedia, MediaDetail as GenericMediaDetail } from '@chili-studio/connector-types';
import { MediaType } from './ConnectorTypes';
<<<<<<< HEAD
export type { MediaConnectorCapabilities } from '@chili-studio/connector-types';
=======

export type MediaConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    filtering: boolean;
    metadata?: boolean;
    upload?: boolean;
};
>>>>>>> abcb41a ([Feature] Media connector upload (#605))

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
