import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * @experimental This controller is experimental and may change without warning.
 * The ComponentController is responsible for all communication regarding Component frames.
 * Methods inside this controller can be called by `window.SDK.component.{method-name}`
 */
export class ComponentController {
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
     * @experimental This method will link (or unlink) a variable from the template to the component frame
     * @param id the id of the componentFrame that needs to be updated.
     * @param target the id of the variable, inside the component, that will be linked (or unlinked) to the source variable.
     * @param source the id of the source variable from the template. If not provided, the variable will be unlinked.
     * @returns
     */
    linkVariable = async (frameId: Id, target: Id, source?: Id) => {
        const res = await this.#editorAPI;
        return res.linkComponentVariable(frameId, target, source).then((result) => getEditorResponseData<null>(result));
    };
}
