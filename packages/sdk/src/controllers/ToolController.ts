import { EditorAPI } from '../types/CommonTypes';
import { ToolType } from '../utils/Enums';
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
     * @deprecated
     * This method sets the used tool to the select tool.
     * This method is deprecated in favour of the setSelect tool setter.
     */
    setPointer = async () => {
        return this.setTool(ToolType.SELECT);
    };

    /**
     * This method sets the used tool to the select tool.
     */
    setSelect = async () => {
        return this.setTool(ToolType.SELECT);
    };

    /**
     * This method sets the used tool to the Move tool
     */
    setHand = async () => {
        return this.setTool(ToolType.HAND);
    };

    /**
     * This method sets the used tool to the Zoom tool
     */
    setZoom = async () => {
        return this.setTool(ToolType.ZOOM);
    };

    /**
     * This method sets the used tool to the TextFrame tool
     */
    setTextFrame = async () => {
        return this.setTool(ToolType.TEXT_FRAME);
    };

    /**
     * This method sets the used tool to the ImageFrame tool
     */
    setImageFrame = async () => {
        return this.setTool(ToolType.IMAGE_FRAME);
    };

    /**
     * This method sets the used tool to the ShapeRectangle tool
     */
    setShapeRect = async () => {
        return this.setTool(ToolType.SHAPE_RECT);
    };

    /**
     * This method sets the used tool to the ShapeEllipse tool
     */
    setShapeEllipse = async () => {
        return this.setTool(ToolType.SHAPE_ELLIPSE);
    };

    /**
     * This method sets the used tool to the ShapePolygon tool
     */
    setShapePolygon = async () => {
        return this.setTool(ToolType.SHAPE_POLYGON);
    };
}
