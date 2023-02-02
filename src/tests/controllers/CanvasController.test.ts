import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/MockEditorAPI';
import { CanvasController } from '../../controllers/CanvasController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.canvas = new CanvasController(mockChild);

    jest.spyOn(mockedSDK.canvas, 'zoomToPage');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Should call all of the CanvasController functions of child successfully', () => {
    it('should call zoomToPage function of EditorAPI with no params provided', async () => {
        await mockedSDK.canvas.zoomToPage();
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledTimes(1);

        await mockedSDK.canvas.zoomToPage(null, null, null, null, null);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledWith(null, null, null, null, null);
    });

    it('should call zoomToPage function of EditorAPI with params included', async () => {
        await mockedSDK.canvas.zoomToPage('0', 300, 0, 700, 400);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledTimes(3);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledWith('0', 300, 0, 700, 400);
    });

    it('should call getZoomPercentage function of EditorAPI', async () => {
        await mockedSDK.canvas.getZoomPercentage();
        expect(mockedSDK.editorAPI.getZoomPercentage).toHaveBeenCalledTimes(1);
    });

    it('should call setZoomPercentage function of EditorAPI', async () => {
        await mockedSDK.canvas.setZoomPercentage(50);
        expect(mockedSDK.editorAPI.setZoomPercentage).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setZoomPercentage).toHaveBeenCalledWith(50);
    });
});
