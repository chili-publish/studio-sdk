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
        mockedToolController = new ToolController(Promise.resolve(mockEditorApi));
        jest.spyOn(mockEditorApi, 'getSelectedTool');
        jest.spyOn(mockEditorApi, 'setTool');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('calls getSelectedTool', async () => {
        await mockedToolController.getSelected();
        expect(mockEditorApi.getSelectedTool).toHaveBeenCalledTimes(1);
    });

    it('sets the pointer tool', async () => {
        const response = await mockedToolController.setPointer();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SELECT);
        expect(response.success).toBeTruthy();
    });
    it('sets the move tool', async () => {
        const response = await mockedToolController.setHand();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.HAND);
        expect(response.success).toBeTruthy();
    });

    it('sets the zoom tool', async () => {
        const response = await mockedToolController.setZoom();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.ZOOM);
        expect(response.success).toBeTruthy();
    });

    it('sets the text  tool', async () => {
        const response = await mockedToolController.setTextFrame();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.TEXT_FRAME);
        expect(response.success).toBeTruthy();
    });

    it('sets the image tool', async () => {
        const response = await mockedToolController.setImageFrame();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.IMAGE_FRAME);
        expect(response.success).toBeTruthy();
    });

    it('sets the shape rect tool', async () => {
        const response = await mockedToolController.setShapeRect();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SHAPE_RECT);
        expect(response.success).toBeTruthy();
    });

    it('sets the shape ellipse tool', async () => {
        const response = await mockedToolController.setShapeEllipse();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SHAPE_ELLIPSE);
        expect(response.success).toBeTruthy();
    });

    it('sets the shape polygon tool', async () => {
        const response = await mockedToolController.setShapePolygon();
        expect(mockEditorApi.setTool).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTool).toHaveBeenCalledWith(ToolType.SHAPE_POLYGON);
        expect(response.success).toBeTruthy();
    });
});
