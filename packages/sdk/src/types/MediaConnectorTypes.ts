export type { Media, MediaConnectorCapabilities, MediaDetail } from '@chili-studio/connector-types';

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
