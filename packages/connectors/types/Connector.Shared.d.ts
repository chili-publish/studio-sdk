
export interface Dictionary {
    [Key: string]: string;
}

export enum ChiliPlatform {
    web,
    server
}

export interface ConnectorRuntimeContext {
    options: Dictionary;
    fetch(url: string, init: ChiliRequestInit): Promise<ChiliResponse>;
    logError(msg: string): void;
    platform: ChiliPlatform;
    sdkVersion: string;
}

export enum DownloadType {
    lowres_web = 'lowresweb',
    highres_web = 'highresweb',
    outputVideo = 'outputVideo',
    outputPdf = 'outputPdf'
}

export type QueryOptions = {
    sortOrder: string | null;
    collection: string | null;
    filter: string[] | null;
    pageToken: string | null;
    pageSize: number;
    sortBy: string | null;
}

export interface ChiliRequestInit {
    /**
     * A BodyInit object or null to set request's body.
     */
    body?: string | null;
    /**
     * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
     */
    headers?: string[][];
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
    redirect?: "error" | "follow" | "manual";
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
    id: string,
    bytes: number
}

export interface ChiliResponse extends ChiliBody {
    readonly headers: string[][];
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
    readonly url: string;
}

export enum ConnectorConfigValueType {
    text = 'text',
    boolean = 'boolean',
}

export interface ConnectorConfigValue {
    readonly name: string;
    readonly displayName: string;
    readonly type: ConnectorConfigValueType;
}

export type ConnectorConfigOptions = ConnectorConfigValue[];
