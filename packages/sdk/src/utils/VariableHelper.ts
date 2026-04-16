import {
    DataSourceVariable,
    DataSourceVariableSourceType,
    InjectedDataSourceVariableSource,
    Variable,
    VariableType,
} from '../types/VariableTypes';

const isDataSourceVariable = (variable: Variable): variable is DataSourceVariable => {
    return variable.type === VariableType.dataSource;
};
export const isInjectedDataSourceVariable = (
    variable: Variable | null,
): variable is DataSourceVariable & { value: InjectedDataSourceVariableSource } => {
    if (!variable) {
        return false;
    }
    return isDataSourceVariable(variable) && variable?.value?.type === DataSourceVariableSourceType.injected;
};
