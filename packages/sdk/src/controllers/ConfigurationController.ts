import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { StudioOptionsDeltaUpdate, WellKnownConfigurationKeys } from '../types/ConfigurationTypes';

/**
 * The ConfigurationController allows setting editor session data. This data is not stored in the document and
 * can only be used at runtime. Amongst others, the configuration store is available to the editor connectors and
 * Javascript actions running in the editor.
 * Methods inside this controller can be called by `window.SDK.configuration.{method-name}`
 */
export abstract class ConfigurationController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    protected constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method returns the value for a given configuration key. If a value was not found in the configuration store
     * this method returns an error. The key cannot be null.
     * @returns value for a given configuration key
     */
    async getValue(key: WellKnownConfigurationKeys | string) {
        const res = await this.#editorAPI;
        return res.getConfigValue(key).then((result) => getEditorResponseData<string>(result));
    }

    /**
     * This method sets, or overrides the value for a given key. Null values are not allowed for both key and value,
     * using them will result in an error.
     * @returns
     */
    async setValue(key: WellKnownConfigurationKeys | string, value: string) {
        const res = await this.#editorAPI;
        return res.setConfigValue(key, value).then((result) => getEditorResponseData<null>(result));
    }

    /**
     * This method updates the studio options. Only defined options are updated, null values are ignored.
     * @returns
     */
    async updateStudioOptions(options: StudioOptionsDeltaUpdate) {
        const res = await this.#editorAPI;
        return res.updateStudioOptions(JSON.stringify(options)).then((result) => getEditorResponseData<null>(result));
    }

    /**
     * This method returns the engine session id. This id is unique for this engine session
     * @returns the engine session id
     */
    async getEngineSessionId() {
        const res = await this.#editorAPI;
        return res.getEngineSessionId().then((result) => getEditorResponseData<string>(result));
    }
}
