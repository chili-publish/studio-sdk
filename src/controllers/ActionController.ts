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
     * @param id the id of a specific action
     * @returns action details
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getActionById(id).then((result) => getEditorResponseData<DocumentAction>(result));
    };

    /**
     * This method creates a new action.
     * @returns the id of the newly created action.
     */
    create = async () => {
        const res = await this.#editorAPI;
        return res.createAction().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method duplicates an existing action by the id
     * @param id the id of a specific action
     * @returns the id of the duplicated action.
     */
    duplicate = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateAction(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method removes the action by the id
     * @param id the id of a specific action
     * @returns
     */
    remove = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeAction(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames an action by the id and provided name
     * @param id the id of a specific action
     * @param name the new unique name for the action
     * @returns
     */
    rename = async (id: Id, name: string) => {
        const res = await this.#editorAPI;
        return res.renameAction(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates the script the action uses by the id and provided script
     * @param id the id of a specific action
     * @param actionScript the JavaScript based action script
     * @returns
     */
    updateScript = async (id: Id, actionScript: string) => {
        const res = await this.#editorAPI;
        return res.updateActionScript(id, actionScript).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates the triggers on which the action will react.
     * @param id the id of a specific action
     * @param triggers the triggers this action should react on.
     * @returns
     */
    updateTriggers = async (id: Id, triggers: ActionTrigger[]) => {
        const res = await this.#editorAPI;
        return res
            .updateActionTriggers(id, JSON.stringify(triggers))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of actions
     * @param order the position of actions
     * @param ids the list of action IDs
     * @returns
     */
    move = async (order: number, ids: string[]) => {
        const res = await this.#editorAPI;
        return res.moveActions(order, ids).then((result) => getEditorResponseData<null>(result));
    };
}