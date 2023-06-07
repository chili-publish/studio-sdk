export enum ImageVariableSourceType {
    url = 'url',
    mediaConnector = 'mediaConnector',
}

export interface UrlImageVariableSource {
    sourceType: ImageVariableSourceType;
    url: string;
}

export interface MediaConnectorImageVariableSource {
    sourceType: ImageVariableSourceType;
    connectorId: string;
    assetId: string;
}

export type ImageVariableSource = UrlImageVariableSource | MediaConnectorImageVariableSource;

export enum VariableType {
    shorttext = 'shorttext',
    longtext = 'longtext',
    image = 'image',
    group = 'group',
}

export interface Variable {
    id: string;
    type: VariableType;
    parentId?: string;
    name: string;
    label: string;
    isHidden: boolean;
    isReadonly: boolean;
    isRequired: boolean;
}

export interface ImageVariable extends Variable {
    occurrences: number;
    src?: ImageVariableSource;
}

export interface ShortTextVariable extends Variable {
    occurrences: number;
    value: string;
}

export type LongTextVariable = ShortTextVariable;

export type GroupVariable = Variable;
