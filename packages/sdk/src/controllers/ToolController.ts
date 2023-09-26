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
    setTool = async (tool: ToolType) => {
        const res = await this.#editorAPI;
        return res.setTool(tool).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns selected tool
     */
    getSelected = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedTool().then((result) => getEditorResponseData<ToolType>(result));
    };

    /**
     * This method sets the used tool to a Pointer tool
     */
    setPointer = async () => {
        return this.setTool(ToolType.SELECT);
    };

    /**
     * This method sets the used tool to a Move tool
     */
    setHand = async () => {
        return this.setTool(ToolType.HAND);
    };

    /**
     * This method sets the used tool to a Zoom tool
     */
    setZoom = async () => {
        await this.setTool(ToolType.ZOOM);
    };

    /**
     * This method sets the used tool to a TextFrame tool
     */
    setTextFrame = async () => {
        return this.setTool(ToolType.TEXT_FRAME);
    };

    /**
     * This method sets the used tool to a ImageFrame tool
     */
    setImageFrame = async () => {
        return this.setTool(ToolType.IMAGE_FRAME);
    };

    /**
     * This method sets the used tool to a ShapeRectangle tool
     */
    setShapeRect = async () => {
        return this.setTool(ToolType.SHAPE_RECT);
    };

    /**
     * This method sets the used tool to a ShapeEllipse tool
     */
    setShapeEllipse = async () => {
        return this.setTool(ToolType.SHAPE_ELLIPSE);
    };

    /**
     * This method sets the used tool to a ShapePolygon tool
     */
    setShapePolygon = async () => {
        return this.setTool(ToolType.SHAPE_POLYGON);
    };
}