import { EditorAPI, Id } from '../types/CommonTypes';
import { ComponentFitEnum } from '../types/FrameTypes';
import { Variable } from '../types/VariableTypes';
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
        return res
            .linkComponentVariable(frameId, target, source, null)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns the list of variables of a component frame.
     * @param id the id of the componentFrame.
     * @returns
     */
    getComponentVariables = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.getComponentVariables(frameId).then((result) => getEditorResponseData<Variable[]>(result));
    };

    /**
     * This method sets the fit mode of a component frame.
     * @param frameId the id of the component frame.
     * @param fitMode the fit mode to set.
     * @returns
     */
    setFitMode = async (frameId: Id, fitMode: ComponentFitEnum) => {
        const res = await this.#editorAPI;
        return res.setComponentLayoutFit(frameId, fitMode).then((result) => getEditorResponseData<null>(result));
    };
}
