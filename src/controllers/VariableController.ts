import { EditorAPI } from '../../types/CommonTypes';
import { VariableType } from '../../types/VariableTypes';

/**
 * The VariableController is responsible for all communication regarding the variables.
 * Methods inside this controller can be called by `window.SDK.variable.{method-name}`
 */
export class VariableController {
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
     * This method returns the list of variables
     * @returns
     */
    getVariables = async () => {
        const res = await this.#editorAPI;
        return res.getVariables();
    };

    /**
     * This method returns a variable by id
     * @param variableId The ID of a specific variable
     * @returns
     */
    getVariableById = async (variableId: string) => {
        const res = await this.#editorAPI;
        return res.getVariableById(variableId);
    };

    /**
     * This method returns a variable by name
     * @param variableName The name of a specific variable
     * @returns
     */
    getVariableByName = async (variableName: string) => {
        const res = await this.#editorAPI;
        return res.getVariableByName(variableName);
    };

    /**
     * This method adds a new variable
     * @returns The new created variable id
     */
    addVariable = async (parentId: string, variableType: VariableType) => {
        const res = await this.#editorAPI;
        return res.addVariable(parentId, variableType);
    };

    /**
     * This method removes variable
     * @returns
     */
    removeVariable = async (variableId: string) => {
        const res = await this.#editorAPI;
        return res.removeVariable(variableId);
    };

    /**
     * This method sets a new name for a variable
     * @returns
     */
    setVariableName = async (variableId: string, name: string) => {
        const res = await this.#editorAPI;
        return res.setVariableName(variableId, name);
    };

    /**
     * This method sets a new label for a variable
     * @returns
     */
    setVariableLabel = async (variableId: string, label: string) => {
        const res = await this.#editorAPI;
        return res.setVariableLabel(variableId, label);
    };

    /**
     * This method sets a new type for a variable
     * @returns
     */
    setVariableType = async (variableId: string, type: VariableType) => {
        const res = await this.#editorAPI;
        return res.setVariableType(variableId, type);
    };

    /**
     * This method sets a new value for a variable
     * @returns
     */
    setDefaultVariableValue = async (variableId: string, value: string) => {
        const res = await this.#editorAPI;
        return res.setDefaultVariableValue(variableId, value);
    };

    /**
     * This method sets a new value for a variable
     * @returns
     */
    setVariableValue = async (variableId: string, value: string) => {
        const res = await this.#editorAPI;
        return res.setVariableValue(variableId, value);
    };

    /**
     * This method creates a copy of a variable
     * @returns
     */
    duplicateVariable = async (variableId: string) => {
        const res = await this.#editorAPI;
        return res.duplicateVariable(variableId);
    };

    /**
     * This method aggregates the provided variables into a new group
     * @returns
     */
    groupVariables = async (groupName: string, variableIds: string[]) => {
        const res = await this.#editorAPI;
        return res.groupVariables(groupName, variableIds);
    };

    /**
     * This method dissolves the specified group
     * @returns
     */
    ungroupVariable = async (groupId: string) => {
        const res = await this.#editorAPI;
        return res.ungroupVariable(groupId);
    };

    /**
     * This method moves a variable's position
     * @returns
     */
    moveVariable = async (variableId: string, parentId: string, orderIndex: number) => {
        const res = await this.#editorAPI;
        return res.moveVariable(variableId, parentId, orderIndex);
    };

    /**
     * This method sets isHidden flag for a variable
     * @returns
     */
    setVariableIsHidden = async (variableId: string, isHidden: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsHidden(variableId, isHidden);
    };

    /**
     * This method sets isRequired flag for a variable
     * @returns
     */
    setVariableIsRequired = async (variableId: string, isRequired: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsRequired(variableId, isRequired);
    };

    /**
     * This method sets isReadonly flag for a variable
     * @returns
     */
    setVariableIsReadonly = async (variableId: string, isReadonly: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsReadonly(variableId, isReadonly);
    };
}
