import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { DebugData } from '../types/DebugTypes';

/**
 * The DebugController is responsible for all communication regarding Debugging.
 * Methods inside this controller can be called by `window.SDK.debug.{method-name}`
 */
export class DebugController {
    /**
     * @ignore
     */
    #editorAPI: Promise<EditorAPI>;

    /**
     * @ignore
     */
    constructor(editorAPI: Promise<EditorAPI>) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method returns all debug logs
     * @returns list of all debug logs
     */
    getAllLogs = async () => {
        const res = await this.#editorAPI;
        return res.getLogs().then((result) => getEditorResponseData<DebugData[]>(result));
    };

    /**
     * This method toggles the showcase of debug panel
     * @returns
     */
    toggleDebugPanel = async () => {
        const res = await this.#editorAPI;
        return res.toggleDebugPanel().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method enables the debugging
     * @returns
     */
    enableDebug = async () => {
        const res = await this.#editorAPI;
        return res.enableDebug().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method disables the debugging
     * @returns
     */
    disableDebug = async () => {
        const res = await this.#editorAPI;
        return res.disableDebug().then((result) => getEditorResponseData<null>(result));
    };
}
