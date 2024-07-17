import { WellKnownConfigurationKeys } from '../types/ConfigurationTypes';
import { getEditorResponseData } from './EditorResponseData';
import { ConfigurationController } from '../controllers/ConfigurationController';
import { EditorAPI } from '../types/CommonTypes';

export class LocalConfigurationDecorator extends ConfigurationController {
    /**
     * @ignore
     */
    #localConfig: Map<string, string>;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI, localConfig: Map<string, string>) {
        super(editorAPI);
        this.#localConfig = localConfig;
    }

    /**
     * This method returns the value for a given configuration key. If a value was not found in the configuration store,
     * this method returns an error. The key cannot be null.
     * @returns value for a given configuration key
     */
    async getValue(key: WellKnownConfigurationKeys | string) {
        const value = this.#localConfig.get(key);
        if (value != null) {
            return getEditorResponseData<string>(
                {
                    status: 200,
                    success: true,
                    parsedData: value,
                    data: value,
                },
                false,
            );
        }

        return super.getValue(key);
    }

    /**
     * This method sets or overrides the value for a given key.
     * Null values are not allowed for both key and value,
     * using them will result in an error.
     * @returns
     */
    async setValue(key: WellKnownConfigurationKeys | string, value: string) {
        const res = super.setValue(key, value);
        this.#localConfig.set(key, value);
        return res;
    }
}
