import { ConnectorController } from '../../controllers/ConnectorController';
import * as Next from '../../next/types/ConnectorTypes';
import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import {
    ConnectorInstance,
    ConnectorMapping,
    ConnectorMappingDirection,
    ConnectorMappingSource,
    ConnectorRegistration,
    ConnectorRegistrationSource,
    ConnectorToEngineMapping,
    ConnectorType,
    EngineToConnectorMapping,
} from '../../types/ConnectorTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import mockConfig from '../__mocks__/config';

let mockedConnectorController: ConnectorController;

const grafxSourceId = 'grafx-id';
const baseUrl = 'https://mock.url';

const grafxSource: ConnectorRegistration = {
    source: ConnectorRegistrationSource.grafx,
    url: `${baseUrl}/connectors/${grafxSourceId}`,
};

const nextGrafxSource: Next.ConnectorGrafxRegistration = {
    source: ConnectorRegistrationSource.grafx,
    id: grafxSourceId,
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

const mockEditorApi: EditorAPI = {
    getConnectorById: async () => getEditorResponseData(castToEditorResponse(nextGrafxConnector)),
    getConnectors: async () => getEditorResponseData(castToEditorResponse([nextGrafxConnector])),
    registerConnector: async () => getEditorResponseData(castToEditorResponse(null)),
    unregisterConnector: async () => getEditorResponseData(castToEditorResponse(null)),
    updateConnectorConfiguration: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectorState: async () => getEditorResponseData(castToEditorResponse({ id: '', type: 'ready' })),
    connectorAuthenticationSetHttpHeader: async () => getEditorResponseData(castToEditorResponse(null)),
    setConnectorOptions: async () => getEditorResponseData(castToEditorResponse(null)),
    setConnectorMappings: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectorOptions: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectorMappings: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedConnectorController = new ConnectorController(mockEditorApi, mockConfig);
    jest.spyOn(mockEditorApi, 'getConnectorById');
    jest.spyOn(mockEditorApi, 'getConnectors');
    jest.spyOn(mockEditorApi, 'registerConnector');
    jest.spyOn(mockEditorApi, 'unregisterConnector');
    jest.spyOn(mockEditorApi, 'updateConnectorConfiguration');
    jest.spyOn(mockEditorApi, 'getConnectorState');
    jest.spyOn(mockEditorApi, 'connectorAuthenticationSetHttpHeader');
    jest.spyOn(mockEditorApi, 'setConnectorOptions');
    jest.spyOn(mockEditorApi, 'setConnectorMappings');
    jest.spyOn(mockEditorApi, 'getConnectorOptions');
    jest.spyOn(mockEditorApi, 'getConnectorMappings');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ConnectorController', () => {
    const connectorId = 'dam';
    const headerName = 'headerName';
    const headerValue = 'headerValue';

    it('Should call the getById method', async () => {
        await mockedConnectorController.getById(connectorId);
        expect(mockEditorApi.getConnectorById).toHaveBeenCalledTimes(1);
    });

    it('Makes sure getById returns an old connector instance', async () => {
        const res: EditorResponse<ConnectorInstance> = await mockedConnectorController.getById(connectorId);
        expect(res.parsedData).toMatchObject(grafxConnector);
    });

    it('Should call the getAllByType method', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
    });

    it('Makes sure getAllByType returns old connector instances', async () => {
        const res: EditorResponse<ConnectorInstance[]> = await mockedConnectorController.getAllByType(
            ConnectorType.media,
        );
        expect(res.parsedData).toMatchObject([grafxConnector]);
    });

    it('Should be possible to retrieve all connectors of a certain type', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledWith(ConnectorType.media);
    });

    it('Should call the getState method', async () => {
        await mockedConnectorController.getState(connectorId);
        expect(mockEditorApi.getConnectorState).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to register a non-grafx connector', async () => {
        const nonGrafxSource: ConnectorRegistration = {
            source: ConnectorRegistrationSource.url,
            url: baseUrl,
        };

        await mockedConnectorController.register(nonGrafxSource);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(nonGrafxSource));
    });

    it('Should be possible to register a grafx connector', async () => {
        const grafxRegistration: ConnectorRegistration = {
            source: ConnectorRegistrationSource.grafx,
            url: 'http://mock.url/grafx-id',
        };

        await mockedConnectorController.register(grafxRegistration);

        // MigratedConnectorGrafxRegistration type
        const expectedGrafxRegistration = {
            id: 'grafx-id',
            source: ConnectorRegistrationSource.grafx,
        };

        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(expectedGrafxRegistration));
    });

    it('Should be possible to unregister a connector', async () => {
        await mockedConnectorController.unregister(connectorId);
        expect(mockEditorApi.unregisterConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.unregisterConnector).toHaveBeenCalledWith(connectorId);
    });

    it('Should be possible to get connector options', async () => {
        await mockedConnectorController.getOptions(connectorId);
        expect(mockEditorApi.getConnectorOptions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectorOptions).toHaveBeenCalledWith(connectorId);
    });

    it('Should be possible to get connector mappings', async () => {
        await mockedConnectorController.getMappings(connectorId);
        expect(mockEditorApi.getConnectorMappings).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectorMappings).toHaveBeenCalledWith(connectorId);
    });

    it('Should be possible to get typed "EngineToConnector" connector mappings', async () => {
        (mockEditorApi.getConnectorMappings as jest.Mock).mockResolvedValueOnce({
            success: true,
            data: JSON.stringify([
                {
                    direction: ConnectorMappingDirection.connectorToEngine,
                },
                {
                    direction: ConnectorMappingDirection.engineToConnector,
                },
            ]),
        });
        const result: EditorResponse<EngineToConnectorMapping[]> = await mockedConnectorController.getMappings(
            connectorId,
            ConnectorMappingDirection.engineToConnector,
        );
        expect(mockEditorApi.getConnectorMappings).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectorMappings).toHaveBeenCalledWith(connectorId);
        expect(
            result.parsedData?.every((r) => r.direction === ConnectorMappingDirection.engineToConnector),
        ).toBeTruthy();
    });

    it('Should be possible to get typed "ConnectorToEngine" connector mappings', async () => {
        (mockEditorApi.getConnectorMappings as jest.Mock).mockResolvedValueOnce({
            success: true,
            data: JSON.stringify([
                {
                    direction: ConnectorMappingDirection.connectorToEngine,
                },
                {
                    direction: ConnectorMappingDirection.engineToConnector,
                },
            ]),
        });
        const result: EditorResponse<ConnectorToEngineMapping[]> = await mockedConnectorController.getMappings(
            connectorId,
            ConnectorMappingDirection.connectorToEngine,
        );
        expect(mockEditorApi.getConnectorMappings).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectorMappings).toHaveBeenCalledWith(connectorId);
        expect(
            result.parsedData?.every((r) => r.direction === ConnectorMappingDirection.connectorToEngine),
        ).toBeTruthy();
    });

    it('Should be possible to configure a connector', async () => {
        await mockedConnectorController.configure(connectorId, async (configurator) => {
            configurator.setHttpHeader(headerName, headerValue);
            configurator.setMappings([
                new ConnectorMapping('data', ConnectorMappingSource.variable, '6B29FC40-CA47-1067-B31D-00DD010662DA'),
                new ConnectorMapping('plain', ConnectorMappingSource.value, 'plain value'),
                new ConnectorMapping('switch', ConnectorMappingSource.value, true),
                new ConnectorMapping(
                    'price',
                    ConnectorMappingSource.variable,
                    '6B29FC40-CA47-1067-B31D-00DD010662DA',
                    ConnectorMappingDirection.connectorToEngine,
                ),
            ]);
            configurator.setOptions({ test: 'data' });
        });

        expect(mockEditorApi.updateConnectorConfiguration).toHaveBeenCalledTimes(1);

        expect(mockEditorApi.connectorAuthenticationSetHttpHeader).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.connectorAuthenticationSetHttpHeader).toHaveBeenCalledWith(
            connectorId,
            headerName,
            headerValue,
        );

        expect(mockEditorApi.setConnectorMappings).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConnectorMappings).toHaveBeenCalledWith(connectorId, [
            JSON.stringify({
                direction: 'engineToConnector',
                name: 'data',
                value: 'var.6B29FC40-CA47-1067-B31D-00DD010662DA',
            }),
            JSON.stringify({ direction: 'engineToConnector', name: 'plain', value: 'plain value' }),
            JSON.stringify({ direction: 'engineToConnector', name: 'switch', value: true }),
            JSON.stringify({
                direction: 'connectorToEngine',
                name: 'price',
                value: 'var.6B29FC40-CA47-1067-B31D-00DD010662DA',
            }),
        ]);

        expect(mockEditorApi.setConnectorOptions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConnectorOptions).toHaveBeenCalledWith(connectorId, JSON.stringify({ test: 'data' }));
    });
});
