export type OneDirectionalNavigation = {
    continuationToken?: string | null;
};

export type BiderectionalNavigation = {
    previousPageToken?: string | null;
    nextPageToken?: string | null;
};

export type EditorDataPage<
    Item,
    N extends OneDirectionalNavigation | BiderectionalNavigation = OneDirectionalNavigation,
> = {
    data: Item[];
} & N;

export type {
    DataConnectorCapabilities,
    DataItem,
    DataModel,
    DataPage,
    BiderectionalDataPage,
    BiderectionalDataPageItem,
    PageConfig,
    BiderectionalPageConfig,
} from '@chili-studio/connector-types';
