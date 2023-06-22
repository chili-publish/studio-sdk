export enum ImageVariableSourceType {
    url = 'url',
    mediaConnector = 'mediaConnector',
}

export interface UrlImageVariableSource {
    type: ImageVariableSourceType.url;
    url: string;
}

export interface MediaConnectorImageVariableSource {
    type: ImageVariableSourceType.mediaConnector;
    id: string;
    assetId: string;
}

export type ImageVariableSource = UrlImageVariableSource | MediaConnectorImageVariableSource;

export enum VariableType {
    shortText = 'shortText',
    longText = 'longText',
    image = 'image',
    list = 'list',
    group = 'group',
}

export interface Variable {
    id: string;
    type: VariableType;
    parentId?: string;
    name: string;
    label: string;
    isVisible: boolean;
    isReadonly: boolean;
    isRequired: boolean;
}

export interface ImageVariable extends Variable {
    occurrences: number;
    src?: ImageVariableSource;
}

export interface ListVariable extends Variable {
    occurrences: number;
    items: string[];
    selected?: string;
}

export interface ShortTextVariable extends Variable {
    occurrences: number;
    value: string;
}

export type LongTextVariable = ShortTextVariable;

export type GroupVariable = Variable;
