import { ConfigurationController } from '../../controllers/ConfigurationController';
import { EditorAPI } from '../../types/CommonTypes';
import { defaultStudioOptions } from '../../types/ConfigurationTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedConfigurationController: ConfigurationController;

const mockEditorApi: EditorAPI = {
    setConfigValue: async () => getEditorResponseData(castToEditorResponse(null)),
    getConfigValue: async () => getEditorResponseData(castToEditorResponse(null)),
    getEngineSessionId: async () => getEditorResponseData(castToEditorResponse(null)),
    updateStudioOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedConfigurationController = new ConfigurationController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'setConfigValue');
    jest.spyOn(mockEditorApi, 'getConfigValue');
    jest.spyOn(mockEditorApi, 'getEngineSessionId');
    jest.spyOn(mockEditorApi, 'updateStudioOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ConfigurationController', () => {
    const configKey = 'dam';
    const configValue = 'm123';
    it('Should call the setValue method', async () => {
        await mockedConfigurationController.setValue(configKey, configValue);
        expect(mockEditorApi.setConfigValue).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setConfigValue).toHaveBeenCalledWith(configKey, configValue);
    });
    it('Should call the getValue method', async () => {
        await mockedConfigurationController.getValue(configKey);
        expect(mockEditorApi.getConfigValue).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConfigValue).toHaveBeenCalledWith(configKey);
    });
    it('Should call the getEngineSessionId method', async () => {
        await mockedConfigurationController.getEngineSessionId();
        expect(mockEditorApi.getEngineSessionId).toHaveBeenCalledTimes(1);
    });
    it('Should call the setStudioOptions method', async () => {
        const options = defaultStudioOptions;
        await mockedConfigurationController.updateStudioOptions(options);
        expect(mockEditorApi.updateStudioOptions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateStudioOptions).toHaveBeenCalledWith(JSON.stringify(options));
    });
});
