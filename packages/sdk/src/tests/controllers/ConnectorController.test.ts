import { ConnectorController } from '../../controllers/ConnectorController';
import {
    ConnectorMapping,
    ConnectorMappingDirection,
    ConnectorMappingSource,
    ConnectorRegistration,
    ConnectorRegistrationSource,
    ConnectorType,
} from '../../types/ConnectorTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedConnectorController: ConnectorController;

const mockEditorApi: EditorAPI = {
    getConnectorById: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectors: async () => getEditorResponseData(castToEditorResponse(null)),
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
    mockedConnectorController = new ConnectorController(mockEditorApi);
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
    const registration: ConnectorRegistration = {
        source: ConnectorRegistrationSource.url,
        url: '',
    };
    const connectorId = 'dam';
    const headerName = 'headerName';
    const headerValue = 'headerValue';

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

    it('Should call the getState method', async () => {
        await mockedConnectorController.getState(connectorId);
        expect(mockEditorApi.getConnectorState).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to register a connector', async () => {
        await mockedConnectorController.register(registration);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(registration));
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
