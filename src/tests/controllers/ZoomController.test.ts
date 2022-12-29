import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/MockEditorAPI';
import { ZoomController } from '../../controllers/ZoomController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.zoom = new ZoomController(mockChild);

    jest.spyOn(mockedSDK.zoom, 'zoomToFit');
    jest.clearAllMocks();
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Should call all of the ZoomController functions of child successfully', () => {
    it('should call zoomToFit function of EditorAPI with no params provided', async () => {
        await mockedSDK.zoom.zoomToFit();
        expect(mockedSDK.editorAPI.zoomToFit).toHaveBeenCalledTimes(1);

        await mockedSDK.zoom.zoomToFit(null, null, null, null, null);
        expect(mockedSDK.editorAPI.zoomToFit).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.zoomToFit).toHaveBeenCalledWith(null, null, null, null, null);
    });

    it('should call zoomToFit function of EditorAPI with params included', async () => {
        await mockedSDK.zoom.zoomToFit('0', 300, 0, 700, 400);
        expect(mockedSDK.editorAPI.zoomToFit).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.zoomToFit).toHaveBeenCalledWith('0', 300, 0, 700, 400);
    });
});
