import { EditorAPI } from '../../types/CommonTypes';
import { ColorUpdate } from '../../types/ColorStyleTypes';

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
        return res.getColors();
    };

    /**
     * This method returns a color by id
     * @param colorId The ID of a specific color
     * @returns
     */
    getColorById = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.getColorById(colorId);
    };

    /**
     * This method create a new color
     * @returns the new created color id
     */
    createColor = async () => {
        const res = await this.#editorAPI;
        return res.createColor();
    };

    /**
     * This method duplicates a color
     * @param colorId The ID of a specific color
     * @returns the new color id
     */
    duplicateColor = async (colorId: string) => {
        const res = await this.#editorAPI;
        return res.duplicateColor(colorId);
    };

    /**
     * This method changes positions of colors
     * @param order The position of the colors
     * @param colorIds The list of color ids
     * @returns
     */
    moveColors = async (order: number, colorIds: string[]) => {
        const res = await this.#editorAPI;
        return res.moveColors(order, colorIds);
    };

    /**
     * This method renames a color
     * @param id The ID of a specific color
     * @param name The new name of the color
     * @returns
     */
    renameColor = async (id: string, name: string) => {
        const res = await this.#editorAPI;
        return res.renameColor(id, name);
    };

    /**
     * This method updates a color
     * @param id The ID of a specific color
     * @param color The new color properties
     * @returns
     */
    updateColor = async (id: string, color: ColorUpdate) => {
        const res = await this.#editorAPI;
        return res.updateColor(id, JSON.stringify(color));
    };

    /**
     * This method removes a color
     * @param id The ID of a specific color
     * @returns
     */
    removeColor = async (id: string) => {
        const res = await this.#editorAPI;
        return res.removeColor(id);
    };
}
