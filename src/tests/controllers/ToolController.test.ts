import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { SDK, Tools } from '../../index';
import { ToolController } from '../../controllers/ToolController';

describe('Tool controller', () => {
    let mockedSDK: SDK;
    beforeEach(() => {
        mockedSDK = new SDK(mockConfig);
        mockedSDK.children = mockChild;
        mockedSDK.tool = new ToolController(mockChild, mockConfig);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('sets the pointer tool', async () => {
        await mockedSDK.tool.setSelectTool();
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledTimes(1);
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledWith(Tools.SELECT);
    });
    it('sets the move tool', async () => {
        await mockedSDK.tool.setHandTool();
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledTimes(2);
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledWith(Tools.HAND);
    });

    it('sets the zoom tool', async () => {
        await mockedSDK.tool.setZoomTool();
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledTimes(3);
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledWith(Tools.ZOOM);
    });
});
