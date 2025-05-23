import { Dictionary, FilePointer, ConnectorConfigOptions as GenericConnectorConfigOptions, ConnectorConfigValue as GenericConnectorConfigValue } from '@chili-studio/connector-types';

export type {
    Dictionary, FilePointer, QueryOptions
} from '@chili-studio/connector-types';

export type ChiliPlatform = 'web' | 'server';
export type ConnectorConfigValueType = 'text' | 'boolean';
export type ConnectorConfigContextType = 'query' | 'upload';

export type ConnectorConfigValue = GenericConnectorConfigValue<ConnectorConfigValueType, ConnectorConfigContextType>;
export type ConnectorConfigOptions = GenericConnectorConfigOptions<ConnectorConfigValueType, ConnectorConfigContextType>;

export interface ConnectorRuntimeContext {
    options: Dictionary;
    fetch(url: string, init: ChiliRequestInit): Promise<ChiliResponse>;
    logError(msg: string): void;
    platform: ChiliPlatform;
    sdkVersion: string;
}

export type StudioFormDataValue = string | FilePointer;
/**
 * A class that represents a form data object.
 * This class is used to create a form data object that can be used to send data to the server.
 */
export interface StudioFormData {
    append(name: string, value: StudioFormDataValue, filename?: string): void;
    set(name: string, value: StudioFormDataValue, filename?: string): void;
    delete(name: string): void;
    forEach(callback: (value: StudioFormDataValue, name: string) => void): void;
    get(name: string): StudioFormDataValue | null;
    getAll(name: string): StudioFormDataValue[];
    has(name: string): boolean;
}

export type StudioFetchBody =
    | string // JSON, text, base64, etc.
    | FilePointer
    | StudioFormData;
export interface ChiliRequestInit {
    /**
     * A StudioFetchBody object or null to set request's body.
     */
    body?: StudioFetchBody | null;
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
    method?: string;
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

/**
 * A custom HTTP error for connectors.
 *
 * This should be thrown when any of the connector methods
 * failed due to a non OK HTTP status code.
 *
 * The framework will be able to handle this error in a better way
 * versus throwing a generic `Error`.
 */
export interface ConnectorHttpError extends Error {
    /**
     * The HTTP status code associated with the error.
     */
    readonly status: number;
}