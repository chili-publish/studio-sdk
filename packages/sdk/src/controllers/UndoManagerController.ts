import SDK from '..';
import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The UndoManagerController is responsible for all communication regarding the Undo-Manager.
 * Methods inside this controller can be called by `window.SDK.undoManager.{method-name}`
 */
export class UndoManagerController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;
    #advanced: AdvancedUndoManagerController;
    #sdk: SDK;

    /**
     * @ignore
     */
    constructor(children: EditorAPI, sdk: SDK) {
        this.#editorAPI = children;
        this.#sdk = sdk;
        this.#advanced = new AdvancedUndoManagerController(children);
    }

    /**
     * This method undoes the last operation
     * @returns
     */
    undo = async () => {
        const res = await this.#editorAPI;
        return res.undo().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method redoes the last operation
     * @returns
     */
    redo = async () => {
        const res = await this.#editorAPI;
        return res.redo().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method adds custom data that will be saved and restored when undoing and redoing.
     * Duplicate values are overwritten. The data is exposed via the onCustomUndoDataChanged event.
     * 
     * @param key The key of the custom data
     * @param value The value of the custom data
     * @returns 
     */
    addCustomData = async (key: string, value: string) => {
        const res = await this.#editorAPI;
        return res.setCustomUndoData(key, value).then((result) => getEditorResponseData<null>(result));
    }

    /**
     * Record any operations in the current scope. This will automatically begin
     * the undo operation. Once you leave the record scope, it will end the undo operation.
     * Even if you throw an exception inside the record scope it will still end it properly.
     * @returns
     */
    record = async (operationName: string, undoOperationCallback: (sdk: SDK) => void) => {
        try {
            await this.#advanced.beginIfNoneActive(operationName);

            await undoOperationCallback(this.#sdk);
        } catch (error) {
            throw error;
        } finally {
            await this.#advanced.end();
        }
    };
}

export class AdvancedUndoManagerController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(children: EditorAPI) {
        this.#editorAPI = children;
    }

    /**
     * This will start a new undo operation.
     * This will throw an exception when there is already an undo operation recording.
     * @returns
     */
    begin = async (operationName: string) => {
        const res = await this.#editorAPI;
        return res.begin(operationName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This will start a new undo operation if there is no other undo operation recording.
     * This does not throw.
     * @returns
     */
    beginIfNoneActive = async (operationName: string) => {
        const res = await this.#editorAPI;
        return res.beginIfNoneActive(operationName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Ends the currently active recording operation.
     * If there is no recording operation currently running this will throw an exception.
     * @returns
     */
    end = async () => {
        const res = await this.#editorAPI;
        return res.end().then((result) => getEditorResponseData<null>(result));
    };
}
