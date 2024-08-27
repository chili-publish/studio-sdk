import { EditorAPI, Id } from '../types/CommonTypes';
import { ColorType, ColorUpdate, DocumentColor } from '../types/ColorStyleTypes';
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
     * @param id the id of a specific color
     * @returns color properties for given id
     */
    getById = async (id: string) => {
        const res = await this.#editorAPI;
        return res.getColorById(id).then((result) => getEditorResponseData<DocumentColor>(result));
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
     * @param id the id of a specific color
     * @returns id of the duplicated color
     */
    duplicate = async (id: string) => {
        const res = await this.#editorAPI;
        return res.duplicateColor(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method changes positions of colors
     * @param order the position of the colors
     * @param ids the list of color IDs
     * @returns
     */
    move = async (order: number, ids: string[]) => {
        const res = await this.#editorAPI;
        return res.moveColors(order, ids).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a color
     * @param id the id of a specific color
     * @param newColorName the new name of the color
     * @returns
     */
    rename = async (id: string, newColorName: string) => {
        const res = await this.#editorAPI;
        return res.renameColor(id, newColorName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates a color
     * @param id the id of a specific color
     * @param newColorProperties the new color properties
     * @returns
     */
    update = async (id: string, newColorProperties: ColorUpdate) => {
        const res = await this.#editorAPI;
        const properties = newColorProperties;
        if (properties.type === ColorType.spot) {
            properties.type = ColorType.spotCMYK;
        }
        return res.updateColor(id, JSON.stringify(properties)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a color
     * @param id the id of a specific color
     * @returns
     */
    remove = async (id: string) => {
        const res = await this.#editorAPI;
        return res.removeColor(id).then((result) => getEditorResponseData<null>(result));
    };
}
