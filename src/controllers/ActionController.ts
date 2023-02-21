import { ActionTrigger } from '../../types/ActionTypes';
import { EditorAPI, Id } from '../../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ActionController is responsible for all Actions-related functionality.
 * Methods inside this controller can be called by `window.SDK.action.{method-name}`
 */
export class ActionController {
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
     * This method creates a new action.
     * @returns The ID of the newly created action.
     */
    createAction = async () => {
        const res = await this.#editorAPI;
        return res.createAction().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method removes the action.
     * @param actionId The ID of a specific action
     * @returns
     */
    removeAction = async (actionId: Id) => {
        const res = await this.#editorAPI;
        return res.removeAction(actionId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates the script the action uses.
     * @param actionId The ID of a specific action
     * @param script The JavaScript based action script
     * @returns
     */
    updateActionScript = async (actionId: Id, script: string) => {
        const res = await this.#editorAPI;
        return res.updateActionScript(actionId, script).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates the triggers on which the action will react.
     * @param actionId The ID of a specific action
     * @param triggers The triggers this action should react on.
     * @returns
     */
    updateActionTriggers = async (actionId: Id, triggers: ActionTrigger[]) => {
        const res = await this.#editorAPI;
        return res
            .updateActionTriggers(actionId, JSON.stringify(triggers))
            .then((result) => getEditorResponseData<null>(result));
    };
}
