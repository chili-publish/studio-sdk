import { ConnectorController } from '../../controllers/ConnectorController';

import { EditorAPI } from '../../../types/CommonTypes';

import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import {
    ConnectorGrafxRegistration,
    ConnectorLocalRegistration,
    ConnectorRegistrationSource,
    ConnectorType,
    ConnectorUrlRegistration,
} from '../../types/ConnectorTypes';
import { ConnectorMappingDirection } from '../../../types/ConnectorTypes';

let mockedConnectorController: ConnectorController;

const mockEditorApi: EditorAPI = {
    getConnectorById: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectors: async () => getEditorResponseData(castToEditorResponse(null)),
    registerConnector: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectorState: async () => getEditorResponseData(castToEditorResponse({ id: '', type: 'ready' })),
    getConnectorMappings: async () =>
        getEditorResponseData(
            castToEditorResponse([
                {
                    name: 'hasDiscount',
                    value: false,
                    direction: ConnectorMappingDirection.engineToConnector,
                },
            ]),
        ),
    setConnectorMappings: async () => getEditorResponseData(castToEditorResponse(null)),
    updateConnectorConfiguration: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedConnectorController = new ConnectorController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getConnectorById');
    jest.spyOn(mockEditorApi, 'getConnectors');
    jest.spyOn(mockEditorApi, 'registerConnector');
    jest.spyOn(mockEditorApi, 'getConnectorState');
    jest.spyOn(mockEditorApi, 'getConnectorMappings');
    jest.spyOn(mockEditorApi, 'setConnectorMappings');
    jest.spyOn(mockEditorApi, 'updateConnectorConfiguration');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Next.ConnectorController', () => {
    const connectorId = 'dam';

    it('Should call the getById method', async () => {
        await mockedConnectorController.getById(connectorId);
        expect(mockEditorApi.getConnectorById).toHaveBeenCalledTimes(1);
    });

    it('Should call the getAllByType method', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to retrieve all connectors of a certain type', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledWith(ConnectorType.media);
    });

    it('Should be possible to register a url connector', async () => {
        const nonGrafxRegistration: ConnectorUrlRegistration = {
            url: 'https://mock.url/',
            source: ConnectorRegistrationSource.url,
        };

        await mockedConnectorController.register(nonGrafxRegistration);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(nonGrafxRegistration));
    });

    it('Should be possible to register a local connector', async () => {
        const nonGrafxRegistration: ConnectorLocalRegistration = {
            url: './local.test',
            source: ConnectorRegistrationSource.local,
        };

        await mockedConnectorController.register(nonGrafxRegistration);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(nonGrafxRegistration));
    });

    it('Should be possible to register a grafx connector', async () => {
        const grafxRegistration: ConnectorGrafxRegistration = {
            id: 'grafx-id',
            source: ConnectorRegistrationSource.grafx,
        };

        await mockedConnectorController.register(grafxRegistration);

        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(grafxRegistration));
    });

    it('Should be possible to set connector mappings', async () => {
        await mockedConnectorController.setMappings(connectorId, [
            {
                key: 'data',
                variable: 'var.6B29FC40-CA47-1067-B31D-00DD010662DA',
            },
            {
                key: 'price',
                variable: 'var.6B29FC40-CA47-1067-B31D-00DD010662CC',
            },
        ]);

        expect(mockEditorApi.updateConnectorConfiguration).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConnectorMappings).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConnectorMappings).toHaveBeenCalledWith(connectorId, [
            JSON.stringify({
                name: 'hasDiscount',
                value: false,
                direction: ConnectorMappingDirection.engineToConnector,
            }),
            JSON.stringify({
                name: 'data',
                value: 'var.6B29FC40-CA47-1067-B31D-00DD010662DA',
                direction: ConnectorMappingDirection.connectorToEngine,
            }),
            JSON.stringify({
                name: 'price',
                value: 'var.6B29FC40-CA47-1067-B31D-00DD010662CC',
                direction: ConnectorMappingDirection.connectorToEngine,
            }),
        ]);
    });
});
