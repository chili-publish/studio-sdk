export enum DeprecatedMediaType {
    file = 0,
    collection = 1,
}

export enum MediaType {
    file = 'file',
    collection = 'collection',
}

export enum SortBy {
    name = 'name',
    path = 'relativePath',
    id = 'id',
}

export enum SortOrder {
    ascending = 'asc',
    descending = 'desc',
}

export type QueryOptions = {
    filter?: string[] | null;
    collection?: string | null;
    pageToken?: string | null;
    pageSize?: number | null;
    sortBy?: SortBy | null;
    sortOrder?: SortOrder | null;
};

export type ConnectorCapabilities = {
    filtering?: boolean;
    upload?: boolean;
    query?: boolean;
    remove?: boolean;
    copy?: boolean;
};

export type ConnectorRegistration = {
    id: string;
    source: ConnectorRegistrationSource;
    url: string;
};

export enum ConnectorRegistrationSource {
    url = 'url',
}
