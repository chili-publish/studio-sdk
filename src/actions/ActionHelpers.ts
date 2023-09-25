// eslint-disable-next-line import/no-unresolved
import { Frame, Layout, Variable, VariableValue } from 'grafx-studio-actions';


/**
 * Retrieves the name of the variable that triggered this action.
 *
 * @throws {Error} Throws an error if the action was not triggered by a variable change.
 *
 * @returns {string} The name of the triggered variable.
 */
export function getTriggeredVariableName(): string {
    const variable = triggers.variableValueChanged;
    
    if (!variable) {
        throw new Error('This action was not triggered by a variable value change. Make sure the trigger for this action is set to variable value changed.');
    }

    return variable.name;
}

/**
 * Retrieves the value of the variable that triggered this action.
 *
 * @throws {Error} Throws an error if the action was not triggered by a variable value change.
 *
 * @returns {VariableValue} The value of the triggered variable.
 */
export function getTriggeredVariableValue(): VariableValue {
    const variable = triggers.variableValueChanged;

    if (!variable) {
        throw new Error('This action was not triggered by a variable value change. Make sure the trigger for this action is set to variable value changed.');
    }

    return variable.value;
}

/**
 * Retrieves the value of a variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {VariableValue} The value of the variable.
 */
export function getVariableValue(variableName: string | Variable): VariableValue {
    return studio.variables.getValue(variableName);
}

/**
 * Retrieves the value of a text variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {string} The value of the variable as a string.
 */
export function getTextVariableValue(variableName: string | Variable): string {
    return studio.variables.byName(variableName).stringValue;
}

/**
 * Retrieves the value of a boolean variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {boolean} The value of the variable as a boolean.
 */
export function getBooleanVariableValue(variableName: string | Variable): boolean {
    return studio.variables.byName(variableName).booleanValue;
}

/**
 * Retrieves the value of a list variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {string} The value of the variable as a string.
 */
export function getListVariableValue(variableName: string | Variable): string {
    return studio.variables.byName(variableName).stringValue;
}

/**
 * Retrieves the value of an image variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {string} The value of the variable as a string.
 */
export function getImageVariableValue(variableName: string | Variable): string {
    return studio.variables.byName(variableName).stringValue;
}

/**
 * Sets the value of a variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {VariableValue} value - The new variable value (ensure correct types are used). Text variables should get a string value, Boolean variables should get a boolean value, List variables should get the item to select as a string.
 */
export function setVariableValue(variableName: string | Variable, value: VariableValue) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of a text variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {string} value - The new text variable value.
 */
export function setTextVariableValue(variableName: string | Variable, value: string) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of a boolean variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {boolean} value - The new boolean variable value.
 */
export function setBooleanVariableValue(variableName: string | Variable, value: boolean) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the selected value of a list variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {string} value - The new list variable selected value.
 */
export function setListVariableValue(variableName: string | Variable, value: string) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of an image variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {string} value - The new image variable value.
 */
export function setImageVariableValue(variableName: string | Variable, value: string) {
    studio.variables.setValue(variableName, value);
}

/**
 * Gets the visibility status of a variable by its name or variable object.
 *
 * @param {string | Variable} name - The name of the variable to check or a variable object.
 *
 * @returns {boolean} `true` if the variable is visible, `false` otherwise.
 */
export function getVariableIsVisible(name: string | Variable): boolean {
    return studio.variables.byName(name).isVisible;
}

/**
 * Sets the visibility status of a variable by its name or variable object.
 *
 * @param {string | Variable} name - The name of the variable to update or a variable object.
 * @param {boolean} visibility - `true` to make the variable visible, `false` to hide it.
 */
export function setVariableVisible(name: string | Variable, visibility: VariableValue) {
    studio.variables.setVisible(name, visibility);
}

/**
 * Copies the value of one variable to another variable by their names or variable objects.
 *
 * @param {string | Variable} fromName - The name of the variable or a variable object to copy from.
 * @param {string | Variable} toName - The name of the variable or a variable object to copy to.
 */
export function copyVariableValueFromTo(fromName: string | Variable, toName: string | Variable) {
    setVariableValue(toName, getVariableValue(fromName));
}

/**
 * Retrieves all items from a list variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the list variable to retrieve items from or a list variable object.
 *
 * @returns {string[]} An array containing all items from the list variable.
 *
 * @throws {Error} Throws an error if the variable is not a list variable.
 */
export function getAllItemsFromListVariable(variableName: string | Variable): string[] {
    const list = studio.variables.byName(variableName);

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    return list.items;
}

/**
 * Retrieves the selected item from a list variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the list variable to retrieve the selected item from or a list variable object.
 *
 * @returns {string | null} The selected item from the list variable, or `null` if none is selected.
 *
 * @throws {Error} Throws an error if the variable is not of type 'list'.
 */
export function getSelectedItemFromListVariable(variableName: string | Variable) {
    const list = studio.variables.byName(variableName);

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    return list.selected;
}

/**
 * Set the selected item in a list variable. Provides additional runtime checks.
 * 
 * @param {string | Variable} variableName - The name of the list variable or a variable object.
 * 
 * @param {string | VariableValue} item - The item to select, null to deselect, or text-based variables are also allowed.
 * 
 * @throws {Error} If the variable is not of type 'list' or if the selected item is not a string or undefined.
 */
export function setSelectedItemFromListVariable(variableName: string | Variable, item: string | VariableValue) {
    const list = studio.variables.byName(variableName);

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    if (item && typeof item !== 'string'){
        throw new Error('Expected the selected item to be of type string, but got one of type ' + typeof item);
    }

    setVariableValue(variableName, item);
}

