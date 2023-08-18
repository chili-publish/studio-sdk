

export interface ConnectorImageVariableSource {
    connectorId: string;
    assetId: string;
}


export enum VariableType {
    shortText = 'shortText',
    longText = 'longText',
    image = 'image',
    list = 'list',
    boolean = 'boolean',
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
    occurrences: number;
}

export interface ImageVariable extends Variable {
    value?: ConnectorImageVariableSource;
}

export interface ListVariable extends Variable {
    items: string[];
    selected?: string;
}

export interface BooleanVariable extends Variable {
    value: boolean;
}

export interface ShortTextVariable extends Variable {
    value: string;
}

export type LongTextVariable = ShortTextVariable;

export type GroupVariable = Variable;
