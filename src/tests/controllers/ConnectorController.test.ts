import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import { ConnectorController } from '../../controllers/ConnectorController';
import { ConnectorRegistrationSource } from '../../../types/ConnectorTypes';
import mockChild from '../__mocks__/MockEditorAPI';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.connector = new ConnectorController(mockChild);
    jest.spyOn(mockedSDK.connector, 'registerConnector');
    jest.spyOn(mockedSDK.connector, 'configure');
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

        await mockedSDK.connector.registerConnector(registration);
        expect(mockedSDK.editorAPI.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.registerConnector).toHaveBeenCalledWith(JSON.stringify(registration));

        await mockedSDK.connector.configure(connectorId, async (configurator) => { configurator.setChiliToken(connectorId, token); });
        expect(mockedSDK.editorAPI.connectorAuthenticationSetChiliToken).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetChiliToken).toHaveBeenCalledWith(connectorId, token);

        await mockedSDK.connector.configure(connectorId, async (configurator) => { configurator.setHttpHeader(connectorId, headerName, headerValue); });
        expect(mockedSDK.editorAPI.connectorAuthenticationSetHttpHeader).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetHttpHeader).toHaveBeenCalledWith(
            connectorId,
            headerName,
            headerValue,
        );

        // Future-proofing
        // const options = { 'hello': 'world' };
        // await mockedSDK.connector.configure(connectorId, async (configurator) => { configurator.setOptions(options); });
        // expect(mockedSDK.editorAPI.setConnectorOptions).toHaveBeenCalledTimes(1);
        // expect(mockedSDK.editorAPI.setConnectorOptions).toHaveBeenCalledWith(connectorId, options);

        // Future-proofing
        // const mappings = Array<ConnectorMapping>();
        // await mockedSDK.connector.configure(connectorId, async (configurator) => { configurator.setMappings(mappings); });
        // expect(mockedSDK.editorAPI.setConnectorOptions).toHaveBeenCalledTimes(1);
        // expect(mockedSDK.editorAPI.setConnectorOptions).toHaveBeenCalledWith(connectorId, mappings);
    });
});
