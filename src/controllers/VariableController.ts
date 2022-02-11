import { Child, ConfigType } from '../../types/CommonTypes';
import { VariableType } from '../../types/VariableTypes';

/**
 * The VariableController is responsible for all communication regarding the variables.
 * Methods inside this controller can be called by `window.SDK.variable.{method-name}`
 */
export class VariableController {
    /**
     * @ignore
     */
    children: Child;
    /**
     * @ignore
     */
    config: ConfigType;

    /**
     * @ignore
     */
    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    /**
     * This method returns the list of variables
     * @returns
     */
    getVariableList = async () => {
        const res = await this.children;
        return res.getVariableList();
    };

    /**
     * This method returns a variable by id
     * @returns
     */
    getVariable = async (variableId: string) => {
        const res = await this.children;
        return res.getVariable(variableId);
    };

    /**
     * This method adds a new variable
     * @returns The new created variable id
     */
    addVariable = async (parentId: string, variableType: VariableType) => {
        const res = await this.children;
        return res.addVariable(parentId, variableType);
    };

    /**
     * This method removes variable
     * @returns
     */
    removeVariable = async (variableId: string) => {
        const res = await this.children;
        return res.removeVariable(variableId);
    };

    /**
     * This method sets a new name for a variable
     * @returns
     */
    setVariableName = async (variableId: string, name: string) => {
        const res = await this.children;
        return res.setVariableName(variableId, name);
    };

    /**
     * This method sets a new label for a variable
     * @returns
     */
    setVariableLabel = async (variableId: string, label: string) => {
        const res = await this.children;
        return res.setVariableLabel(variableId, label);
    };

    /**
     * This method sets a new type for a variable
     * @returns
     */
    setVariableType = async (variableId: string, type: VariableType) => {
        const res = await this.children;
        return res.setVariableType(variableId, type);
    };

    /**
     * This method sets a new value for a variable
     * @returns
     */
    setDefaultVariableValue = async (variableId: string, value: string) => {
        const res = await this.children;
        return res.setDefaultVariableValue(variableId, value);
    };

    /**
     * This method sets a new value for a variable
     * @returns
     */
    setVariableValue = async (variableId: string, value: string) => {
        const res = await this.children;
        return res.setVariableValue(variableId, value);
    };

    /**
     * This method creates a copy of a variable
     * @returns
     */
    duplicateVariable = async (variableId: string) => {
        const res = await this.children;
        return res.duplicateVariable(variableId);
    };

    /**
     * This method aggregates the provided variables into a new group
     * @returns
     */
    groupVariables = async (groupName: string, variableIds: string[]) => {
        const res = await this.children;
        return res.groupVariables(groupName, variableIds);
    };

    /**
     * This method moves a variable's position
     * @returns
     */
    moveVariable = async (variableId: string, parentId: string, orderIndex: number) => {
        const res = await this.children;
        return res.moveVariable(variableId, parentId, orderIndex);
    };

    /**
     * This method sets isHidden flag for a variable
     * @returns
     */
    setVariableIsHidden = async (variableId: string, isHidden: boolean) => {
        const res = await this.children;
        return res.setVariableIsHidden(variableId, isHidden);
    };

    /**
     * This method sets isRequired flag for a variable
     * @returns
     */
    setVariableIsRequired = async (variableId: string, isRequired: boolean) => {
        const res = await this.children;
        return res.setVariableIsRequired(variableId, isRequired);
    };

    /**
     * This method sets isReadonly flag for a variable
     * @returns
     */
    setVariableIsReadonly = async (variableId: string, isReadonly: boolean) => {
        const res = await this.children;
        return res.setVariableIsReadonly(variableId, isReadonly);
    };
}
