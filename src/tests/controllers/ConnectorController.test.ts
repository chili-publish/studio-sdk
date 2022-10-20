import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import { ConnectorController } from '../../controllers/ConnectorController';
import { ConnectorRegistrationSource } from '../../../types/ConnectorTypes';
import mockChild from '../__mocks__/MockEditorAPI';
import { ConnectorAuthenticationController } from '../../controllers/ConnectorAuthenticationController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.connector = new ConnectorController(mockChild);
    mockedSDK.connector.authentication = new ConnectorAuthenticationController(mockChild);
    jest.spyOn(mockedSDK.connector, 'registerConnector');
    jest.spyOn(mockedSDK.connector.authentication, 'setChiliToken');
    jest.spyOn(mockedSDK.connector.authentication, 'setHttpHeader');
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
        expect(mockedSDK.editorAPI.mediaConnectorRegisterConnector).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorRegisterConnector).toHaveBeenCalledWith(JSON.stringify(registration));

        await mockedSDK.connector.authentication.setChiliToken(connectorId, token);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetChiliToken).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetChiliToken).toHaveBeenCalledWith(connectorId, token);

        await mockedSDK.connector.authentication.setHttpHeader(connectorId, headerName, headerValue);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetHttpHeader).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.connectorAuthenticationSetHttpHeader).toHaveBeenCalledWith(
            connectorId,
            headerName,
            headerValue,
        );
    });
});
