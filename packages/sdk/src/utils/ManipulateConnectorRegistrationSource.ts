import { ConnectorRegistration, ConnectorRegistrationSource } from '../types/ConnectorTypes';

/**
 * Since `ConnectorGrafxRegistration` uses `RemoteConnectorId` instead of `url` on the engine side,
 * we extract that `id` from the source `url` to avoid any breaking changes
 * **/
export const manipulateConnectorRegistrationSource = (registration: ConnectorRegistration): ConnectorRegistration => {
    if (registration.source == ConnectorRegistrationSource.grafx) {
        const pathChunks = registration.url.split('/');
        // `RemoteConnectorId` is always the very last part of the URL
        const remoteConnectorId = pathChunks[pathChunks.length - 1];

        return { id: remoteConnectorId, url: '', source: ConnectorRegistrationSource.grafx };
    }

    return registration;
};
