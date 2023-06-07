export enum ImageVariableSourceType {
    url = 'url',
    mediaConnector = 'mediaConnector',
}

export interface UrlImageVariableSource {
    url: string;
    type: ImageVariableSourceType;
}

export interface MediaConnectorImageVariableSource {
    id: string;
    assetId: string;
    type: ImageVariableSourceType;
}

export type ImageVariableSource = UrlImageVariableSource | MediaConnectorImageVariableSource;

export enum VariableType {
    shortText = 'shortText',
    longText = 'longText',
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

export type VariableMoves = {
    moves: string[];
    order: number;
    parent: string;
};
