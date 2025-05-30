import { QueryPage } from './Connector.Shared';

export type DataConnectorCapabilities = {
    filtering: boolean;
    sorting: boolean;
    model: boolean;
};

export type DataItem = {
    [key: string]: string | number | boolean | Date | null;
};

export type DataModel = {
    properties: DataModelProperty[];
};

export type DataModelProperty = {
    name: string;
    type: string;
};

export type DataPage = Pick<QueryPage<DataItem>, 'data'> & {
    continuationToken?: string | null;
};

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
