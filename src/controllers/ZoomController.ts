import { EditorAPI, Id } from '../../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ZoomController is responsible for all communication regarding Zoom functionality.
 * Methods inside this controller can be called by `window.SDK.zoom.{method-name}`
 */
export class ZoomController {
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
     * This method fits the page to the given rectangle or the viewport available
     * Optional parameters `left`, `top`, `width` and `height` are needed to define the rectangle to fit the page to
     * If any or all of them aren't provided the page will fit the whole viewport available
     * @param pageId The ID of a specific page
     * @param left
     * @param top
     * @param width
     * @param height
     * @returns
     */
    zoomToFit = async (
        pageId?: Id | null,
        left?: number | null,
        top?: number | null,
        width?: number | null,
        height?: number | null,
    ) => {
        const res = await this.#editorAPI;
        return res.zoomToFit(pageId, left, top, width, height).then((result) => getEditorResponseData<null>(result));
    };
}
