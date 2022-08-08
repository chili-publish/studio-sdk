import { EditorAPI } from '../../types/CommonTypes';
import { TextStyleUpdateType } from '../../types/TextStyleTypes';
/**
 * The TextSelectionController is responsible for all communication regarding text styles.
 * Methods inside this controller can be called by `window.SDK.textStyle.{method-name}`
 */
export class TextSelectionController {
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
     * This method returns all debug logs
     * @returns
     */
    setTextStyleProperties = async (style: TextStyleUpdateType) => {
        const res = await this.#editorAPI;
        return res.selectedTextStyleDeltaUpdate(JSON.stringify(style));
    };
}
