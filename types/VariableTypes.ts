enum ImageVariableSourceType {
    url = 'url',
    mediaConnector = 'mediaConnector',
}
interface ImageVariable {
    sourceType: ImageVariableSourceType;
}

export interface UrlImageVariable extends ImageVariable {
    url: string;
}

export interface MediaConnectorImageVariable extends ImageVariable {
    connectorId: string;
    assetId: string;
}
export enum VariableType {
    shorttext = 'shorttext',
    longtext = 'longtext',
    image = 'image',
    group = 'group',
}

export type Variable = {
    id: string;
    type: VariableType;
    parentId?: string;
    name?: string;
    label?: string;
    isHidden?: boolean;
    isReadonly?: boolean;
    isRequired?: boolean;
    occurrences?: number;
    value?: string;
    defaultValue?: string;
    src?: MediaConnectorImageVariable | UrlImageVariable;
};

export type VariableMoves = {
    moves: string[];
    order: number;
    parent: string;
};
