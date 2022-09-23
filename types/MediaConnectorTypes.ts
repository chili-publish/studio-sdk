export enum sortBy { name = 'name', path = 'relativePath', id = 'id' }

export enum sortOrder { ascending = 'asc', descending = 'desc' }

export type QueryOptions = {
    filter: string[];
    pageToken: string;
    pageSize: number;
    sortBy: sortBy;
    sortOrder: sortOrder;
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