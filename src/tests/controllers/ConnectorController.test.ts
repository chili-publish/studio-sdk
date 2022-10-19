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

        await mockedSDK.connector.registerConnector(registration);
        expect(mockedSDK.editorAPI.mediaConnectorRegisterConnector).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorRegisterConnector).toHaveBeenCalledWith(JSON.stringify(registration));
    });
});
