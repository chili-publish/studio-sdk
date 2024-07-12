import { ConnectorCompatibilityTools } from '../../utils/ConnectorCompatibilityTools';
import { ConnectorInstance, ConnectorRegistration, ConnectorRegistrationSource } from '../../types/ConnectorTypes';
import * as Next from '../../next/types/ConnectorTypes';

let mockedConnectorCompatibilityTools: ConnectorCompatibilityTools;

beforeEach(() => {
    mockedConnectorCompatibilityTools = new ConnectorCompatibilityTools();
    jest.spyOn(mockedConnectorCompatibilityTools, 'makeConnectorSourceForwardsCompatible');
});

afterEach(() => {
    jest.restoreAllMocks();
});

const grafxSourceId = 'grafx-id';
const baseUrl = 'https://mock.url/';

const nonGrafxSource: ConnectorRegistration = {
    source: ConnectorRegistrationSource.url,
    url: baseUrl,
};

const grafxSource: ConnectorRegistration = {
    source: ConnectorRegistrationSource.grafx,
    url: `${baseUrl}connectors/${grafxSourceId}`,
};

const nextGrafxSource: Next.ConnectorGrafxRegistration = {
    source: ConnectorRegistrationSource.grafx,
    id: grafxSourceId,
};

const nonGrafxConnector: ConnectorInstance = {
    id: 'connector-id',
    name: 'connector.name',
    iconUrl: 'icon-url',
    source: nonGrafxSource,
};

const grafxConnector: ConnectorInstance = {
    id: 'connector-id',
    name: 'connector.name',
    iconUrl: 'icon-url',
    source: grafxSource,
};

const nextGrafxConnector: Next.ConnectorInstance = {
    id: 'connector-id',
    name: 'connector.name',
    iconUrl: 'icon-url',
    source: nextGrafxSource,
};

describe('ConnectorCompatibilityTools', () => {
    describe('makeConnectorSourceForwardsCompatible', () => {
        it('it returns non grafx source as it is', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeConnectorSourceForwardsCompatible(nonGrafxSource),
            ).toMatchObject(nonGrafxSource);
        });

        it('it returns next grafx source as it is', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeConnectorSourceForwardsCompatible(nextGrafxSource),
            ).toMatchObject(nextGrafxSource);
        });

        it('it migrates from old to next grafx source', async () => {
            expect(mockedConnectorCompatibilityTools.makeConnectorSourceForwardsCompatible(grafxSource)).toMatchObject(
                nextGrafxSource,
            );
        });
    });

    describe('makeConnectorSourceBackwardsCompatible', () => {
        it('it returns old grafx source as it is', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeConnectorSourceBackwardsCompatible(grafxSource, baseUrl),
            ).toMatchObject(grafxSource);
        });

        it('it migrates back from next grafx source to the old one', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeConnectorSourceBackwardsCompatible(nextGrafxSource, baseUrl),
            ).toMatchObject(grafxSource);
        });
    });

    describe('makeSingleConnectorBackwardsCompatible', () => {
        it('it returns non grafx connector as it is', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeSingleConnectorBackwardsCompatible(nonGrafxConnector, baseUrl),
            ).toMatchObject(nonGrafxConnector);
        });

        it('it returns old grafx connector as it is', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeSingleConnectorBackwardsCompatible(grafxConnector, baseUrl),
            ).toMatchObject(grafxConnector);
        });

        it('it migrates back from next grafx connector to the old one', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeSingleConnectorBackwardsCompatible(nextGrafxConnector, baseUrl),
            ).toMatchObject(grafxConnector);
        });
    });

    describe('makeMultipleConnectorsBackwardsCompatible', () => {
        it('it returns non grafx connector list as it is', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeMultipleConnectorsBackwardsCompatible(
                    [nonGrafxConnector],
                    baseUrl,
                ),
            ).toMatchObject([nonGrafxConnector]);
        });

        it('it returns old grafx connector list as it is', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeMultipleConnectorsBackwardsCompatible([grafxConnector], baseUrl),
            ).toMatchObject([grafxConnector]);
        });

        it('it migrates back from next grafx connector list to the old one', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeMultipleConnectorsBackwardsCompatible(
                    [nextGrafxConnector],
                    baseUrl,
                ),
            ).toMatchObject([grafxConnector]);
        });

        it('it migrate ONLY next grafx connectors', async () => {
            expect(
                mockedConnectorCompatibilityTools.makeMultipleConnectorsBackwardsCompatible(
                    [nonGrafxConnector, grafxConnector, nextGrafxConnector],
                    baseUrl,
                ),
            ).toMatchObject([nonGrafxConnector, grafxConnector, grafxConnector]);
        });
    });
});
