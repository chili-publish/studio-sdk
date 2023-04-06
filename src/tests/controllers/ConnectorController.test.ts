import { ConnectorController } from '../../controllers/ConnectorController';
import {
    ConnectorMapping,
    ConnectorMappingSource,
    ConnectorMappingTarget,
    ConnectorRegistrationSource,
} from '../../types/ConnectorTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedConnectorController: ConnectorController;

const mockEditorApi: EditorAPI = {
    registerConnector: async () => getEditorResponseData(castToEditorResponse(null)),
    connectorAuthenticationSetChiliToken: async () => getEditorResponseData(castToEditorResponse(null)),
    updateConnectorConfiguration: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectorState: async () => getEditorResponseData(castToEditorResponse(null)),
    connectorAuthenticationSetHttpHeader: async () => getEditorResponseData(castToEditorResponse(null)),
    setConnectorOptions: async () => getEditorResponseData(castToEditorResponse(null)),
    setConnectorMappings: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedConnectorController = new ConnectorController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'registerConnector');
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
    const registration = {
        id: '',
        source: ConnectorRegistrationSource.url,
        url: '',
    };
    const connectorId = 'dam';
    const token = 'myToken';
    const headerName = 'headerName';
    const headerValue = 'headerValue';
    it('Should call the getState method', async () => {
        await mockedConnectorController.getState(connectorId);
        expect(mockEditorApi.getConnectorState).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to register a connector', async () => {
        await mockedConnectorController.registerConnector(registration);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(registration));
    });
    it('Should be possible to configure a connector', async () => {
        await mockedConnectorController.configure(connectorId, async (configurator) => {
            configurator.setHttpHeader(headerName, headerValue);
            configurator.setMappings([
                new ConnectorMapping(ConnectorMappingTarget.download, 'data', ConnectorMappingSource.variable, 'Var 1'),
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
            JSON.stringify({ name: 'download.data', value: 'var.Var 1' }),
        ]);

        expect(mockEditorApi.setConnectorOptions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConnectorOptions).toHaveBeenCalledWith(connectorId, JSON.stringify({ test: 'data' }));
    });
});
