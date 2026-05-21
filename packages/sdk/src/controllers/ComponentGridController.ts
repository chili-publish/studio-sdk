import { EditorAPI, Id } from '../types/CommonTypes';
import { ComponentGridSettings, ComponentGridSettingsDeltaUpdate } from '../types/ComponentGridTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { ComponentSource, ComponentFitEnum } from '../types/FrameTypes';

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
     * This method will update the component grid settings of a specified frame.
     * @param frameId the id of the frame that needs to get updated
     * @param deltaUpdate the delta update object containing the properties to update
     * @returns
     */
    updateSettings = async (frameId: Id, deltaUpdate: ComponentGridSettingsDeltaUpdate) => {
        const res = await this.#editorAPI;
        return res
            .updateComponentGridSettings(frameId, JSON.stringify(deltaUpdate))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the component grid mapping for a specified frame.
     * @param frameId the id of the frame that needs to get updated
     * @param componentId the id of the component to map
     * @param variableId the id of the variable to map
     * @param sourceField the source field to map to, or null to unset
     * @returns
     */
    setMapping = async (frameId: Id, componentId: string, variableId: string, sourceField: string | null) => {
        const res = await this.#editorAPI;
        return res
            .setComponentGridMapping(frameId, componentId, variableId, sourceField)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the component grid settings for a specified frame.
     * @param frameId the id of the frame that needs to get updated
     * @param settings the settings object to apply
     * @returns
     */
    setSettings = async (frameId: Id, settings: ComponentGridSettings) => {
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
    resetSettings = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetComponentGridSettings(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the component source of a specified component grid frame.
     * @param frameId the id of the frame to reset
     * @param src the component source to set, or null to unset
     * @returns
     */
    setComponentSource = async (frameId: Id, src: ComponentSource | null) => {
        const res = await this.#editorAPI;
        return res
            .setComponentGridComponentSource(frameId, JSON.stringify(src))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the resize mode of a specified frame.
     * @param frameId the id of the frame to reset
     * @param fit the resize mode to set
     * @returns
     */
    setResizeMode = async (frameId: Id, fit: ComponentFitEnum) => {
        const res = await this.#editorAPI;
        return res.setComponentGridResizeMode(frameId, fit).then((result) => getEditorResponseData<null>(result));
    };
}