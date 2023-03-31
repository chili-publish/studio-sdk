import { ToolType } from '../../index';
import { ToolController } from '../../controllers/ToolController';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

describe('ToolController', () => {
    let mockedToolController: ToolController;

    const mockEditorApi: EditorAPI = {
        getSelectedTool: async () => getEditorResponseData(castToEditorResponse(null)),
        setTool: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedToolController = new ToolController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'getSelectedTool');
        jest.spyOn(mockEditorApi, 'setTool');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('calls getSelectedTool', async () => {
        await mockedToolController.getSelectedTool();
        expect(mockEditorApi.getSelectedTool).toHaveBeenCalledTimes(1);
    });

    it('sets the pointer tool', async () => {
        await mockedToolController.setSelectTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SELECT);
    });
    it('sets the move tool', async () => {
        await mockedToolController.setHandTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.HAND);
    });

    it('sets the zoom tool', async () => {
        await mockedToolController.setZoomTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.ZOOM);
    });

    it('sets the text  tool', async () => {
        await mockedToolController.setTextFrameTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.TEXT_FRAME);
    });

    it('sets the image tool', async () => {
        await mockedToolController.setImageFrameTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.IMAGE_FRAME);
    });

    it('sets the shape rect tool', async () => {
        await mockedToolController.setShapeRectTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SHAPE_RECT);
    });

    it('sets the shape ellipse tool', async () => {
        await mockedToolController.setShapeEllipseTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SHAPE_ELLIPSE);
    });

    it('sets the shape polygon tool', async () => {
        await mockedToolController.setShapePolygonTool();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SHAPE_POLYGON);
    });
});
