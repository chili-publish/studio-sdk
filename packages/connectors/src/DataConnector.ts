import { ConnectorConfigValue, ConnectorRuntimeContext, Dictionary } from './Connector.Shared';

export interface DataConnector {
    getPage(config: PageConfig, context: Dictionary): Promise<DataPage>;
    getModel(context: Dictionary): Promise<DataModel>;

    getConfigurationOptions(): ConnectorConfigValue[] | null;
    getCapabilities(): DataConnectorCapabilities;
}

// TODO: add methods once defined
export type DataConnectorRuntimeContext = ConnectorRuntimeContext;

export type DataConnectorCapabilities = {
    filtering: boolean;
    sorting: boolean;
    model: boolean;
};

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
    continuationToken?: string | null;
}

export interface PageConfig {
    filters?: DataFilter[] | null;
    sorting?: DataSorting[] | null;
    continuationToken?: string | null;
    limit: number;
}

export interface DataSorting {
    property: string;
    direction: 'asc' | 'desc';
}

export interface DataFilter {
    property: string;
    value: string;
    type: 'contains' | 'exact';
}
