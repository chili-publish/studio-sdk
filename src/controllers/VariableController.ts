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
     * This method adds a variable to a group
     * @returns
     */
    groupVariable = async (variableId: string, parentId: string) => {
        const res = await this.children;
        return res.groupVariable(variableId, parentId);
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
}
