import { Id } from "./CommonTypes";

export enum DeprecatedMediaType {
    file = 0,
    collection = 1,
}

export enum MediaType {
    file = 'file',
    collection = 'collection',
}

export enum ConnectorType {
    media = 'media',
    fonts = 'fonts',
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
    detail?: boolean;
};

export type ConnectorRegistration = {
    id: Id;
    source: ConnectorRegistrationSource;
    url: string;
};

export type ConnectorInstance = {
    id: Id;
    name: string;
    iconUrl: string;
};

export enum ConnectorRegistrationSource {
    url = 'url',
}

export class ConnectorMapping {
    name: string;
    value: string;

    constructor(
        mapTo: ConnectorMappingTarget,
        contextProperty: string,
        mapFrom: ConnectorMappingSource,
        sourceValue: string,
    ) {
        this.name = `${mapTo}.${contextProperty}`;
        this.value = `${mapFrom}.${sourceValue}`;
    }
}

export type ConnectorState = {
    id: Id;
    type: ConnectorStateType;
};

export type ConnectorEvent = {
    id: Id;
    type: ConnectorEventType;
};

export type QueryPage<T> = {
    nextPageToken?: string;
    data: T[];
};

export enum ConnectorMappingTarget {
    query = 'query',
    download = 'download',
}

export enum ConnectorMappingSource {
    variable = 'var',
}

export enum ConnectorStateType {
    /**
     * Connector loading process has started.
     * Any SDK methods that required the connector id, will start working now.
     */
    loading = 'loading',

    /**
     * Connector loading completed.
     */
    loaded = 'loaded',

    /**
     * Connector is running in QuickJS.
     */

    running = 'running',

    /**
     * Connector is fully configured and has the correct authentication information.
     * At this point the connector is ready to make requests.
     */
    ready = 'ready',

    /**
     * Something went wrong, the connector is in error state.
     * Check the error message for more information.
     */
    error = 'error',
}

export enum ConnectorEventType {
    /**
     * This event will be triggered by the following state changes of the connector
     * - loading
     * - loaded
     * - running
     * - ready
     * - error
     */
    stateChanged = 'stateChanged',

    /**
     * Authentication information is changed
     */
    authChanged = 'authChanged',

    /**
     * Connector configuration changed that requires the connector to be reloaded in QuickJS.
     * This will trigger multiple 'stateChanged' events while it is reloading.
     * Wait until 'ready'-stateChanged event is received to start using the connector again.
     */
    reloadRequired = 'reloadRequired',

    /**
     * Connector is unregistered and no longer exists inside the editor engine.
     * Don't use the 'connectorId' after receiving this event.
     */
    unloaded = 'unloaded',
}
