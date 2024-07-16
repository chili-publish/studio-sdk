import { ConfigurationController } from '../../controllers/ConfigurationController';
import { EditorAPI } from '../../types/CommonTypes';
import { defaultStudioOptions, WellKnownConfigurationKeys } from '../../types/ConfigurationTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { LocalConfigurationDecorator } from '../../utils/LocalConfigurationDecorator';
import { mockLocalConfig } from '../__mocks__/localConfig';

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

describe('LocalConfigurationDecorator', () => {
    let mockedLocalConfigurationDecorator: LocalConfigurationDecorator;

    beforeEach(() => {
        jest.spyOn(mockedConfigurationController, 'getValue');
        jest.spyOn(mockedConfigurationController, 'setValue');
        jest.spyOn(mockedConfigurationController, 'getEngineSessionId');
        jest.spyOn(mockedConfigurationController, 'updateStudioOptions');

        mockedLocalConfigurationDecorator = new LocalConfigurationDecorator(
            mockedConfigurationController,
            mockLocalConfig,
        );
    });

    it('it gets value from local config if available', async () => {
        const res = await mockedLocalConfigurationDecorator.getValue(
            WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl,
        );
        expect(res.parsedData).toBe(mockLocalConfig.get(WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl));
        expect(mockedConfigurationController.getValue).toBeCalledTimes(0);
    });

    it('it redirects getValue request to configurationController if value is not available in local config', async () => {
        const res = await mockedLocalConfigurationDecorator.getValue('random-non-existing-key');
        expect(res.parsedData).toBe(null);
        expect(mockedConfigurationController.getValue).toBeCalledTimes(1);
    });

    it('it sets the value to local config and then redirects to configurationController', async () => {
        const key = 'hello';
        const value = 'there';

        await mockedLocalConfigurationDecorator.setValue(key, value);
        expect(mockLocalConfig.get(key)).toBe(value);
        expect(mockedConfigurationController.setValue).toBeCalledTimes(1);
    });

    it('simply redirects getEngineSessionId request', async () => {
        await mockedLocalConfigurationDecorator.getEngineSessionId();
        expect(mockedConfigurationController.getEngineSessionId).toHaveBeenCalledTimes(1);
    });

    it('simply redirects updateStudioOptions request', async () => {
        await mockedLocalConfigurationDecorator.updateStudioOptions(defaultStudioOptions);
        expect(mockedConfigurationController.updateStudioOptions).toHaveBeenCalledTimes(1);
        expect(mockedConfigurationController.updateStudioOptions).toHaveBeenCalledWith(defaultStudioOptions);
    });
});
