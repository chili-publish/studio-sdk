import { EditorAPI } from '../types/CommonTypes';
import {
    Variable,
    VariableMoves,
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
    getVariableById = async (variableId: string) => {
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
     * @returns The new created variable id
     */
    addVariable = async (parentId: string, variableType: VariableType) => {
        const res = await this.#editorAPI;
        return res.addVariable(parentId, variableType).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method removes a list of variables
     * @returns
     */
    removeVariables = async (variableIds: string[]) => {
        const res = await this.#editorAPI;
        return res.removeVariables(variableIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new name for a variable
     * @returns
     */
    setVariableName = async (variableId: string, name: string) => {
        const res = await this.#editorAPI;
        return res.setVariableName(variableId, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new label for a variable
     * @returns
     */
    setVariableLabel = async (variableId: string, label: string) => {
        const res = await this.#editorAPI;
        return res.setVariableLabel(variableId, label).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new type for a variable
     * @returns
     */
    setVariableType = async (variableId: string, type: VariableType) => {
        const res = await this.#editorAPI;
        return res.setVariableType(variableId, type).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the items of the list variable
     * 
     * The items need to be unique and are not case sensitive. 
     *
     * @param variableId the id of the list variable
     * @param items the items of the list
     * @returns
     */
    setListVariableItems = async (variableId: string, items: string[]) => {
        const res = await this.#editorAPI;
        return res.setListVariableItems(variableId, items).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new value for a variable
     *
     * @param variableId the id of the variable
     * @param value the new value of the variable
     * @returns
     */
    setVariableValue = async (variableId: string, value: string | null) => {
        const res = await this.#editorAPI;
        return res.setVariableValue(variableId, value).then((result) => getEditorResponseData<null>(result));
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
     * @returns
     */
    groupVariables = async (groupName: string, variableIds: string[]) => {
        const res = await this.#editorAPI;
        return res.groupVariables(groupName, variableIds).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method dissolves the specified group
     * @returns
     */
    ungroupVariable = async (groupId: string) => {
        const res = await this.#editorAPI;
        return res.ungroupVariable(groupId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method moves a variable's position
     * @returns
     */
    moveVariable = async (variableId: string, parentId: string, orderIndex: number) => {
        const res = await this.#editorAPI;
        return res.moveVariable(variableId, parentId, orderIndex).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of variables
     * @returns
     */
    moveVariables = async (movedVariables: VariableMoves) => {
        const res = await this.#editorAPI;
        return res
            .moveVariables(movedVariables.moves, movedVariables.parent, movedVariables.order)
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
     * @param src The new variable source
     */
    setVariableSource = async (variableId: string, src?: ImageVariableSource) => {
        const value =
            src && src.sourceType === ImageVariableSourceType.mediaConnector
                ? (src as MediaConnectorImageVariableSource).assetId
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
