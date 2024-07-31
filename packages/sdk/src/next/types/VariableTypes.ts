import { ListVariableItem, ValueWithStyle, Variable } from '../../types/VariableTypes';

export interface ListVariable extends Variable {
    items: ListVariableItem[];
    selected?: ListVariableItem;
    prefix?: ValueWithStyle;
    suffix?: ValueWithStyle;
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
