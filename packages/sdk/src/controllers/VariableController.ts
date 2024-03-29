import { EditorAPI, Id } from '../types/CommonTypes';
import { ConnectorRegistration } from '../types/ConnectorTypes';
import { ListVariable, ListVariableItem, Variable, VariableType } from '../types/VariableTypes';
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
    getAll = async () => {
        const res = await this.#editorAPI;
        return res
            .getVariables()
            .then((result) => getEditorResponseData<Variable[]>(result))
            .then((resp) => {
                const update = resp;
                if (update.parsedData) {
                    update.parsedData = this.makeVariablesBackwardsCompatible(update.parsedData);
                }
                return update;
            });
    };

    /**
     * This method returns a variable by id
     * @param id the id of a specific variable
     * @returns
     */
    getById = async (id: string) => {
        const res = await this.#editorAPI;
        return res
            .getVariableById(id)
            .then((result) => getEditorResponseData<Variable>(result))
            .then((resp) => {
                const update = resp;
                if (update.parsedData) {
                    update.parsedData = this.makeVariableBackwardsCompatible(update.parsedData);
                }
                return update;
            });
    };

    /**
     * This method returns a variable by name
     * @param name the name of a specific variable
     * @returns
     */
    getByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res
            .getVariableByName(name)
            .then((result) => getEditorResponseData<Variable>(result))
            .then((resp) => {
                const update = resp;
                if (update.parsedData) {
                    update.parsedData = this.makeVariableBackwardsCompatible(update.parsedData);
                }
                return update;
            });
    };

    /**
     * This method creates a new variable
     * @param parentId parent id of the created variable
     * @param type type of the created variable
     * @returns the new created variable id
     */
    create = async (parentId: string, type: VariableType) => {
        const res = await this.#editorAPI;
        return res.addVariable(parentId, type).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method removes a list of variables.
     *
     * All connectors linked to the variables will be unregistered.
     * @param ids list of the variables to be removed
     * @returns
     */
    remove = async (ids: string[]) => {
        const res = await this.#editorAPI;
        return res.removeVariables(ids).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new name for a variable
     * @param id id of the variable
     * @param name name of the variable
     * @returns
     */
    rename = async (id: string, name: string) => {
        const res = await this.#editorAPI;
        return res.setVariableName(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new label for a variable
     * @param id id of the variable
     * @param label label of the variable
     * @returns
     */
    setLabel = async (id: string, label: string) => {
        const res = await this.#editorAPI;
        return res.setVariableLabel(id, label).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new type for a variable
     * @param id id of the variable
     * @param type type of the variable
     * @returns
     */
    setType = async (id: string, type: VariableType) => {
        const res = await this.#editorAPI;
        return res.setVariableType(id, type).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the items of the list variable
     *
     * The items need to be unique and are not case sensitive.
     *
     * @param id the id of the list variable
     * @param items the items of the list
     * @returns
     */
    setListVariable = async (id: Id, items: string[]) => {
        const res = await this.#editorAPI;
        return res
            .setListVariableItems(
                id,
                items.map((item) => JSON.stringify(<ListVariableItem>{ value: item })),
            )
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new value for a variable
     *
     * @param id the id of the variable
     * @param value the new value of the variable
     * @returns
     */
    setValue = async (id: Id, value: string | boolean | null) => {
        const res = await this.#editorAPI;
        return res.setVariableValue(id, value).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method creates a copy of a variable
     * @returns
     */
    duplicate = async (id: string) => {
        const res = await this.#editorAPI;
        return res.duplicateVariable(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method aggregates the provided variables into a new group
     * @param name name of the new group
     * @param ids list of variable ids to group together
     * @returns group id
     */
    groupVariables = async (name: string, ids: string[]) => {
        const res = await this.#editorAPI;
        return res.groupVariables(name, ids).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method dissolves the specified group
     * @param id id of the variable group
     * @returns
     */
    ungroupVariables = async (id: string) => {
        const res = await this.#editorAPI;
        return res.ungroupVariable(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method moves a variable's position
     * @param order new order of variable
     * @param id id of the variable
     * @param parentId parent id of the created variable
     * @returns
     */
    move = async (order: number, id: string, parentId: string) => {
        const res = await this.#editorAPI;
        return res.moveVariable(id, parentId, order).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of variables
     * @param order new order of variable
     * @param ids Array of the variable IDs
     * @param parentId parent id of the variables
     * @returns
     */
    moveVariables = async (order: number, ids: string[], parentId: string) => {
        const res = await this.#editorAPI;
        return res.moveVariables(ids, parentId, order).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isVisible flag for a variable
     * @returns
     */
    setIsVisible = async (id: string, isVisible: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsVisible(id, isVisible).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @deprecated Use `setIsVisible` instead.
     *
     * This method sets isHidden flag for a variable
     * @returns
     */
    setIsHidden = async (id: string, isHidden: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsVisible(id, !isHidden).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isRequired flag for a variable
     * @returns
     */
    setIsRequired = async (id: string, isRequired: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsRequired(id, isRequired).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isReadonly flag for a variable
     * @returns
     */
    setIsReadonly = async (id: string, isReadonly: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsReadonly(id, isReadonly).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method gets the image variable connector id.
     * @param id The id of the image variable
     * @returns The id of the connector
     */
    getImageVariableConnectorId = async (id: string) => {
        const res = await this.#editorAPI;
        return res.getImageVariableConnectorId(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method sets the image variable connector. Setting a connector will
     * automatically remove the assetId linked to the connector if present.
     * If a connector was the source of the variable, it will be unregistered.
     * @param id The id of the image variable to update
     * @param registration registration object containing all details about the connector
     * @returns The new id of the connector
     */
    setImageVariableConnector = async (id: string, registration: ConnectorRegistration) => {
        const res = await this.#editorAPI;
        return res
            .setImageVariableConnector(id, JSON.stringify(registration))
            .then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * @deprecated use `setValue` instead and pass `null` as the value argument.
     *
     * This method removes the variable source
     * @param id the id of the variable to update
     */
    removeSource = async (id: string) => {
        return this.setValue(id, null);
    };

    private makeVariablesBackwardsCompatible(variables: Variable[]) {
        return variables.map((variable) => {
            return this.makeVariableBackwardsCompatible(variable);
        });
    }

    private makeVariableBackwardsCompatible(variable: Variable) {
        if (variable.type !== VariableType.list) {
            return variable;
        }

        return this.makeListVariableBackwardsCompatible(variable as ListVariable);
    }

    private makeListVariableBackwardsCompatible(listVariable: ListVariable) {
        const updated = listVariable;

        const items = listVariable.items as unknown as ListVariableItem[];
        const selected = listVariable.selected as unknown as ListVariableItem | undefined;

        const newItems = items.map((item) => item.value);

        updated.items = newItems;
        updated.selected = selected?.value;

        return updated;
    }
}
