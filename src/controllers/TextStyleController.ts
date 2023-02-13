import { EditorAPI } from '../../types/CommonTypes';
import { TextStyleUpdateType } from '../../types/TextStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
/**
 * The TextStyleController is responsible for all communication regarding text styles.
 * Methods inside this controller can be called by `window.SDK.textStyle.{method-name}`
 */
export class TextStyleController {
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
     * This method updates a selected Text's style properties
     * @returns
     */
    setTextStyleProperties = async (style: TextStyleUpdateType) => {
        const res = await this.#editorAPI;
        return res
            .selectedTextStyleDeltaUpdate(JSON.stringify(style))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method clears a selected Text's style properties
     * @returns
     */
    clearTextStyleProperties = async () => {
        const res = await this.#editorAPI;
        return res
            .selectedTextStyleClean()
            .then((result) => getEditorResponseData<null>(result));
    }
}
