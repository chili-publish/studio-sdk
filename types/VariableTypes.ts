export enum VariableType {
    shorttext = 'shorttext', longtext = 'longtext', image = 'image', group = 'group'
}

export interface Variable {
    id: string;
    type: VariableType;
    parentId?: string;
    name?: string;
    label?: string;
    isHidden?: boolean;
    value?: string;
    defaultValue?: string;
}