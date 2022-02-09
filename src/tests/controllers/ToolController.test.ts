import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { SDK, Tools } from '../../index';
import { ToolController } from '../../controllers/ToolController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.tool, 'setTool');

    mockedSDK.children = mockChild;
    mockedSDK.tool = new ToolController(mockChild, mockConfig);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Tool controller', () => {
    it('sets the tool with the correct parameter', async () => {
        await mockedSDK.tool.setTool(Tools.MOVE)
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledTimes(1);
        expect(mockedSDK.tool.children.setTool).toHaveBeenCalledWith('move');
    });
});
