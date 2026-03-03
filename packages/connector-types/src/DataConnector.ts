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
    itemIdPropertyName?: string;
};

export type DataModelProperty = {
    name: string;
    type: string;
};

export interface OneDirectionalNavigation {
    continuationToken?: string | null;
}

export interface BiderectionalNavigation {
    previousPageToken?: string | null;
    nextPageToken?: string | null;
}

export type WithNavigation<T, N extends OneDirectionalNavigation | BiderectionalNavigation> = T & N;

export type DataPage = WithNavigation<Pick<QueryPage<DataItem>, 'data'>, OneDirectionalNavigation>;

export type BiderectionalDataPage = WithNavigation<Pick<QueryPage<DataItem>, 'data'>, BiderectionalNavigation>;

interface PageConfigBase {
    filters?: DataFilter[] | null;
    sorting?: DataSorting[] | null;
    limit: number;
}

export type PageConfig = PageConfigBase & OneDirectionalNavigation;

export type BiderectionalPageConfig = PageConfigBase & BiderectionalNavigation;

export type BiderectionalDataPageItem = WithNavigation<
    {
        data: DataItem;
    },
    BiderectionalNavigation
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
