import mockConfig from '../__mocks__/config';
import { SDK, ToolType } from '../../index';
import { ToolController } from '../../controllers/ToolController';
import mockChild from '../__mocks__/MockEditorAPI';

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

    it('calls getSelectedTool', async () => {
        await mockedSDK.tool.getSelectedTool();
        expect(mockedSDK.editorAPI.getSelectedTool).toHaveBeenCalledTimes(1);
    });

    it('sets the pointer tool', async () => {
        await mockedSDK.tool.setSelectTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(ToolType.SELECT);
    });
    it('sets the move tool', async () => {
        await mockedSDK.tool.setHandTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(ToolType.HAND);
    });

    it('sets the zoom tool', async () => {
        await mockedSDK.tool.setZoomTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(3);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(ToolType.ZOOM);
    });

    it('sets the text  tool', async () => {
        await mockedSDK.tool.setTextFrameTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(4);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(ToolType.TEXT_FRAME);
    });

    it('sets the image tool', async () => {
        await mockedSDK.tool.setImageFrameTool();
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledTimes(5);
        expect(mockedSDK.editorAPI.setTool).toHaveBeenCalledWith(ToolType.IMAGE_FRAME);
    });
});
