import { BrandKit } from '../../types/BrandKitTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';
import type { APIBrandKit } from '../types/BrandKitTypes';

/**
 * Next BrandKitController: get/set use the same unified BrandKit type.
 * Methods in this controller are the future API and can be called when using the next initiator.
 */
export class BrandKitController {
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
     * Updates the brand kit with the given API data. Returns the updated brand kit (BrandKit shape).
     * @param apiBrandKit - The brand kit data in API/environment format
     * @returns The updated brand kit
     */
    set = async (apiBrandKit: APIBrandKit) => {
        const res = await this.#editorAPI;
        return res.setBrandKit(JSON.stringify(apiBrandKit)).then((result) => getEditorResponseData<BrandKit>(result));
    };
}
