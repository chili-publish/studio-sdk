import { CanvasController } from '../../controllers/CanvasController';
import { EditorAPI } from '../../types/CommonTypes';
import { ViewMode } from '../../types/ViewModeTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedCanvasController: CanvasController;

const mockEditorApi: EditorAPI = {
    zoomToPage: async () => getEditorResponseData(castToEditorResponse(null)),
    getZoomPercentage: async () => getEditorResponseData(castToEditorResponse(null)),
    setZoomPercentage: async () => getEditorResponseData(castToEditorResponse(null)),
    setViewMode: async () => getEditorResponseData(castToEditorResponse(null)),
};
beforeEach(() => {
    mockedCanvasController = new CanvasController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'zoomToPage');
    jest.spyOn(mockEditorApi, 'getZoomPercentage');
    jest.spyOn(mockEditorApi, 'setZoomPercentage');
    jest.spyOn(mockEditorApi, 'setViewMode');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('CanvasController', () => {
    it('should call zoomToPage function of EditorAPI with no params provided', async () => {
        await mockedCanvasController.zoomToPage();
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledTimes(1);

        await mockedCanvasController.zoomToPage(null, null, null, null, null);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledWith(null, null, null, null, null);
    });

    it('should call zoomToPage function of EditorAPI with params included', async () => {
        await mockedCanvasController.zoomToPage('0', 300, 0, 700, 400);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledTimes(3);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledWith('0', 300, 0, 700, 400);
    });

    it('should call getZoomPercentage function of EditorAPI', async () => {
        await mockedCanvasController.getZoomPercentage();
        expect(mockEditorApi.getZoomPercentage).toHaveBeenCalledTimes(1);
    });

    it('should call setZoomPercentage function of EditorAPI', async () => {
        await mockedCanvasController.setZoomPercentage(50);
        expect(mockEditorApi.setZoomPercentage).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setZoomPercentage).toHaveBeenCalledWith(50);
    });

    it('should call set function of EditorAPI', async () => {
        await mockedCanvasController.setViewMode(ViewMode.normal);
        expect(mockEditorApi.setViewMode).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setViewMode).toHaveBeenCalledWith(ViewMode.normal);
    });
});
