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
     * @param id the id of a specific paragraph style
     * @returns
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getParagraphStyleById(id).then((result) => getEditorResponseData<ParagraphStyle>(result));
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
     * @param id the id of a specific paragraph style
     * @returns the new paragraph style id
     */
    duplicate = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateParagraphStyle(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method updates a paragraph style
     * @param id the id of a specific paragraph style
     * @param properties The new paragraph style properties
     * @returns
     */
    update = async (id: Id, properties: ParagraphStyleUpdate) => {
        const res = await this.#editorAPI;
        return res
            .updateParagraphStyle(id, JSON.stringify(properties))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a paragraph style
     * @param id the id of a specific paragraph style
     * @param name the new name of the paragraph style
     * @returns
     */
    rename = async (id: Id, name: string) => {
        const res = await this.#editorAPI;
        return res.renameParagraphStyle(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a paragraph style
     * @param id the id of a specific paragraph style
     * @returns
     */
    remove = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeParagraphStyle(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of paragraph styles
     * @param order the position of the paragraph styles
     * @param ids the list of paragraph style ids
     * @returns
     */
    move = async (order: number, ids: Id[]) => {
        const res = await this.#editorAPI;
        return res.moveParagraphStyles(order, ids).then((result) => getEditorResponseData<null>(result));
    };
}
