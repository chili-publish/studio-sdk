import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { SelectionOperation } from '../types/SelectionTypes';

/**
 * The SelectionController is responsible for all communication regarding selection.
 * It currently supports frame & text.
 * Methods inside this controller can be called by `window.SDK.selection.{method-name}`
 */
export class SelectionController {
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
     * This method will copy the focused content to the OS clipboard
     * 
     * Target: frame & text
     * @returns
     */
    copy = async () => {
        const res = await this.#editorAPI;
        return res
            .performSelectionOperation(SelectionOperation.COPY)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will cut the focused content to the OS clipboard
     * 
     * Target: frame & text
     * @returns
     */
    cut = async () => {
        const res = await this.#editorAPI;
        return res
            .performSelectionOperation(SelectionOperation.CUT)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
    * This method will paste the focused content from the OS clipboard
    * 
    * Source: frame & text
    * @returns
    */
    paste = async () => {
        const res = await this.#editorAPI;
        return res
            .performSelectionOperation(SelectionOperation.PASTE)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will duplicate the focused content in-place
     * 
     * Note: Does not support duplicating text
     * @returns
     */
    duplicate = async () => {
        const res = await this.#editorAPI;
        return res
            .performSelectionOperation(SelectionOperation.DUPLICATE)
            .then((result) => getEditorResponseData<null>(result));
    };
}



