import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/MockEditorAPI';
import { ConfigurationController } from '../../controllers/ConfigurationController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.configuration = new ConfigurationController(mockChild);
    jest.spyOn(mockedSDK.configuration, 'setValue');
    jest.spyOn(mockedSDK.configuration, 'getValue');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('ConfigurationConnector methods', () => {
    it('Should call all of the configuration functions of child successfully', async () => {
        const configKey = 'dam';
        const configValue = 'm123';

        await mockedSDK.configuration.setValue(configKey, configValue);
        expect(mockedSDK.editorAPI.setConfigValue).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setConfigValue).toHaveBeenCalledWith(configKey, configValue);

        await mockedSDK.configuration.getValue(configKey);
        expect(mockedSDK.editorAPI.getConfigValue).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getConfigValue).toHaveBeenCalledWith(configKey);
    });
});
