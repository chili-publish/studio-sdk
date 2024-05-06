import { ConnectorConfigValueType  as SharedConnectorConfigValueType } from './external/Connector.Shared.external';
import { SortBy as SharedSortBy, SortOrder as SharedSortOrder } from './external/Connector.Shared.external';

export type Id = string;

export interface Dictionary {
    [Key: string]: string;
}

export type ChiliPlatform = 'web' | 'server';

export interface ConnectorRuntimeContext {
    options: Dictionary;
    fetch(url: string, init: ChiliRequestInit): Promise<ChiliResponse>;
    logError(msg: string): void;
    platform: ChiliPlatform;
    sdkVersion: string;
}

export type SortBy = `${SharedSortBy}`
export type SortOrder = `${SharedSortOrder}`

export type QueryOptionsT<SortByType, SortOrderType> = {
    filter?: string[] | null;
    pageToken?: string | null;
    collection?: string | null;
    pageSize: number;
    sortBy?: SortByType | null;
    sortOrder?: SortOrderType | null;
};

export type QueryOptions = QueryOptionsT<SortBy, SortOrder>;

export interface ChiliRequestInit {
    /**
     * A BodyInit object or null to set request's body.
     */
    body?: string | null;
    /**
     * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
     */
    headers?: Dictionary;
    /**
     * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
     */
    integrity?: string;
    /**
     * A string to set request's method.
     */
    method?: 'GET' | 'POST';
    /**
     * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
     */
    redirect?: 'error' | 'follow' | 'manual';
    /**
     * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
     */
    referrer?: string;
}

export interface ChiliBody {
    arrayBuffer: ArrayBufferPointer;
    text: string;
}

export type ArrayBufferPointer = {
    id: string;
    bytes: number;
};

export interface ChiliResponse extends ChiliBody {
    readonly headers: Dictionary;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect';
    readonly url: string;
}

export type ConnectorConfigValueType = `${SharedConnectorConfigValueType}`;

