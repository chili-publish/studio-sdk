import { EditorAPI } from '../../types/CommonTypes';
import { SelectedTextStyle, TextStyleUpdateType } from '../../types/TextStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The TextStyleController is responsible for all communication regarding text styles.
 * Methods inside this controller can be called by `window.SDK.textStyle.{method-name}`
 */
export class TextStyleController {
    /**
     * @ignore
     */
    readonly #editorAPI: EditorAPI;

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
     * If the text is selected, then the inline style properties will be cleared
     * If the text is not selected and user tried to change any style property, the temporary style will be cleared
     * if there is no text selection and there is no temporary style, the inline paragraph properties will be cleared
     * @returns
     */
    clearTextStyleProperties = async () => {
        const res = await this.#editorAPI;
        return res.selectedTextStyleClean().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method gets a selected Text's style properties
     * @returns
    */
    getSelectedTextStyle = async () => {
        const res = await this.#editorAPI;
        return res
            .getSelectedTextStyle()
            .then((result) => getEditorResponseData<SelectedTextStyle>(result));
    };
}
