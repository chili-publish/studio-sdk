import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Color, RGBColor } from '../types/ColorStyleTypes';

/**
 * The ColorConversionController is responsible for all communication regarding color coversion.
 * Methods inside this controller can be called by `window.SDK.colorConversion.{method-name}`
 */
export class ColorConversionController {
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
     * This method converts the given color to its rgb representation
     * @param color the color to convert
     * @returns the rgb representation of the given color
     */
    convertToRgb = async (color: Color) => {
        const res = await this.#editorAPI;
        return res.colorToRgb(JSON.stringify(color)).then((result) => getEditorResponseData<RGBColor>(result));
    };
}
