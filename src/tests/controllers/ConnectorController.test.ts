import { ConnectorController } from '../../controllers/ConnectorController';
import {
    ConnectorMapping,
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
    connectorAuthenticationSetChiliToken: async () => getEditorResponseData(castToEditorResponse(null)),
    updateConnectorConfiguration: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectorState: async () => getEditorResponseData(castToEditorResponse(null)),
    connectorAuthenticationSetHttpHeader: async () => getEditorResponseData(castToEditorResponse(null)),
    setConnectorOptions: async () => getEditorResponseData(castToEditorResponse(null)),
    setConnectorMappings: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedConnectorController = new ConnectorController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getConnectorById');
    jest.spyOn(mockEditorApi, 'getConnectors');
    jest.spyOn(mockEditorApi, 'registerConnector');
    jest.spyOn(mockEditorApi, 'unregisterConnector');
    jest.spyOn(mockEditorApi, 'connectorAuthenticationSetChiliToken');
    jest.spyOn(mockEditorApi, 'updateConnectorConfiguration');
    jest.spyOn(mockEditorApi, 'getConnectorState');
    jest.spyOn(mockEditorApi, 'connectorAuthenticationSetHttpHeader');
    jest.spyOn(mockEditorApi, 'setConnectorOptions');
    jest.spyOn(mockEditorApi, 'setConnectorMappings');
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
    const token = 'myToken';
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

    it('Should call the getAllByType method', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to retrieve all connectors of a certain type', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledWith(ConnectorType.media);
    });

    it('Should call the getStateById method', async () => {
        await mockedConnectorController.getStateById(connectorId);
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

    it('Should be possible to configure a connector', async () => {
        await mockedConnectorController.configure(connectorId, async (configurator) => {
            configurator.setHttpHeader(headerName, headerValue);
            configurator.setMappings([
                new ConnectorMapping('data', ConnectorMappingSource.variable, 'Var 1'),
                new ConnectorMapping('plain', ConnectorMappingSource.value, 'plain value'),
            ]);
            configurator.setOptions({ test: 'data' });
            configurator.setChiliToken(token);
        });

        expect(mockEditorApi.connectorAuthenticationSetChiliToken).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.connectorAuthenticationSetChiliToken).toHaveBeenCalledWith(connectorId, token);
        expect(mockEditorApi.updateConnectorConfiguration).toHaveBeenCalledTimes(1);

        expect(mockEditorApi.connectorAuthenticationSetHttpHeader).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.connectorAuthenticationSetHttpHeader).toHaveBeenCalledWith(
            connectorId,
            headerName,
            headerValue,
        );

        expect(mockEditorApi.setConnectorMappings).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConnectorMappings).toHaveBeenCalledWith(connectorId, [
            JSON.stringify({ name: 'data', value: 'var.Var 1' }),
            JSON.stringify({ name: 'plain', value: 'plain value' }),
        ]);

        expect(mockEditorApi.setConnectorOptions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConnectorOptions).toHaveBeenCalledWith(connectorId, JSON.stringify({ test: 'data' }));
    });
});
