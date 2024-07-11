import { ConnectorRegistration, ConnectorRegistrationSource } from '../types/ConnectorTypes';
import * as Next from '../../src/next/types/ConectorTypes';

/**
 * Since `ConnectorGrafxRegistration` uses `RemoteConnectorId` instead of `url` on the engine side,
 * we extract that `id` from the source `url` to avoid any breaking changes
 * **/
export const manipulateConnectorRegistrationSource = (
    registration: ConnectorRegistration | Next.ConnectorGrafxRegistration,
): ConnectorRegistration | Next.ConnectorGrafxRegistration => {
    if (registration.source != ConnectorRegistrationSource.grafx) {
        return registration;
    }

    if (isAlreadyMigrated(registration)) {
        return registration;
    }

    const pathChunks = registration.url.split('/');
    // `RemoteConnectorId` is always the very last part of the URL
    const remoteConnectorId = pathChunks[pathChunks.length - 1];

    return { id: remoteConnectorId, source: ConnectorRegistrationSource.grafx };
};

const isAlreadyMigrated = (
    registration: ConnectorRegistration | Next.ConnectorGrafxRegistration,
): registration is Next.ConnectorGrafxRegistration => 'id' in registration;
