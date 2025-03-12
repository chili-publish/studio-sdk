import { EditorAPI } from '../../types/CommonTypes';
import { defaultStudioOptions, WellKnownConfigurationKeys } from '../../types/ConfigurationTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { LocalConfigurationDecorator } from '../../utils/LocalConfigurationDecorator';
import { mockLocalConfig } from '../__mocks__/localConfig';

const mockEditorApi: EditorAPI = {
    setConfigValue: async () => getEditorResponseData(castToEditorResponse(null)),
    getConfigValue: async () => getEditorResponseData(castToEditorResponse(null)),
    getEngineSessionId: async () => getEditorResponseData(castToEditorResponse(null)),
    updateStudioOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    jest.spyOn(mockEditorApi, 'setConfigValue');
    jest.spyOn(mockEditorApi, 'getConfigValue');
    jest.spyOn(mockEditorApi, 'getEngineSessionId');
    jest.spyOn(mockEditorApi, 'updateStudioOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('LocalConfigurationDecorator', () => {
    let mockedLocalConfigurationDecorator: LocalConfigurationDecorator;

    beforeEach(() => {
        mockedLocalConfigurationDecorator = new LocalConfigurationDecorator(Promise.resolve(mockEditorApi), mockLocalConfig);
    });

    it('it gets value from the local config if available', async () => {
        const res = await mockedLocalConfigurationDecorator.getValue(
            WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl,
        );
        expect(res.parsedData).toBe(mockLocalConfig.get(WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl));
        expect(mockEditorApi.getConfigValue).toBeCalledTimes(0);
    });

    it('it redirects to editorApi if value is not available in local config', async () => {
        const res = await mockedLocalConfigurationDecorator.getValue('random-non-existing-key');
        expect(res.parsedData).toBe(null);
        expect(mockEditorApi.getConfigValue).toBeCalledTimes(1);
    });

    it('redirects to EditorApi and sets the value to local config', async () => {
        const key = 'hello';
        const value = 'there';

        await mockedLocalConfigurationDecorator.setValue(key, value);
        expect(mockEditorApi.setConfigValue).toBeCalledTimes(1);
        expect(mockLocalConfig.get(key)).toBe(value);
    });

    it('simply redirects getEngineSessionId request to EditorApi', async () => {
        await mockedLocalConfigurationDecorator.getEngineSessionId();
        expect(mockEditorApi.getEngineSessionId).toHaveBeenCalledTimes(1);
    });

    it('simply redirects updateStudioOptions request to EditorApi', async () => {
        await mockedLocalConfigurationDecorator.updateStudioOptions(defaultStudioOptions);
        expect(mockEditorApi.updateStudioOptions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateStudioOptions).toHaveBeenCalledWith(JSON.stringify(defaultStudioOptions));
    });
});
