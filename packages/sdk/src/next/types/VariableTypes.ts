import { ListVariableItem, Variable } from '../../types/VariableTypes';

export interface ListVariable extends Variable {
    items: ListVariableItem[];
    selected?: ListVariableItem;
}

export enum VariableType {
    shortText = 'shortText',
    longText = 'longText',
    image = 'image',
    list = 'list',
    boolean = 'boolean',
    group = 'group',
    number = 'number',
    date = 'date',
}
