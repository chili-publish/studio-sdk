import { ConnectorRegistration, ConnectorRegistrationSource } from '../types/ConnectorTypes';
import { Id } from '../types/CommonTypes';

/**
 * Since `ConnectorGrafxRegistration` uses `RemoteConnectorId` instead of `url` on the engine side,
 * we extract that `id` from the source `url` to avoid any breaking changes
 * **/
export const manipulateConnectorRegistrationSource = (
    registration: ConnectorRegistration,
): ConnectorRegistration | MigratedConnectorGrafxRegistration => {
    if (registration.source != ConnectorRegistrationSource.grafx) {
        return registration;
    }

    const pathChunks = registration.url.split('/');
    // `RemoteConnectorId` is always the very last part of the URL
    const remoteConnectorId = pathChunks[pathChunks.length - 1];

    return { url: '', id: remoteConnectorId, source: ConnectorRegistrationSource.grafx };
};

interface MigratedConnectorGrafxRegistration {
    /**
     * Exists only to avoid breaking changes with Grafx Source connectors
     **/
    url: string;
    /**
     * Newly introduced RemoteConnectorId parsed from the url
     **/
    id: Id;
    source: ConnectorRegistrationSource.grafx;
}
