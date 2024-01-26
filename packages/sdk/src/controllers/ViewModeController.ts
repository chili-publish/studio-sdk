import { EditorAPI } from '../types/CommonTypes';
import { ViewMode } from '../types/ViewModeTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ViewModeController is responsible for switching view modes.
 */
export class ViewModeController {
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
     * This method sets a new view mode
     * @param viewMode view mode of the editor
     * @returns
     */
    set = async (viewMode: ViewMode) => {
        const res = await this.#editorAPI;
        return res.setViewMode(viewMode).then((result) => getEditorResponseData<null>(result));
    };
}
