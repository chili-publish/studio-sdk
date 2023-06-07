import { EditorAPI, Id } from '../types/CommonTypes';
import { ColorUpdate, DocumentColor } from '../types/ColorStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ColorStyleController is responsible for all communication regarding color styles.
 * Methods inside this controller can be called by `window.SDK.colorStyle.{method-name}`
 */
export class ColorStyleController {
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
     * This method returns the list of colors
     * @returns list of all colors
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getColors().then((result) => getEditorResponseData<DocumentColor[]>(result));
    };

    /**
     * This method returns a color by id
     * @param colorId the id of a specific color
     * @returns color properties for given id
     */
    getById = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.getColorById(colorId).then((result) => getEditorResponseData<DocumentColor>(result));
    };

    /**
     * This method creates a new color
     * @returns the new created color id
     */
    create = async () => {
        const res = await this.#editorAPI;
        return res.createColor().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method duplicates a color by the id
     * @param colorId the id of a specific color
     * @returns id of the duplicated color
     */
    duplicate = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.duplicateColor(colorId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method changes positions of colors
     * @param order the position of the colors
     * @param colorIds the list of color IDs
     * @returns
     */
    move = async (order: number, colorIds: string[]) => {
        const res = await this.#editorAPI;
        return res.moveColors(order, colorIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a color
     * @param colorId the id of a specific color
     * @param newColorName the new name of the color
     * @returns
     */
    rename = async (colorId: string, newColorName: string) => {
        const res = await this.#editorAPI;
        return res.renameColor(colorId, newColorName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates a color
     * @param colorId the id of a specific color
     * @param newColorProperties the new color properties
     * @returns
     */
    update = async (colorId: string, newColorProperties: ColorUpdate) => {
        const res = await this.#editorAPI;
        return res.updateColor(colorId, JSON.stringify(newColorProperties)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a color
     * @param colorId the id of a specific color
     * @returns
     */
    remove = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.removeColor(colorId).then((result) => getEditorResponseData<null>(result));
    };
}
