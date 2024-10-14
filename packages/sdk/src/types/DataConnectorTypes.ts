export type DataConnectorCapabilities = {
    filtering: boolean;
    sorting: boolean;
    model: boolean;
};

export type PageConfig = {
    filters: DataFilter[];
    sorting: DataSorting[];
    continuationToken: string;
    limit: number;
};

export type DataSorting = {
    property: string;
    direction: 'asc' | 'desc';
};

export type DataFilter = {
    property: string;
    value: string;
    type: 'contains' | 'exact';
};

export type DataPage = {
    data: DataItem[];
    continuationToken?: string | null;
};

export type DataItem = {
    [key: string]: string | number | boolean | DatePropertyWrapper | Date | null;
};

export type DatePropertyWrapper = {
    value: number;
    type: 'date';
};

export type DataModel = {
    properties: DataModelProperty[];
};

type DataModelProperty = {
    name: string;
    type: 'number' | 'boolean' | 'singleLine' | 'multiLine' | 'date';
};
