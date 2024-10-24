export type DataConnectorCapabilities = {
    filtering: boolean;
    sorting: boolean;
    model: boolean;
};

export type PageConfig = {
    filters: DataFilter[];
    sorting: DataSorting[];
    continuationToken?: string | null;
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

// Generic DataItem
export type DataPage<Item> = {
    data: Item[];
    continuationToken?: string | null;
};

export type DataItem = {
    [key: string]: string | number | boolean | Date | null;
};

export type DataModel = {
    properties: DataModelProperty[];
};

type DataModelProperty = {
    name: string;
    type: 'number' | 'boolean' | 'singleLine' | 'multiLine' | 'date';
};
