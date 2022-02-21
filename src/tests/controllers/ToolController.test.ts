import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { SDK, Tools } from '../../index';
import { ToolController } from '../../controllers/ToolController';

describe('Tool controller', () => {
    let mockedSDK: SDK;
    beforeEach(() => {
        mockedSDK = new SDK(mockConfig);
        mockedSDK.editorAPI = mockChild;
        mockedSDK.tool = new ToolController(mockChild);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sets the pointer tool', async () => {
        await mockedSDK.tool.setSelectTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(Tools.SELECT);
    });
    it('sets the move tool', async () => {
        await mockedSDK.tool.setHandTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(Tools.HAND);
    });

    it('sets the zoom tool', async () => {
        await mockedSDK.tool.setZoomTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(3);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(Tools.ZOOM);
    });
});
