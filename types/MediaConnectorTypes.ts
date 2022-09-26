export enum SortBy { name = 'name', path = 'relativePath', id = 'id' }

export enum SortOrder { ascending = 'asc', descending = 'desc' }

export enum MediaType { file = '0', collection = '1' }

export type QueryOptions = {
    filter: string[] | null;
    collection: string | null;
    pageToken: string | null;
    pageSize: number | null;
    sortBy: SortBy | null;
    sortOrder: SortOrder | null;
}

export enum DownloadType {
    LowResolutionWeb = 'LowResolutionWeb',
    HighResolutionWeb = 'HighResolutionWeb'
}

export type MediaConnectorCapabilities = {
    filtering: boolean;
    upload: boolean;
    query: boolean;
    remove: boolean;
    copy: boolean;
}

export type Media = {
    id: string;
    name: string;
    relativePath: string;
    type: MediaType,
    metaData: Map<string, string>;
}

export type MediaPage = {
    nextPageToken: string;
    data: Media[];
}