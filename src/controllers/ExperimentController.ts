import { EditorAPI, Id } from '../../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ExperimentController contains all SDK functions that are considered for addition,
 * or functions we want to keep open for changing definitions. This is a sneak peak
 * into future versions of the SDK. Never build production code relying on functions in 
 * this controller. 
 */
export class ExperimentController {
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
     * This method will insert a text variable in the selected frame. Calling this method
     * requires that the selected frame is in text editing mode.
     * @param variableId The ID of the variable to be inserted.
     * @returns
     */
     insertTextVariable = async (variableId: Id) => {
        const res = await this.#editorAPI;
        return res.insertTextVariable(variableId).then((result) => getEditorResponseData<null>(result));
    };
}
