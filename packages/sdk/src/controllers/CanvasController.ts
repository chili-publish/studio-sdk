import { EditorAPI, Id } from '../types/CommonTypes';
import { ViewMode } from '../types/ViewModeTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The CanvasController is responsible for all Canvas-related functionality.
 * Methods inside this controller can be called by `window.SDK.canvas.{method-name}`
 */
export class CanvasController {
    /**
     * @ignore
     */
    #editorAPI: Promise<EditorAPI>;

    /**
     * @ignore
     */
    constructor(editorAPI: Promise<EditorAPI>) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method fits the page to the given rectangle or the viewport available
     * Optional parameters `left`, `top`, `width` and `height` are needed to define the rectangle to fit the page to
     * If any or all of them aren't provided the page will fit the whole viewport available
     * @param _id the id of a specific page
     * @param left
     * @param top
     * @param width
     * @param height
     * @returns
     */
    zoomToPage = async (
        _id?: Id | null,
        left?: number | null,
        top?: number | null,
        width?: number | null,
        height?: number | null,
    ) => {
        if (_id !== undefined) {
            console.warn('id has no effect and will be deprecated in the future');
        }
        const res = await this.#editorAPI;
        return res.zoomToPage(left, top, width, height).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method gets the scale factor of the canvas
     * @returns scale factor in percents
     */
    getZoomPercentage = async () => {
        const res = await this.#editorAPI;
        return res.getZoomPercentage().then((result) => getEditorResponseData<number>(result));
    };

    /**
     * This method sets the scale factor to the canvas and re-centers the page
     * @param scaleFactor scale factor in percents
     * @returns
     */
    setZoomPercentage = async (scaleFactor: number) => {
        const res = await this.#editorAPI;
        return res.setZoomPercentage(scaleFactor).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new view mode
     * @param viewMode view mode of the editor
     * @returns
     */
    setViewMode = async (viewMode: ViewMode) => {
        const res = await this.#editorAPI;
        return res.setViewMode(viewMode).then((result) => getEditorResponseData<null>(result));
    };
}
