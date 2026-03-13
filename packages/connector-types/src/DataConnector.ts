import { QueryPage } from './Connector.Shared';

export type DataConnectorCapabilities = {
    filtering: boolean;
    sorting: boolean;
    model: boolean;
    dataSourceVariable?: boolean;
};

export type DataItem = {
    [key: string]: string | number | boolean | Date | null;
};

export type DataModel = {
    properties: DataModelProperty[];
};

export type DataSourceVariableDataModel = DataModel & {
    itemIdPropertyName: string;
};

export type DataModelProperty = {
    name: string;
    type: string;
};

export interface OneDirectionalNavigation {
    continuationToken?: string | null;
}

export interface BidirectionalNavigation extends OneDirectionalNavigation {
    previousPageToken?: string | null;
}

export type WithNavigation<T, N extends OneDirectionalNavigation | BidirectionalNavigation> = T & N;

export type DataPage = WithNavigation<Pick<QueryPage<DataItem>, 'data'>, OneDirectionalNavigation>;

export type BidirectionalDataPage = WithNavigation<Pick<QueryPage<DataItem>, 'data'>, BidirectionalNavigation>;

interface PageConfigBase {
    filters?: DataFilter[] | null;
    sorting?: DataSorting[] | null;
    limit: number;
}

/** Options for getPageItemById: sorting and limit used to build navigation tokens. */
export interface PageItemOptions {
    sorting?: DataSorting[] | null;
    limit: number;
}

export type PageConfig = PageConfigBase & OneDirectionalNavigation;

export type BidirectionalPageConfig = PageConfigBase & BidirectionalNavigation;

export type BidirectionalDataPageItem = WithNavigation<
    {
        data: DataItem;
    },
    BidirectionalNavigation
>;

export interface DataSorting {
    property: string;
    direction: 'asc' | 'desc';
}

export interface DataFilter {
    property: string;
    value: string;
    type: 'contains' | 'exact';
}
