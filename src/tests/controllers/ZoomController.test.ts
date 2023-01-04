import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/MockEditorAPI';
import { ZoomController } from '../../controllers/ZoomController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.zoom = new ZoomController(mockChild);

    jest.spyOn(mockedSDK.zoom, 'zoomToPage');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Should call all of the ZoomController functions of child successfully', () => {
    it('should call zoomToPage function of EditorAPI with no params provided', async () => {
        await mockedSDK.zoom.zoomToPage();
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledTimes(1);

        await mockedSDK.zoom.zoomToPage(null, null, null, null, null);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledWith(null, null, null, null, null);
    });

    it('should call zoomToPage function of EditorAPI with params included', async () => {
        await mockedSDK.zoom.zoomToPage('0', 300, 0, 700, 400);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledTimes(3);
        expect(mockedSDK.editorAPI.zoomToPage).toHaveBeenCalledWith('0', 300, 0, 700, 400);
    });
});