/**
 * Get the name of the frame that triggered this action.
 *
 * @returns {string} The name of the triggered frame.
 *
 * @throws {Error} Throws an error if the action was not triggered by a frame moved.
 */
export function getTriggeredFrameName(): string {
    const frame = triggers.frameMoved;
    
    if (!frame) {
        throw new Error('This action was not triggered by a frame moved trigger. Make sure the trigger for this action is set to frame moved.');
    }

    return frame.name;
}

/**
 * Get the X position of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 *
 * @returns {number} The X position of the frame.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function getFrameX(name: string | Frame): number {
    return studio.frames.byName(name).x;
}

/**
 * Get the Y position of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 *
 * @returns {number} The Y position of the frame.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function getFrameY(name: string | Frame): number {
    return studio.frames.byName(name).y;
}

/**
 * Get the width of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 *
 * @returns {number} The width of the frame.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function getFrameWidth(name: string | Frame): number {
    return studio.frames.byName(name).width;
}

/**
 * Get the height of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 *
 * @returns {number} The height of the frame.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function getFrameHeight(name: string | Frame): number {
    return studio.frames.byName(name).height;
}

/**
 * Get the rotation of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 *
 * @returns {number} The rotation of the frame.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function getFrameRotation(name: string | Frame): number {
    return studio.frames.byName(name).rotation;
}

/**
 * Get the visibility of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 *
 * @returns {boolean} The visibility of the frame.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function getFrameVisible(name: string | Frame): boolean {
    return studio.frames.byName(name).isVisible;
}

/**
 * Sets the X position of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 * @param {number | VariableValue} x - The new X position.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function setFrameX(name: string | Frame, x: number | VariableValue) {
    studio.frames.byName(name).setX(x);
}

/**
 * Sets the X position of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 * @param {number | VariableValue} y - The new Y position.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function setFrameY(name: string | Frame, y: number | VariableValue) {
    studio.frames.byName(name).setY(y);
}

/**
 * Sets the width of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 * @param {number | VariableValue} width - The new width.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function setFrameWidth(name: string | Frame, width: number | VariableValue) {
    studio.frames.byName(name).setWidth(width);
}

/**
 * Sets the height of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 * @param {number | VariableValue} height - The new height.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function setFrameHeight(name: string | Frame, height: number | VariableValue) {
    studio.frames.byName(name).setHeight(height);
}

/**
 * Sets the rotation of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 * @param {number | VariableValue} rotation - The new rotation.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function setFrameRotation(name: string | Frame, rotation: number | VariableValue) {
    studio.frames.byName(name).setRotation(rotation);
}

/**
 * Sets the visibility of a frame.
 *
 * @param {string | Frame} name - The name of the frame or a frame object.
 * @param {boolean | VariableValue} visibility - The frame visibility.
 *
 * @throws {Error} Throws an error if the specified frame does not exist.
 */
export function setFrameVisible(name: string | Frame, visibility: boolean | VariableValue) {
    studio.frames.byName(name).setVisible(visibility);
}

/**
 * Get the name of the layout that triggered the action.
 *
 * @returns {string} The name of the triggered layout.
 *
 * @throws {Error} Throws an error if the action was not triggered by a selected layout change.
 */
export function getTriggeredLayoutName(): string {
    const layout = triggers.selectedLayoutChanged;
    
    if (!layout) {
        throw new Error('This action was not triggered by a variable value change. Make sure the trigger for this action is set to selected layout changed.');
    }

    return layout.name;
}

/**
 * Get the name of the currently selected layout.
 *
 * @returns {string} The name of the selected layout.
 */
export function getSelectedLayoutName(): string {
    return studio.layouts.getSelected().name;
}

/**
 * Selects a layout by its name or layout object.
 *
 * @param {string | Layout | VariableValue} layoutName - The name of the layout or a variable value holding the layout name or a layout object to select.
 */
export function selectLayout(layoutName: string | Layout | VariableValue) {
    studio.layouts.select(layoutName);
}

/**
 * Get the width of the current page.
 *
 * @returns {number} The width of the page in pixels.
 */
export function getPageWidth(): number {
    return studio.pages.getSize().width;
}

/**
 * Get the height of the current page.
 *
 * @returns {number} The width of the page in pixels.
 */
export function getPageHeight(): number {
    return studio.pages.getSize().height;
}

/**
 * Set the size of the current page.
 *
 * @param {number | VariableValue} width - The new width of the page.
 * @param {number | VariableValue} height - The new height of the page.
 */
export function setPageSize(width: number | VariableValue, height: number | VariableValue) {
    studio.pages.setSize(width, height);
 }

/**
 * Copy a stylekit color.
 *
 * @param {string | HasName} from - The name of the source character style.
 * @param {string | HasName} to - The name of the target character style.
 */
export function copyColorFromTo(from: string, to: string) {
    studio.stylekit.colors.copy(from, to);
}

/**
 * Copy a stylekit paragraph style.
 *
 * @param {string | HasName} from - The name of the source character style.
 * @param {string | HasName} to - The name of the target character style.
 */
export function copyParagraphStyleFromTo(from: string, to: string) {
    studio.stylekit.paragraphStyles.copy(from, to);
}

/**
 * Copy a stylekit character style.
 *
 * @param {string | HasName} from - The name of the source character style.
 * @param {string | HasName} to - The name of the target character style.
 */
export function copyCharacterStyleFromTo(from: string, to: string) {
    studio.stylekit.characterStyles.copy(from, to);
}
