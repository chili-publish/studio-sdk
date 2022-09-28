import {ConfigType, EditorAPI} from '../../types/CommonTypes';
import {getEditorResponseData} from '../utils/EditorResponseData';
import {WellKnownConfigurationKeys} from "../../types/ConfigurationTypes";

/**
 * The PageController is responsible for all communication regarding Pages.
 * Methods inside this controller can be called by `window.SDK.page.{method-name}`
 */
export class ConfigurationController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;
    private config: ConfigType;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI, config: ConfigType) {
        this.#editorAPI = editorAPI;
        this.config = config;
    }

    /**
     * This method returns the list of pages
     * @returns
     */
    getValue = async (key: WellKnownConfigurationKeys | string) => {
        const res = await this.#editorAPI;
        return res.getConfigValue(key).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method returns the list of pages
     * @returns
     */
    setValue = async (key: WellKnownConfigurationKeys | string, value: string) => {
        const res = await this.#editorAPI;
        return res.setConfigValue(key, value).then((result) => getEditorResponseData<null>(result));
    };
}
