import { ConnectorRegistrationSource } from '../../types/ConnectorTypes';
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
