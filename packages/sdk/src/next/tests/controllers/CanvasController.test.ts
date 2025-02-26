import { EditorAPI } from '../../../types/CommonTypes';

import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import { CanvasController } from '../../controllers/CanvasController';

let mockedCanvasController: CanvasController;

const mockEditorApi: EditorAPI = {
    zoomToPage: async () => getEditorResponseData(castToEditorResponse(null)),
};
beforeEach(() => {
    mockedCanvasController = new CanvasController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'zoomToPage');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('CanvasController', () => {
    it('should call zoomToPage function of EditorAPI with no params provided', async () => {
        await mockedCanvasController.zoomToPage();
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledTimes(1);

        await mockedCanvasController.zoomToPage(null, null, null, null);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledWith(null, null, null, null);
    });

    it('should call zoomToPage function of EditorAPI with params included', async () => {
        await mockedCanvasController.zoomToPage(300, 0, 700, 400);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledTimes(3);
        expect(mockEditorApi.zoomToPage).toHaveBeenCalledWith(300, 0, 700, 400);
    });
});
