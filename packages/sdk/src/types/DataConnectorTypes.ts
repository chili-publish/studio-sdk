export type OneDirectionalNavigation = {
    continuationToken?: string | null;
};

export type BidirectionalNavigation = {
    previousPageToken?: string | null;
    continuationToken?: string | null;
};

export type EditorDataPage<
    Item,
    N extends OneDirectionalNavigation | BidirectionalNavigation = OneDirectionalNavigation,
> = {
    data: Item[];
} & N;

export type {
    DataConnectorCapabilities,
    DataItem,
    DataModel,
    DataSourceVariableDataModel,
    DataPage,
    BidirectionalDataPage,
    BidirectionalDataPageItem,
    PageConfig,
    PageItemOptions,
    BidirectionalPageConfig,
} from '@chili-studio/connector-types';
