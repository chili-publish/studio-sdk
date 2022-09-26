export enum SortBy { name = 'name', path = 'relativePath', id = 'id' }

export enum SortOrder { ascending = 'asc', descending = 'desc' }

export type QueryOptions = {
    filter: string[] | null;
    pageToken: string | null;
    pageSize: number | null;
    sortBy: SortBy | null;
    sortOrder: SortOrder | null;
}

export enum DownloadType {
    LowResolutionWeb = 'LowResolutionWeb',
    HighResolutionWeb = 'HighResolutionWeb',
    // outputVideo = 'outputVideo',
    // outputPdf = 'outputPdf'
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
    metaData: Map<string, string>;
}

export type MediaPage = {
    nextPageToken: string;
    data: Media[];
}