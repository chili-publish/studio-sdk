enum ImageVariableSourceType {
    url = 'url',
    assetProvider = 'assetProvider',
    variable = 'variable',
}
interface ImageVariableSource {
    sourceType: ImageVariableSourceType;
}

interface UrlImageVariableSource extends ImageVariableSource {
    url: string;
}

interface AssetProviderImageVariableSource extends ImageVariableSource {
    providerId: string;
    assetId: string;
}

interface VariableImageVariableSource extends ImageVariableSource {
    variableId: string;
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
    src?: VariableImageVariableSource | AssetProviderImageVariableSource | UrlImageVariableSource
}

export type VariableMoves = {
    moves: string[];
    order: number;
    parent: string;
}