import { EditorAPI, Id } from '../types/CommonTypes';
import { GradientUpdate, DocumentGradient } from '../types/GradientStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The GradientStyleController is responsible for all communication regarding gradient styles.
 * Methods inside this controller can be called by `window.SDK.gradientStyle.{method-name}`
 */
export class GradientStyleController {
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
     * This method returns the list of gradients
     * @returns list of all gradients
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getGradients().then((result) => getEditorResponseData<DocumentGradient[]>(result));
    };

    /**
     * This method returns a gradient by id
     * @param id the id of a specific gradient
     * @returns gradient properties for given id
     */
    getById = async (id: string) => {
        const res = await this.#editorAPI;
        return res.getGradientById(id).then((result) => getEditorResponseData<DocumentGradient>(result));
    };

    /**
     * This method creates a new gradient
     * @returns the new created gradient id
     */
    create = async () => {
        const res = await this.#editorAPI;
        return res.createGradient().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method duplicates a gradient by the id
     * @param id the id of a specific gradient
     * @returns id of the duplicated gradient
     */
    duplicate = async (id: string) => {
        const res = await this.#editorAPI;
        return res.duplicateGradient(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method changes positions of gradients
     * @param order the position of the gradients
     * @param ids the list of gradient IDs
     * @returns
     */
    move = async (order: number, ids: string[]) => {
        const res = await this.#editorAPI;
        return res.moveGradients(order, ids).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a gradient
     * @param id the id of a specific gradient
     * @param newGradientName the new name of the gradient
     * @returns
     */
    rename = async (id: string, newGradientName: string) => {
        const res = await this.#editorAPI;
        return res.renameGradient(id, newGradientName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates a gradient
     * @param id the id of a specific gradient
     * @param newGradientProperties the new gradient properties
     * @returns
     */
    update = async (id: string, newGradientProperties: GradientUpdate) => {
        const res = await this.#editorAPI;
        const properties = newGradientProperties;
        return res.updateGradient(id, JSON.stringify(properties)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a gradient
     * @param id the id of a specific gradient
     * @returns
     */
    remove = async (id: string) => {
        const res = await this.#editorAPI;
        return res.removeGradient(id).then((result) => getEditorResponseData<null>(result));
    };
}
