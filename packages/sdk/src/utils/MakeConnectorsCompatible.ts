import { ConnectorInstance, ConnectorRegistration, ConnectorRegistrationSource } from '../types/ConnectorTypes';
import * as Next from '../../src/next/types/ConectorTypes';

/**
 * Since `ConnectorGrafxRegistration` uses `RemoteConnectorId` instead of `url` on the engine side,
 * we extract that `id` from the source `url`
 * **/
const makeConnectorSourceForwardsCompatible = (
    registration: ConnectorRegistration | Next.ConnectorGrafxRegistration,
): ConnectorRegistration | Next.ConnectorGrafxRegistration => {
    if (registration.source != ConnectorRegistrationSource.grafx) {
        return registration;
    }

    if (isMigrated(registration)) {
        return registration;
    }

    const pathChunks = registration.url.split('/');
    // `RemoteConnectorId` is always the very last part of the URL
    const remoteConnectorId = pathChunks[pathChunks.length - 1];

    return { id: remoteConnectorId, source: ConnectorRegistrationSource.grafx };
};

/**
 * Since `ConnectorGrafxRegistration` uses `RemoteConnectorId` instead of `url` on the engine side,
 * we generate that `url` from the `baseUrl` and `id`
 * **/
const makeConnectorSourceBackwardsCompatible = (
    connector: ConnectorRegistration | Next.ConnectorGrafxRegistration,
    baseUrl: string | undefined,
): ConnectorRegistration => {
    if (!isMigrated(connector)) {
        return connector;
    }

    let url = baseUrl;

    while (url?.endsWith('/')) {
        url = url.substring(0, url.length - 1);
    }

    return {
        url: `${url}/connectors/${connector.id}`,
        source: ConnectorRegistrationSource.grafx,
    };
};

const isMigrated = (
    registration: ConnectorRegistration | Next.ConnectorGrafxRegistration,
): registration is Next.ConnectorGrafxRegistration => 'id' in registration;

const makeConnectorsBackwardsCompatible = (
    connectors: ConnectorInstance[] | Next.ConnectorInstance[],
    baseUrl: string | undefined,
): ConnectorInstance[] => {
    return connectors.map((connector) => {
        return makeConnectorBackwardsCompatible(connector, baseUrl);
    });
};

const makeConnectorBackwardsCompatible = (
    connector: ConnectorInstance | Next.ConnectorInstance,
    baseUrl: string | undefined,
): ConnectorInstance => {
    if (connector.source.source != ConnectorRegistrationSource.grafx) {
        return connector as ConnectorInstance;
    }

    return {
        id: connector.id,
        name: connector.name,
        iconUrl: connector.iconUrl,
        source: makeConnectorSourceBackwardsCompatible(connector.source, baseUrl),
    };
};

export { makeConnectorsBackwardsCompatible, makeConnectorBackwardsCompatible, makeConnectorSourceForwardsCompatible };
