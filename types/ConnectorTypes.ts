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
};

export class ConnectorMapping {
    
    name: string;
    value: string;

    constructor(mapTo: ConnectorMappingTarget, contextProperty: string, mapFrom: ConnectorMappingSource, sourceValue: string) {
        this.name = `${mapTo}.${contextProperty}`;
        this.value = `${mapFrom}.${sourceValue}`;
    }
}

export type ConnectorState = {
    id: string;
    type: ConnectorStateType;
}

export type ConnectorEvent = {
    id: string;
    type: ConnectorEventType;
}

export type QueryPage<T> = {
    nextPageToken?: string;
    data: T[];
};

export enum ConnectorMappingTarget {
    query = 'query',
    download = 'download'
}

export enum ConnectorMappingSource {
    variable = 'var',
}

export enum ConnectorStateType {
    loading = 'loading',
    loaded = 'loaded',
    running = 'running',
    ready = 'ready',
    error = 'error',
};

export enum ConnectorEventType {
    stateChanged = 'stateChanged',
    authChanged = 'authChanged',
    reloadRequired = 'reloadRequired',
    unloaded = 'unloaded',
};
