import { EditorAPI } from '../../types/CommonTypes';

/**
 * The DebugController is responsible for all communication regarding Debugging.
 * Methods inside this controller can be called by `window.SDK.debug.{method-name}`
 */
export class DebugController {
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
     * This method returns all debug logs
     * @returns
     */
    getLogs = async () => {
        const res = await this.#editorAPI;
        return res.getLogs();
    };

    /**
     * This method toggles the showcase of debug panel
     * @returns
     */
    toggleDebugPanel = async () => {
        const res = await this.#editorAPI;
        return res.toggleDebugPanel();
    };

    /**
     * This method enables the debug panel
     * @returns
     */
    enableDebugPanel = async () => {
        const res = await this.#editorAPI;
        return res.enableDebugPanel();
    };

    /**
     * This method disables the debug panel
     * @returns
     */
    disableDebugPanel = async () => {
        const res = await this.#editorAPI;
        return res.disableDebugPanel();
    };
}
