import { UtilsController } from '../../controllers/UtilsController';
import { WellKnownConfigurationKeys } from '../../types/ConfigurationTypes';
import { UploadAssetValidationError, UploadAssetValidationErrorType } from '../../types/ConnectorTypes';
import { EnvironmentType } from '../../utils/Enums';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse } from '../../utils/EditorResponseData';
import * as MathUtils from '../../utils/MathUtils';
import { MeasurementUnit } from '../../index';

let mockedUtilsController: UtilsController;

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockedEditorApi: EditorAPI = {
    unitEvaluate: jest.fn().mockResolvedValue(castToEditorResponse(null)),
};

const mockedLocalConfig = new Map<string, string>();
beforeEach(() => {
    jest.spyOn(MathUtils, 'round');
    mockedLocalConfig.set(WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl, 'ENVIRONMENT_API/');
    mockedLocalConfig.set(WellKnownConfigurationKeys.GraFxStudioAuthToken, 'GRAFX_AUTH_TOKEN');
    mockedUtilsController = new UtilsController(mockedEditorApi, mockedLocalConfig);
});

afterEach(() => {
    jest.restoreAllMocks();
    mockFetch.mockClear();
});
describe('UtilsController', () => {
    it('Makes round operation', async () => {
        const calc = await mockedUtilsController.round(15.123, 3);
        expect(calc.parsedData).toEqual(15.123);
        expect(MathUtils.round).toHaveBeenCalledWith(15.123, 3);
    });

    it('Makes correct environmentAPI urls', async () => {
        let calculatedUrl = await mockedUtilsController.createEnvironmentBaseURL({
            type: EnvironmentType.SANDBOX,
            environment: 'ft-nostress',
            version: '1',
        });
        expect(calculatedUrl).toBe(
            'https://ft-nostress.chili-publish-sandbox.online/grafx/api/v1/environment/ft-nostress',
        );
        calculatedUrl = await mockedUtilsController.createEnvironmentBaseURL({
            type: EnvironmentType.PRODUCTION,
            environment: 'ft-nocool',
            version: '7',
        });
        expect(calculatedUrl).toBe('https://ft-nocool.chili-publish.online/grafx/api/v7/environment/ft-nocool');
        calculatedUrl = await mockedUtilsController.createEnvironmentBaseURL({
            type: EnvironmentType.PRODUCTION,
            environment: 'ft-nocool',
            version: '7',
        });
    });

    const connectorId = 'dam';
    it('Should call the stageFiles method with a file', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                filePointers: [{ id: '123', name: 'test.jpg', type: 'image/jpeg' }],
            }),
        });
        await mockedUtilsController.stageFiles(
            [new File(['test'], 'test.jpg', { type: 'image/jpeg' })],
            connectorId,
            {},
        );
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            'ENVIRONMENT_API/connectors/dam/stage',
            expect.objectContaining({
                method: 'POST',
                body: expect.any(FormData),
                headers: {
                    Authorization: 'Bearer GRAFX_AUTH_TOKEN',
                },
            }),
        );
    });
    it('should call the stageFiles method with a blob', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                filePointers: [{ id: '123', name: 'test.jpg', type: 'image/jpeg' }],
            }),
        });
        await mockedUtilsController.stageFiles([new Blob(['test'], { type: 'image/jpeg' })], connectorId, {});
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            'ENVIRONMENT_API/connectors/dam/stage',
            expect.objectContaining({
                method: 'POST',
                body: expect.any(FormData),
                headers: {
                    Authorization: 'Bearer GRAFX_AUTH_TOKEN',
                },
            }),
        );
    });
    it('Should throw an "UploadAssetValidationError" exception when file is too small', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 422,
            json: async () => ({
                message: 'File is too small',
            }),
        });
        await expect(
            mockedUtilsController.stageFiles([new File(['test'], 'test.jpg', { type: 'image/jpeg' })], connectorId, {}),
        ).rejects.toThrow(
            new UploadAssetValidationError('File is too small', UploadAssetValidationErrorType.minDimension),
        );
    });
    it('should throw when stageFiles is called without auth token  ', async () => {
        mockedLocalConfig.delete(WellKnownConfigurationKeys.GraFxStudioAuthToken);
        await expect(
            mockedUtilsController.stageFiles([new File(['test'], 'test.jpg', { type: 'image/jpeg' })], connectorId, {}),
        ).rejects.toThrow('GraFx Studio Auth Token is not set');
    });
    it('should throw when stageFiles is called without environment api url', async () => {
        mockedLocalConfig.delete(WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl);
        await expect(
            mockedUtilsController.stageFiles([new File(['test'], 'test.jpg', { type: 'image/jpeg' })], connectorId, {}),
        ).rejects.toThrow('GraFx Studio Environment API URL is not set');
    });

    it('evaluates unit expression with conversion unit', async () => {
        await mockedUtilsController.unitEvaluate('10cm', MeasurementUnit.px);

        expect(mockedEditorApi.unitEvaluate).toHaveBeenCalledWith('10cm', MeasurementUnit.px);
    });

    it('evaluates unit expression without conversion unit', async () => {
        await mockedUtilsController.unitEvaluate('10px');

        expect(mockedEditorApi.unitEvaluate).toHaveBeenCalledWith('10px', undefined);
    });
});
