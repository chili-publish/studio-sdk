import { StudioOptionsDeltaUpdate, WellKnownConfigurationKeys } from '../types/ConfigurationTypes';
import { getEditorResponseData } from './EditorResponseData';
import { ConfigurationController } from '../controllers/ConfigurationController';

export class LocalConfigurationDecorator {
    /**
     * @ignore
     */
    #localConfig: Map<string, string>;

    /**
     * @ignore
     */
    #configurationController: ConfigurationController;

    /**
     * @ignore
     */
    constructor(configurationController: ConfigurationController, localConfig: Map<string, string>) {
        this.#configurationController = configurationController;
        this.#localConfig = localConfig;
    }

    /**
     * This method returns the value for a given configuration key. If a value was not found in the configuration store
     * this method returns an error. The key cannot be null.
     * @returns value for a given configuration key
     */
    getValue = async (key: WellKnownConfigurationKeys | string) => {
        const value = this.#localConfig.get(key);
        if (value) {
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

        return this.#configurationController.getValue(key);
    };

    /**
     * This method sets, or overrides the value for a given key. Null values are not allowed for both key and value,
     * using them will result in an error.
     * @returns
     */
    setValue = async (key: WellKnownConfigurationKeys | string, value: string) => {
        this.#localConfig.set(key, value);
        return this.#configurationController.setValue(key, value);
    };

    /**
     * This method updates the studio options. Only defined options are updated, null values are ignored.
     * @returns
     */
    updateStudioOptions = async (options: StudioOptionsDeltaUpdate) =>
        this.#configurationController.updateStudioOptions(options);

    /**
     * This method returns the engine session id. This id is unique for this engine session
     * @returns the engine session id
     */
    getEngineSessionId = async () => this.#configurationController.getEngineSessionId();
}
