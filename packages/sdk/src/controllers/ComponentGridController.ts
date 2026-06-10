import { EditorAPI, Id } from '../types/CommonTypes';
import { ComponentGridSettingsDeltaUpdate } from '../types/ComponentGridTypes';
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
     * @param targetVariableId the id of the target variable to map to
     * @param sourceVariableId the id of the source variable to map from, or null to unset
     * @param sourceField the source field to map to
     * @returns
     */
    setMapping = async (frameId: Id, componentId: string, targetVariableId: string, sourceVariableId: string | null, sourceField: string | null) => {
        const res = await this.#editorAPI;
        return res
            .setComponentGridMapping(frameId, componentId, targetVariableId, sourceVariableId, sourceField)
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
            .setComponentGridComponentSource(frameId, src ? JSON.stringify(src) : null)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the data source variable of a specified component grid frame.
     * @param frameId the id of the frame to reset
     * @param dataSourceVariableId the data source variable to set, or null to unset
     * @returns
     */
    setDataSourceVariable = async (frameId: Id, dataSourceVariableId: Id | null) => {
        const res = await this.#editorAPI;
        return res
            .setComponentGridDataSourceVariable(frameId, dataSourceVariableId)
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