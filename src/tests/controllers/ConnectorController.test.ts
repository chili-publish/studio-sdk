import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import { ConnectorController } from '../../controllers/ConnectorController';
import { ConnectorMapping, ConnectorMappingSource, ConnectorMappingTarget, ConnectorRegistrationSource } from '../../../types/ConnectorTypes';
import mockChild from '../__mocks__/MockEditorAPI';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.connector = new ConnectorController(mockChild);
    jest.spyOn(mockedSDK.connector, 'registerConnector');
    jest.spyOn(mockedSDK.connector, 'configure');
    jest.spyOn(mockedSDK.connector, 'getState');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Connector methods', () => {
    it('Should call all of the connector functions of child successfully', async () => {
        const registration = {
            id: '',
            source: ConnectorRegistrationSource.url,
            url: '',
        };
        const connectorId = 'dam';
        const token = 'myToken';
        const headerName = 'headerName';
        const headerValue = 'headerValue';

        await mockedSDK.connector.getState(connectorId);
        expect(mockedSDK.editorAPI.getConnectorState).toHaveBeenCalledTimes(1);

        await mockedSDK.connector.registerConnector(registration);
        expect(mockedSDK.editorAPI.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.registerConnector).toHaveBeenCalledWith(JSON.stringify(registration));

        await mockedSDK.connector.configure(connectorId, async (configurator) => {
            configurator.setHttpHeader(headerName, headerValue);
            configurator.setMappings([new ConnectorMapping(ConnectorMappingTarget.download, "data", ConnectorMappingSource.variable, "Var 1")])
            configurator.setOptions({'test':'data'});
            configurator.setChiliToken(token);
        });

        expect(mockedSDK.editorAPI.connectorAuthenticationSetChiliToken).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetChiliToken).toHaveBeenCalledWith(connectorId, token);
        expect(mockedSDK.editorAPI.updateConnectorConfiguration).toHaveBeenCalledTimes(1);
        
        expect(mockedSDK.editorAPI.connectorAuthenticationSetHttpHeader).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetHttpHeader).toHaveBeenCalledWith(
            connectorId,
            headerName,
            headerValue,
        );

        expect(mockedSDK.editorAPI.setConnectorMappings).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setConnectorMappings).toHaveBeenCalledWith(connectorId, [JSON.stringify({name:'download.data', value:'var.Var 1'})]);
        
        expect(mockedSDK.editorAPI.setConnectorOptions).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setConnectorOptions).toHaveBeenCalledWith(connectorId, JSON.stringify({'test':'data'}));        
    });
});
