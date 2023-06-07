import { ActionTrigger, DocumentAction } from '../types/ActionTypes';
import { EditorAPI, Id } from '../types/CommonTypes';
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
     * This method returns the list of all actions.
     * @returns
     */
    getActions = async () => {
        const res = await this.#editorAPI;
        return res.getActions().then((result) => getEditorResponseData<DocumentAction[]>(result));
    };

    /**
     * This method returns an action by the ID
     * @param actionId The ID of a specific action
     * @returns
     */
    getAction = async (actionId: Id) => {
        const res = await this.#editorAPI;
        return res.getActionById(actionId).then((result) => getEditorResponseData<DocumentAction>(result));
    };

    /**
     * This method adds a new action.
     * @returns The ID of the newly created action.
     */
    createAction = async () => {
        const res = await this.#editorAPI;
        return res.createAction().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method duplicates an existing action by the ID
     * @param actionId The ID of a specific action
     * @returns The ID of the duplicated action.
     */
    duplicateAction = async (actionId: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateAction(actionId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method removes the action by the ID
     * @param actionId The ID of a specific action
     * @returns
     */
    removeAction = async (actionId: Id) => {
        const res = await this.#editorAPI;
        return res.removeAction(actionId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames an action by the ID and provided name
     * @param actionId The ID of a specific action
     * @param actionName The new unique name for the action
     * @returns
     */
    renameAction = async (actionId: Id, actionName: string) => {
        const res = await this.#editorAPI;
        return res.renameAction(actionId, actionName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates the script the action uses by the ID and provided script
     * @param actionId The ID of a specific action
     * @param actionScript The JavaScript based action script
     * @returns
     */
    updateActionScript = async (actionId: Id, actionScript: string) => {
        const res = await this.#editorAPI;
        return res.updateActionScript(actionId, actionScript).then((result) => getEditorResponseData<null>(result));
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
