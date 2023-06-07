import { EditorAPI } from '../types/CommonTypes';
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
     * @returns
     */
    getColors = async () => {
        const res = await this.#editorAPI;
        return res.getColors().then((result) => getEditorResponseData<DocumentColor[]>(result));
    };

    /**
     * This method returns a color by ID
     * @param colorId The ID of a specific color
     * @returns
     */
    getColor = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.getColorById(colorId).then((result) => getEditorResponseData<DocumentColor>(result));
    };

    /**
     * This method adds a new color
     * @returns the new added color ID
     */
    createColor = async () => {
        const res = await this.#editorAPI;
        return res.createColor().then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method duplicates a color by the ID
     * @param colorId The ID of a specific color
     * @returns the new color id
     */
    duplicateColor = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.duplicateColor(colorId).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method changes positions of colors
     * @param order The position of the colors
     * @param colorIds The list of color IDs
     * @returns
     */
    moveColors = async (order: number, colorIds: string[]) => {
        const res = await this.#editorAPI;
        return res.moveColors(order, colorIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a color
     * @param colorId The ID of a specific color
     * @param newColorName The new name of the color
     * @returns
     */
    renameColor = async (colorId: string, newColorName: string) => {
        const res = await this.#editorAPI;
        return res.renameColor(colorId, newColorName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates a color
     * @param colorId The ID of a specific color
     * @param newColorProperties The new color properties
     * @returns
     */
    updateColor = async (colorId: string, newColorProperties: ColorUpdate) => {
        const res = await this.#editorAPI;
        return res.updateColor(colorId, JSON.stringify(newColorProperties)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a color
     * @param colorId The ID of a specific color
     * @returns
     */
    removeColor = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.removeColor(colorId).then((result) => getEditorResponseData<null>(result));
    };
}
