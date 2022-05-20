import { EditorAPI } from '../../types/CommonTypes';

/**
 * The UndoManagerController is responsible for all communication regarding the Undo-Manager.
 * Methods inside this controller can be called by `window.SDK.undoManager.{method-name}`
 */
export class UndoManagerController {
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
     * This method undoes the last operation
     * @returns
     */
    undo = async () => {
        const res = await this.#editorAPI;
        return res.undo();
    };

    /**
     * This method redoes the last operation
     * @returns
     */
    redo = async () => {
        const res = await this.#editorAPI;
        return res.redo();
    };
}
