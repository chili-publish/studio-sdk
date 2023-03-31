import { EditorAPI } from '../types/CommonTypes';
import { ToolType } from '../utils/enums';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ToolController is responsible for all communication regarding the tools.
 * Methods inside this controller can be called by `window.SDK.tool.{method-name}`
 */
export class ToolController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method sets the currently used tool
     * @param tool
     */
    private setTool = async (tool: ToolType) => {
        const res = await this.#editorAPI;
        return res.setTool(tool).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns selected tool
     */
    getSelectedTool = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedTool().then((result) => getEditorResponseData<ToolType>(result));
    };

    /**
     * This method sets the used tool to a Pointer tool
     */
    setSelectTool = async () => {
        return this.setTool(ToolType.SELECT);
    };

    /**
     * This method sets the used tool to a Move tool
     */
    setHandTool = async () => {
        return this.setTool(ToolType.HAND);
    };

    /**
     * This method sets the used tool to a Zoom tool
     */
    setZoomTool = async () => {
        await this.setTool(ToolType.ZOOM);
    };

    /**
     * This method sets the used tool to a TextFrame tool
     */
    setTextFrameTool = async () => {
        return this.setTool(ToolType.TEXT_FRAME);
    };

    /**
     * This method sets the used tool to a ImageFrame tool
     */
    setImageFrameTool = async () => {
        return this.setTool(ToolType.IMAGE_FRAME);
    };

    /**
     * This method sets the used tool to a ShapeRectangle tool
     */
    setShapeRectTool = async () => {
        return this.setTool(ToolType.SHAPE_RECT);
    };

    /**
     * This method sets the used tool to a ShapeEllipse tool
     */
    setShapeEllipseTool = async () => {
        return this.setTool(ToolType.SHAPE_ELLIPSE);
    };

    /**
     * This method sets the used tool to a ShapePolygon tool
     */
    setShapePolygonTool = async () => {
        return this.setTool(ToolType.SHAPE_POLYGON);
    };
}
