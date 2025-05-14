import { Dictionary } from '@chili-studio/connector-types';

export type {
    ConnectorConfigValue,
    ConnectorConfigValueType,
    Dictionary,
    QueryOptions,
} from '@chili-studio/connector-types';

export type ChiliPlatform = 'web' | 'server';

export interface ConnectorRuntimeContext {
    options: Dictionary;
    fetch(url: string, init: ChiliRequestInit): Promise<ChiliResponse>;
    logError(msg: string): void;
    platform: ChiliPlatform;
    sdkVersion: string;
}

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

/**
 * Interface for the constructor of ConnectorHttpError.
 */
export interface ConnectorHttpErrorConstructor {
    /**
     * Creates a new ConnectorHttpError instance.
     *
     * @param status - The HTTP status code associated with the error.
     * @param message - Optional error message.
     * @returns A new instance of ConnectorHttpError.
     */
    new (status: number, message?: string): ConnectorHttpError;

    /**
     * The prototype of ConnectorHttpError.
     */
    readonly prototype: ConnectorHttpError;
}

declare global {
    var ConnectorHttpError: ConnectorHttpErrorConstructor;
}
