import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';

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
     * @param left
     * @param top
     * @param width
     * @param height
     * @returns
     */
    zoomToPage = async (left?: number | null, top?: number | null, width?: number | null, height?: number | null) => {
        const res = await this.#editorAPI;
        return res.zoomToPage(left, top, width, height).then((result) => getEditorResponseData<null>(result));
    };
}
