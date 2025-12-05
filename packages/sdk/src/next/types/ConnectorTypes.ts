import { Id } from '../../types/CommonTypes';

export interface ConnectorUrlRegistration {
    /**
     * Url to the connector. Must be a publicly accessible url.
     */
    url: string;
    source: ConnectorRegistrationSource.url;
}

export interface ConnectorGrafxRegistration {
    /**
     * `RemoteConnectorId` of the connector with `grafx` source.
     */
    id: Id;
    source: ConnectorRegistrationSource.grafx;
}

export interface ConnectorLocalRegistration {
    url: string;
    source: ConnectorRegistrationSource.local;
}

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

export enum ConnectorType {
    media = 'media',
    fonts = 'fonts',
    data = 'data',
    /**
     * @experimental This is still experimental and might change in future releases.
     */
    components = 'components',
}

export type ConnectorInstance = {
    id: Id;
    name: string;
    iconUrl: string;
    source: ConnectorGrafxRegistration | ConnectorUrlRegistration | ConnectorLocalRegistration;
};
