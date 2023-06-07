import { EditorAPI } from '../types/CommonTypes';
import {
    Variable,
    ImageVariableSource,
    VariableType,
    ImageVariableSourceType,
    MediaConnectorImageVariableSource,
} from '../types/VariableTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

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
        return res.getVariables().then((result) => getEditorResponseData<Variable[]>(result));
    };

    /**
     * This method returns a variable by id
     * @param variableId The ID of a specific variable
     * @returns
     */
    getVariable = async (variableId: string) => {
        const res = await this.#editorAPI;
        return res.getVariableById(variableId).then((result) => getEditorResponseData<Variable>(result));
    };

    /**
     * This method returns a variable by name
     * @param variableName The name of a specific variable
     * @returns
     */
    getVariableByName = async (variableName: string) => {
        const res = await this.#editorAPI;
        return res.getVariableByName(variableName).then((result) => getEditorResponseData<Variable>(result));
    };

    /**
     * This method adds a new variable
     * @param variableParentId parent ID of the created variable
     * @param variableType type of the created variable
     * @returns The new created variable ID
     */
    createVariable = async (variableParentId: string, variableType: VariableType) => {
        const res = await this.#editorAPI;
        return res.addVariable(variableParentId, variableType).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method removes a list of variables
     * @param variableIds list of the variables to be removed
     * @returns
     */
    removeVariables = async (variableIds: string[]) => {
        const res = await this.#editorAPI;
        return res.removeVariables(variableIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new name for a variable
     * @param variableId ID of the variable
     * @param variableName name of the variable
     * @returns
     */
    setVariableName = async (variableId: string, variableName: string) => {
        const res = await this.#editorAPI;
        return res.setVariableName(variableId, variableName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new label for a variable
     * @param variableId ID of the variable
     * @param variableLabel label of the variable
     * @returns
     */
    setVariableLabel = async (variableId: string, variableLabel: string) => {
        const res = await this.#editorAPI;
        return res.setVariableLabel(variableId, variableLabel).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new type for a variable
     * @param variableId ID of the variable
     * @param variableType type of the variable
     * @returns
     */
    setVariableType = async (variableId: string, variableType: VariableType) => {
        const res = await this.#editorAPI;
        return res.setVariableType(variableId, variableType).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new value for a variable
     *
     * @param variableId the id of the variable
     * @param variableValue the new value of the variable
     * @returns
     */
    setVariableValue = async (variableId: string, variableValue: string | null) => {
        const res = await this.#editorAPI;
        return res.setVariableValue(variableId, variableValue).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method creates a copy of a variable
     * @returns
     */
    duplicateVariable = async (variableId: string) => {
        const res = await this.#editorAPI;
        return res.duplicateVariable(variableId).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method aggregates the provided variables into a new group
     * @param groupName name of the new group
     * @param variableIds list of variable ids to group together
     * @returns
     */
    groupVariables = async (groupName: string, variableIds: string[]) => {
        const res = await this.#editorAPI;
        return res.groupVariables(groupName, variableIds).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method dissolves the specified group
     * @param variableGroupId ID of the variable group
     * @returns
     */
    ungroupVariable = async (variableGroupId: string) => {
        const res = await this.#editorAPI;
        return res.ungroupVariable(variableGroupId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method moves a variable's position
     * @param order new order of variable
     * @param variableId ID of the variable
     * @param variableParentId parent ID of the created variable
     * @returns
     */
    moveVariable = async (order: number, variableId: string, variableParentId: string) => {
        const res = await this.#editorAPI;
        return res.moveVariable(variableId, variableParentId, order).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of variables
     * @param order new order of variable
     * @param variablesIds Array of the variable IDs
     * @param variablesParentId parent ID of the variables
     * @returns
     */
    moveVariables = async (order: number, variableIds: string[], variablesParentId: string) => {
        const res = await this.#editorAPI;
        return res
            .moveVariables(variableIds, variablesParentId, order)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isHidden flag for a variable
     * @returns
     */
    setVariableIsHidden = async (variableId: string, isHidden: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsHidden(variableId, isHidden).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isRequired flag for a variable
     * @returns
     */
    setVariableIsRequired = async (variableId: string, isRequired: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsRequired(variableId, isRequired).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isReadonly flag for a variable
     * @returns
     */
    setVariableIsReadonly = async (variableId: string, isReadonly: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsReadonly(variableId, isReadonly).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @deprecated Use `setVariableValue` and `setImageVariableConnector` instead.
     *
     * This method sets the variable source
     * @param variableId The ID of the variable to update
     * @param variableSource The new variable source
     */
    setVariableSource = async (variableId: string, variableSource?: ImageVariableSource) => {
        const value =
            variableSource && variableSource.sourceType === ImageVariableSourceType.mediaConnector
                ? (variableSource as MediaConnectorImageVariableSource).assetId
                : null;

        return this.setVariableValue(variableId, value);
    };

    /**
     * This method sets the image variable connector. Setting a connector will
     * automatically remove the assetId linked to the connector if present.
     * @param variableId The ID of the image variable to update
     * @param connectorId The new ID of the connector
     * @returns
     */
    setImageVariableConnector = async (variableId: string, connectorId: string) => {
        const res = await this.#editorAPI;
        return res.setImageVariableConnector(variableId, connectorId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @deprecated use `setVariableValue` instead and pass `null` as the value argument.
     *
     * This method removes the variable source
     * @param variableId The ID of the variable to update
     */
    removeVariableSource = async (variableId: string) => {
        return this.setVariableValue(variableId, null);
    };
}
