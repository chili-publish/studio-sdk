enum ImageVariableSourceType {
    url = 'url',
    mediaConnector = 'mediaConnector',
}
interface ImageVariableSource {
    sourceType: ImageVariableSourceType;
}

export interface UrlImageVariableSource extends ImageVariableSource {
    url: string;
}

export interface MediaConnectorImageVariableSource extends ImageVariableSource {
    connectorId: string;
    assetId: string;
}
export enum VariableType {
    shorttext = 'shorttext', longtext = 'longtext', image = 'image', group = 'group'
}

export type Variable  = {
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
    src?: MediaConnectorImageVariableSource | UrlImageVariableSource
}

export type VariableMoves = {
    moves: string[];
    order: number;
    parent: string;
}