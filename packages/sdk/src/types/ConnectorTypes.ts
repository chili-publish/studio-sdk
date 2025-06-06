import type {
    Dictionary as ContextDictionary,
    ConnectorConfigOptions as GenericConnectorConfigOptions,
    ConnectorConfigValue as GenericConnectorConfigValue,
    QueryPage as QueryResult,
} from '@chili-studio/connector-types';
import { Id } from './CommonTypes';

export type { FilePointer, QueryOptions } from '@chili-studio/connector-types';

export enum DeprecatedMediaType {
    file = 0,
    collection = 1,
}

export enum DeprecatedMediaConnectorDownloadType {
    LowResolutionWeb = 'lowresWeb',
    HighResolutionWeb = 'highresWeb',
}

export enum MediaType {
    file = 'file',
    collection = 'collection',
}

export enum ConnectorType {
    media = 'media',
    fonts = 'fonts',
    data = 'data',
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

export enum ConnectorConfigValueType {
    text = 'text',
    boolean = 'boolean',
}

export enum ConnectorConfigContextType {
    query = 'query',
    upload = 'upload',
}

export type ConnectorConfigValue = GenericConnectorConfigValue<ConnectorConfigValueType, ConnectorConfigContextType>;
export type ConnectorConfigOptions = GenericConnectorConfigOptions<
    ConnectorConfigValueType,
    ConnectorConfigContextType
>;

interface ConnectorRegistrationBase {
    /**
     * Url to the connector.
     *
     * - If source is `url`, this must be a publicly accessible url.
     *
     * - If source is `grafx`, this must be the full url to the connector GET endpoint on GraFx Environment API.
     */
    url: string;

    /**
     * Connector source type.
     */
    source: ConnectorRegistrationSource;
}

export interface ConnectorUrlRegistration extends ConnectorRegistrationBase {
    source: ConnectorRegistrationSource.url;
}

export interface ConnectorGrafxRegistration extends ConnectorRegistrationBase {
    source: ConnectorRegistrationSource.grafx;
}

export interface ConnectorLocalRegistration extends ConnectorRegistrationBase {
    source: ConnectorRegistrationSource.local;
}

export type ConnectorRegistration = ConnectorUrlRegistration | ConnectorGrafxRegistration | ConnectorLocalRegistration;

export type ConnectorInstance = {
    id: Id;
    name: string;
    iconUrl: string;
    source: ConnectorRegistration;
};

export enum ConnectorRegistrationSource {
    /**
     * Connector is hosted on a publicly accessible link.
     */
    url = 'url',

    /**
     * Connector is hosted on GraFx Environment API.
     */
    grafx = 'grafx',

    /**
     * Connector is embedded in the document.
     * Note: This is a temporary type; only to be used internally.
     */
    local = 'local',
}

export interface EngineToConnectorMapping {
    name: string;
    value: ContextDictionary[keyof ContextDictionary];
    direction: ConnectorMappingDirection.engineToConnector;
}

export interface ConnectorToEngineMapping {
    name: string;
    value: string;
    direction: ConnectorMappingDirection.connectorToEngine;
}

export type ConnectorMappingType = EngineToConnectorMapping | ConnectorToEngineMapping;

export class ConnectorMapping implements EngineToConnectorMapping, ConnectorToEngineMapping {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    direction: any = ConnectorMappingDirection.engineToConnector;

    constructor(
        contextProperty: string,
        mapFrom: ConnectorMappingSource.variable,
        sourceValue: string,
        direction: ConnectorMappingDirection.connectorToEngine,
    );
    constructor(
        contextProperty: string,
        mapFrom: ConnectorMappingSource,
        sourceValue: string | boolean,
        direction?: ConnectorMappingDirection.engineToConnector,
    );
    constructor(contextProperty: string, mapFrom: ConnectorMappingSource, sourceValue: string | boolean);
    constructor(
        contextProperty: string,
        mapFrom: ConnectorMappingSource,
        sourceValue: string | boolean,
        direction = ConnectorMappingDirection.engineToConnector,
    ) {
        this.name = contextProperty;
        this.direction = direction;

        if (mapFrom === ConnectorMappingSource.variable) {
            this.value = `${mapFrom}.${sourceValue}`;
        } else {
            this.value = sourceValue;
        }
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

export type QueryPage<T> = Omit<QueryResult<T>, 'links'> & {
    nextPageToken?: string;
};

export enum ConnectorMappingSource {
    variable = 'var',
    value = 'value',
}

/**
 * Direction of the Connector Mapping.
 */
export enum ConnectorMappingDirection {
    /**
     * Indicates the mapping will propagate a value to the connector. This
     * mapping might cause the linked connector to refresh.
     */
    engineToConnector = 'engineToConnector',

    /**
     * Indicates the mapping will propagate a value from inside the connector
     * to the engine. AKA "reverse mapping".
     */
    connectorToEngine = 'connectorToEngine',
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

/**
 * Hardcoded grafx media connector until we get it from the environment.
 */
export const grafxMediaConnectorRegistration: ConnectorLocalRegistration = {
    url: 'grafx-media.json',
    source: ConnectorRegistrationSource.local,
};

/**
 * Grafx token to return to the engine when it expires.
 */
export class GrafxTokenAuthCredentials {
    token: string;
    type = AuthCredentialsTypeEnum.grafxToken;

    constructor(token: string) {
        this.token = token;
    }
}

/**
 * Notification to return to the engine whenever a 3rd party auth (user impersonation)
 * has been renewed by the integration.
 */
export class RefreshedAuthCredendentials {
    type = AuthCredentialsTypeEnum.refreshed;
}

export enum AuthCredentialsTypeEnum {
    grafxToken = 'grafxToken',
    refreshed = 'refreshed',
}

export type AuthCredentials = GrafxTokenAuthCredentials | RefreshedAuthCredendentials;

export enum AuthRefreshTypeEnum {
    grafxToken = 'grafxToken',
    any = 'any',
}

/**
 * @param connectorId connector id
 * @param remoteConnectorId remote connector id
 * @param type type of auth renewal needed
 * @param headerValue the value of the X-GRAFX-UNAUTHORIZED header. This
 *      will notify that the dam authentication expired if it went through the
 *      proxy.
 *      Example: "Static, 1234", "OAuthClientCredentials, 5678"
 *      If the http request did not go through the proxy, headerValue is null.
 */
export type AuthRefreshRequest = {
    connectorId: Id;
    remoteConnectorId: Id;
    type: AuthRefreshTypeEnum;
    headerValue: string | null;
};

export type ConnectorOptions = ContextDictionary;
export type MetaData = ContextDictionary;

export type UploadValidationConfiguration = {
    minWidthPixels?: number | null;
    maxWidthPixels?: number | null;
    minHeightPixels?: number | null;
    maxHeightPixels?: number | null;
    mimeTypes?: ('image/jpg' | 'image/jpeg' | 'image/png')[];
};

export enum UploadAssetValidationErrorType {
    minDimension = 'minDimension',
}

export class UploadAssetValidationError extends Error {
    constructor(message: string, public type: UploadAssetValidationErrorType) {
        super(message);
    }
}
