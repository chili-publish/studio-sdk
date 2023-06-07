import { EditorAPI, Id } from '../types/CommonTypes';
import { ParagraphStyle, ParagraphStyleUpdate } from '../types/ParagraphStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ParagraphStyleController is responsible for all communication regarding paragraph styles.
 * Methods inside this controller can be called by `window.SDK.paragraphStyle.{method-name}`
 */
export class ParagraphStyleController {
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
     * This method returns the list of paragraph styles
     * @returns
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getParagraphStyles().then((result) => getEditorResponseData<ParagraphStyle[]>(result));
    };

    /**
     * This method returns a paragraph style by id
     * @param paragraphStyleId the id of a specific paragraph style
     * @returns
     */
    getById = async (paragraphStyleId: string) => {
        const res = await this.#editorAPI;
        return res
            .getParagraphStyleById(paragraphStyleId)
            .then((result) => getEditorResponseData<ParagraphStyle>(result));
    };

    /**
     * This method creates a new paragraph style
     * @returns the id of new paragraph style
     */
    create = async () => {
        const res = await this.#editorAPI;
        return res.createParagraphStyle().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method duplicates a paragraph style
     * @param paragraphStyleId the id of a specific paragraph style
     * @returns the new paragraph style id
     */
    duplicate = async (paragraphStyleId: string) => {
        const res = await this.#editorAPI;
        return res.duplicateParagraphStyle(paragraphStyleId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method updates a paragraph style
     * @param paragraphStyleId the id of a specific paragraph style
     * @param paragraphStyleProperties The new paragraph style properties
     * @returns
     */
    update = async (paragraphStyleId: string, paragraphStyleProperties: ParagraphStyleUpdate) => {
        const res = await this.#editorAPI;
        return res
            .updateParagraphStyle(paragraphStyleId, JSON.stringify(paragraphStyleProperties))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a paragraph style
     * @param paragraphStyleId the id of a specific paragraph style
     * @param paragraphName the new name of the paragraph style
     * @returns
     */
    rename = async (paragraphStyleId: string, paragraphName: string) => {
        const res = await this.#editorAPI;
        return res.renameParagraphStyle(paragraphStyleId, paragraphName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a paragraph style
     * @param paragraphStyleId the id of a specific paragraph style
     * @returns
     */
    remove = async (paragraphStyleId: string) => {
        const res = await this.#editorAPI;
        return res.removeParagraphStyle(paragraphStyleId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of paragraph styles
     * @param order the position of the paragraph styles
     * @param paragraphStyleIds the list of paragraph styles ids
     * @returns
     */
    move = async (order: number, paragraphStyleIds: string[]) => {
        const res = await this.#editorAPI;
        return res.moveParagraphStyles(order, paragraphStyleIds).then((result) => getEditorResponseData<null>(result));
    };
}
