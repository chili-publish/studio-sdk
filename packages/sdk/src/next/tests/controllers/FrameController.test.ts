import { EditorAPI } from '../../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import { FrameController } from '../../controllers/FrameController';

let mockedFrameController: FrameController;

const mockEditorApi: EditorAPI = {
    exitCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
    cancelCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
    exitSubjectMode: async () => getEditorResponseData(castToEditorResponse(null)),
    cancelSubjectMode: async () => getEditorResponseData(castToEditorResponse(null)),
    exitGradientMode: async () => getEditorResponseData(castToEditorResponse(null)),
    cancelGradientMode: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFrameController = new FrameController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'exitCropMode');
    jest.spyOn(mockEditorApi, 'cancelCropMode');
    jest.spyOn(mockEditorApi, 'exitSubjectMode');
    jest.spyOn(mockEditorApi, 'cancelSubjectMode');
    jest.spyOn(mockEditorApi, 'exitGradientMode');
    jest.spyOn(mockEditorApi, 'cancelGradientMode');
});

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Next.FrameController', () => {
    it('Should be possible to exit cropping mode and save the applied crop', async () => {
        await mockedFrameController.exitCropMode();
        expect(mockEditorApi.exitCropMode).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.cancelCropMode).not.toHaveBeenCalled();
    });

    it('Should be possible to exit subject mode and save the applied subject area', async () => {
        await mockedFrameController.exitSubjectMode();
        expect(mockEditorApi.exitSubjectMode).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.cancelSubjectMode).not.toHaveBeenCalled();
    });

    it('Should be possible to exit gradient mode and save the applied gradient', async () => {
        await mockedFrameController.exitGradientMode();
        expect(mockEditorApi.exitGradientMode).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.cancelGradientMode).not.toHaveBeenCalled();
    });
});
