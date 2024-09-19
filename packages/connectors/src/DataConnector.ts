import { Dictionary, ConnectorConfigValue, ConnectorRuntimeContext } from './Connector.Shared'

export interface DataConnector {
    getPage(config: PageConfig, context: Dictionary): Promise<DataPage>;
    getModel(context: Dictionary): Promise<DataModel>;

    getConfigurationOptions(): ConnectorConfigValue[] | null;
    getCapabilities(): DataConnectorCapabilities;
}

export interface DataConnectorRuntimeContext extends ConnectorRuntimeContext {
    // tryParseDate(input: string | number): Date;
}

export type DataConnectorCapabilities = {
    filtering: boolean;
    sorting: boolean;
    model: boolean;
}

export class DataModel {
    properties: DataModelProperty[];
}

export class DataModelProperty {
    name: string;
    type: 'number' | 'boolean' | 'singleLine' | 'multiLine' | 'date';
}

export type DataItem = {
    [key: string]: string | number | boolean | Date | null;
};

export interface DataPage {
    data: DataItem[];
    continuationToken: string;
}

export interface PageConfig {
    filters: DataFilter[];
    sorting: DataSorting[];
    continuationToken: string;
    limit: number;
}

export interface DataSorting {
    property: string;
    direction: 'asc' | 'desc';
}

export interface DataFilter {
    property: string;
    value: string;
    type: 'contains' | 'exact'
}