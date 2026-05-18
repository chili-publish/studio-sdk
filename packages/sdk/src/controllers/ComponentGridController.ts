import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * @experimental This controller is experimental and may change without warning.
 * The ComponentGridController is responsible for all communication regarding Component Grid frames.
 * Methods inside this controller can be called by `window.SDK.componentGrid.{method-name}`
 */
export class ComponentGridController {
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
     * This method will update the component grid properties of a specified frame.
     * @param frameId the id of the frame that needs to get updated
     * @param deltaUpdate the delta update object containing the properties to update
     * @returns
     */
    updateComponentGridProperties = async (frameId: Id, deltaUpdate: Record<string, unknown>) => {
        const res = await this.#editorAPI;
        return res
            .updateComponentGridProperties(frameId, JSON.stringify(deltaUpdate))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the component grid mapping for a specified frame.
     * @param frameId the id of the frame that needs to get updated
     * @param connectorId the id of the connector, or null to unset
     * @param componentId the id of the component, or null to unset
     * @returns
     */
    setComponentGridMapping = async (frameId: Id, connectorId: string | null, componentId: string | null) => {
        const res = await this.#editorAPI;
        return res
            .setComponentGridMapping(frameId, connectorId, componentId)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the component grid settings for a specified frame.
     * @param frameId the id of the frame that needs to get updated
     * @param settings the settings object to apply
     * @returns
     */
    setComponentGridSettings = async (frameId: Id, settings: Record<string, unknown>) => {
        const res = await this.#editorAPI;
        return res
            .setComponentGridSettings(frameId, JSON.stringify(settings))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the component grid properties of a specified frame to their defaults.
     * @param frameId the id of the frame to reset
     * @returns
     */
    resetComponentGridProperties = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetComponentGridProperties(frameId).then((result) => getEditorResponseData<null>(result));
    };
}