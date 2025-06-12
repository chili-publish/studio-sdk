export type EditorDataPage<Item> = {
    data: Item[];
    continuationToken?: string | null;
};

export type {
    DataConnectorCapabilities,
    DataItem,
    DataModel,
    DataPage,
    PageConfig,
} from '@chili-studio/connector-types';
