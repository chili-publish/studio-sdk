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
     * @returns list of all actions
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getActions().then((result) => getEditorResponseData<DocumentAction[]>(result));
    };

    /**
     * This method returns an action by the id
     * @param actionId the id of a specific action
     * @returns action details
     */
    getById = async (actionId: Id) => {
        const res = await this.#editorAPI;
        return res.getActionById(actionId).then((result) => getEditorResponseData<DocumentAction>(result));
    };

    /**
     * This method creates a new action.
     * @returns the id of the newly created action.
     */
    create = async () => {
        const res = await this.#editorAPI
        return res.createAction().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method duplicates an existing action by the id
     * @param actionId the id of a specific action
     * @returns the id of the duplicated action.
     */
    duplicate = async (actionId: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateAction(actionId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method removes the action by the id
     * @param actionId the id of a specific action
     * @returns
     */
    remove = async (actionId: Id) => {
        const res = await this.#editorAPI;
        return res.removeAction(actionId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames an action by the id and provided name
     * @param actionId the id of a specific action
     * @param name the new unique name for the action
     * @returns
     */
    rename = async (actionId: Id, name: string) => {
        const res = await this.#editorAPI;
        return res.renameAction(actionId, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates the script the action uses by the id and provided script
     * @param actionId the id of a specific action
     * @param actionScript the JavaScript based action script
     * @returns
     */
    updateScript = async (actionId: Id, actionScript: string) => {
        const res = await this.#editorAPI;
        return res.updateActionScript(actionId, actionScript).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates the triggers on which the action will react.
     * @param actionId the id of a specific action
     * @param triggers the triggers this action should react on.
     * @returns
     */
    updateTriggers = async (actionId: Id, triggers: ActionTrigger[]) => {
        const res = await this.#editorAPI;
        return res
            .updateActionTriggers(actionId, JSON.stringify(triggers))
            .then((result) => getEditorResponseData<null>(result));
    };
}
