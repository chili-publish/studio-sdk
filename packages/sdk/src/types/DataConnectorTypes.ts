export type OneDirectionalNavigation = {
    continuationToken?: string | null;
};

export type BidirectionalNavigation = {
    previousPageToken?: string | null;
    nextPageToken?: string | null;
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
    DataPage,
    BidirectionalDataPage,
    BidirectionalDataPageItem,
    PageConfig,
    PageItemOptions,
    BidirectionalPageConfig,
} from '@chili-studio/connector-types';
