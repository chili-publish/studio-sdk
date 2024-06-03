import { ListVariableItem, Variable } from '../../types/VariableTypes';

export interface ListVariable extends Variable {
    items: ListVariableItem[];
    selected?: ListVariableItem;
}
