import {
    ConnectorGrafxRegistration,
    ConnectorInstance,
    ConnectorRegistration,
    ConnectorRegistrationSource,
} from '../types/ConnectorTypes';
import * as Next from '../next/types/ConnectorTypes';

export class ConnectorCompatibilityTools {
    /**
     * Since `ConnectorGrafxRegistration` uses `RemoteConnectorId` instead of `url` on the engine side,
     * we extract that `id` from the source `url`
     * **/
    makeConnectorSourceForwardsCompatible = (
        registration: ConnectorRegistration | Next.ConnectorGrafxRegistration,
    ): ConnectorRegistration | Next.ConnectorGrafxRegistration => {
        if (registration.source != ConnectorRegistrationSource.grafx) {
            return registration;
        }

        if (this.isSourceMigrated(registration)) {
            return registration;
        }

        const pathChunks = registration.url.split('/');
        // `RemoteConnectorId` is always the very last part of the URL
        const remoteConnectorId = pathChunks[pathChunks.length - 1];

        return { id: remoteConnectorId, source: ConnectorRegistrationSource.grafx };
    };

    makeConnectorsBackwardsCompatible = (
        connectors: (ConnectorInstance | Next.ConnectorInstance)[],
        baseUrl: string | undefined,
    ): ConnectorInstance[] => connectors.map((connector) => this.makeConnectorBackwardsCompatible(connector, baseUrl));

    makeConnectorBackwardsCompatible = (
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
            source: this.makeConnectorSourceBackwardsCompatible(connector.source, baseUrl),
        };
    };

    /**
     * Since `ConnectorGrafxRegistration` uses `RemoteConnectorId` instead of `url` on the engine side,
     * we generate that `url` from the `baseUrl` and `id`
     * **/
    makeConnectorSourceBackwardsCompatible = (
        connector: ConnectorGrafxRegistration | Next.ConnectorGrafxRegistration,
        baseUrl: string | undefined,
    ): ConnectorRegistration => {
        if (!this.isSourceMigrated(connector)) {
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

    // Helps to promote a correct type
    private isSourceMigrated = (
        registration: ConnectorRegistration | Next.ConnectorGrafxRegistration,
    ): registration is Next.ConnectorGrafxRegistration => 'id' in registration;
}
