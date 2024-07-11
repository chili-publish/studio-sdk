// eslint-disable-next-line import/no-unresolved

/**
 * Retrieves the name of the variable that triggered this action.
 *
 * @throws {Error} Throws an error if the action was not triggered by a variable change.
 *
 * @returns {string} The name of the triggered variable.
 */
function getTriggeredVariableName(): string {
    const variable = triggers.variableValueChanged;

    if (!variable) {
        throw new Error(
            'This action was not triggered by a variable value change. Make sure the trigger for this action is set to variable value changed.',
        );
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
function getTriggeredVariableValue(): VariableValue {
    const variable = triggers.variableValueChanged;

    if (!variable) {
        throw new Error(
            'This action was not triggered by a variable value change. Make sure the trigger for this action is set to variable value changed.',
        );
    }

    return variable.value;
}

/**
 * Gets the number variable by name.
 *
 * @throws {Error} Throws an error if the variable type is not a number.
 *
 * @returns {NumberVariable & VariableMethods} The number variable.
 */
function getNumberVariable(variableName: string | Variable): NumberVariable & VariableMethods {
    const numberVariable = studio.variables.byName(variableName);

    if (numberVariable.type !== 'number') {
        throw new Error('Expected a number variable but got one of type ' + numberVariable.type);
    }

    return numberVariable;
}

/**
 * Gets the date variable by name.
 *
 * @throws {Error} Throws an error if the variable type is not a date.
 *
 * @returns {DateVariable & VariableMethods} The number variable.
 */
function getDateVariable(variableName: string | Variable): DateVariable & VariableMethods {
    const dateVariable = studio.variables.byName(variableName);

    if (dateVariable.type !== 'date') {
        throw new Error('Expected a date variable but got one of type ' + dateVariable.type);
    }

    return dateVariable;
}

/**
 * Retrieves the value of a variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {VariableValue} The value of the variable.
 */
function getVariableValue(variableName: string | Variable): VariableValue {
    return studio.variables.getValue(variableName);
}

/**
 * Retrieves the value of a text variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {string} The value of the variable as a string.
 */
function getTextVariableValue(variableName: string | Variable): string {
    return studio.variables.byName(variableName).stringValue;
}

/**
 * Retrieves the value of a boolean variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {boolean} The value of the variable as a boolean.
 */
function getBooleanVariableValue(variableName: string | Variable): boolean {
    return studio.variables.byName(variableName).booleanValue;
}

/**
 * Retrieves the value of a number variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns The value of the variable as a number.
 */
function getNumberVariableValue(variableName: string | Variable): number {
    return studio.variables.byName(variableName).numberValue;
}

/**
 * Retrieves the value of a date variable in UTC by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns The value of the variable as a date in UTC.
 */
function getDateVariableValue(variableName: string | Variable): Date {
    return studio.variables.byName(variableName).dateValue;
}

/**
 * Retrieves the value of a list variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {string} The value of the variable as a string.
 */
function getListVariableValue(variableName: string | Variable): string {
    return studio.variables.byName(variableName).stringValue;
}

/**
 * Retrieves the value of an image variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The variable name or variable object.
 *
 * @returns {string} The value of the variable as a string.
 */
function getImageVariableValue(variableName: string | Variable): string {
    return studio.variables.byName(variableName).stringValue;
}

/**
 * Sets the value of a variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {VariableValue} value - The new variable value (ensure correct types are used). Text variables should get a string value, Boolean variables should get a boolean value, List variables should get the item to select as a string.
 */
function setVariableValue(variableName: string | Variable, value: VariableValue) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of a text variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {string} value - The new text variable value.
 */
function setTextVariableValue(variableName: string | Variable, value: string) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of a boolean variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {boolean} value - The new boolean variable value.
 */
function setBooleanVariableValue(variableName: string | Variable, value: boolean) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of a number variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {number} value - The new number variable value.
 */
function setNumberVariableValue(variableName: string | Variable, value: number) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of a date variable in UTC by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {string | Date | null} value - The new date variable value in UTC as a string, date object or null to reset.
 */
function setDateVariableValue(variableName: string | Variable, value: string | Date | null) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the selected value of a list variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {string} value - The new list variable selected value.
 */
function setListVariableValue(variableName: string | Variable, value: string) {
    studio.variables.setValue(variableName, value);
}

/**
 * Sets the value of an image variable by its name or variable object.
 *
 * @param {string | Variable} variableName - The name of the variable to update.
 * @param {string} value - The new image variable value.
 */
function setImageVariableValue(variableName: string | Variable, value: string) {
    studio.variables.setValue(variableName, value);
}

/**
 * Gets the visibility status of a variable by its name or variable object.
 *
 * @param {string | Variable} name - The name of the variable to check or a variable object.
 *
 * @returns {boolean} `true` if the variable is visible, `false` otherwise.
 */
function getVariableIsVisible(name: string | Variable): boolean {
    return studio.variables.byName(name).isVisible;
}

/**
 * Sets the visibility status of a variable by its name or variable object.
 *
 * @param {string | Variable} name - The name of the variable to update or a variable object.
 * @param {boolean} visibility - `true` to make the variable visible, `false` to hide it.
 */
function setVariableVisible(name: string | Variable, visibility: VariableValue) {
    studio.variables.setVisible(name, visibility);
}

/**
 * Copies the value of one variable to another variable by their names or variable objects.
 *
 * @param {string | Variable} fromName - The name of the variable or a variable object to copy from.
 * @param {string | Variable} toName - The name of the variable or a variable object to copy to.
 */
function copyVariableValueFromTo(fromName: string | Variable, toName: string | Variable) {
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
function getAllItemsFromListVariable(variableName: string | Variable): string[] {
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
function getSelectedItemFromListVariable(variableName: string | Variable) {
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
function setSelectedItemFromListVariable(variableName: string | Variable, item: string | VariableValue) {
    const list = studio.variables.byName(variableName);

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    if (item && typeof item !== 'string') {
        throw new Error('Expected the selected item to be of type string, but got one of type ' + typeof item);
    }

    setVariableValue(variableName, item);
}

/**
 * Set decimal separator of the number variable.
 *
 * @param {string | Variable} variableName - The name of the number variable or a variable object.
 *
 * @param separator The decimal separator (`''`, `'.'`, `','`, `' '`).
 */
function setNumberVariableDecimalSeparator(variableName: string | Variable, separator: NumberSeparator) {
    const numberVar = getNumberVariable(variableName);

    numberVar.setDecimalSeparator(separator);
}

/**
 * Set thousands separator of the number variable.
 *
 * @param {string | Variable} variableName - The name of the number variable or a variable object.
 *
 * @param separator The thousands separator (`''`, `'.'`, `','`, `' '`).
 */
function setNumberVariableThousandsSeparator(variableName: string | Variable, separator: NumberSeparator) {
    const numberVar = getNumberVariable(variableName);

    numberVar.setThousandsSeparator(separator);
}

/**
 * Set display format of the date variable.
 *
 * The `displayFormat` is using ICU formatting (Unicode).
 *
 * Supported date formats:
 * - Day -> `d`, `dd`
 * - Month -> `M`, `MM`, `MMM`, `MMMM`
 * - Year -> `yy`, `yyyy`
 * - Day of week -> `ccc`, `cccc`
 *
 * Examples for an input date of `10-12-1815`:
 * - Format `dd/MM/yyyy` will display `12/10/1815`
 * - Format `d.M.yy` will display `12.10.15`
 * - Format `d MMM yyyy` will display `12 Oct 1815` for the `en_US` language
 * - Format `MMMM d, yyyy` will display `October 12, 1815` for the `en_US` language
 * - Format `ccc, MMM d, yyyy` will display `Thu, Oct 12, 1815` for the `en_US` language
 * - Format `cccc, MMMM d, yyyy` will display `Thursday, October 12, 1815` for the `en_US` language
 * - Format `cccc, MMMM d, yyyy` will display `donderdag, oktober 12, 1815` for the `nl` language
 *
 * Patterns which output words such as `MM`, `MMM`, `MMMM`, `cc` and `ccc` will
 * differ depending on chosen language (default is `en_US`).
 *
 * @param {string | Variable} variableName - The name of the date variable or a variable object.
 *
 * @param displayFormat The display format (`'yyyy-MM-dd'`).
 */
function setDateVariableDisplayFormat(variableName: string | Variable, displayFormat: string) {
    const dateVar = getDateVariable(variableName);

    dateVar.setDisplayFormat(displayFormat);
}

/**
 * Set language of the date variable.
 *
 * @param {string | Variable} variableName - The name of the date variable or a variable object.
 *
 * @param language The language (`'en_US'`, `'fi'`, `'fr'`...).
 */
function setDateVariableLanguage(variableName: string | Variable, language: Language) {
    const dateVar = getDateVariable(variableName);

    dateVar.setLanguage(language);
}

/**
 * Get the name of the frame that triggered this action.
 *
 * @returns {string} The name of the triggered frame.
 *
 * @throws {Error} Throws an error if the action was not triggered by a frame moved.
 */
function getTriggeredFrameName(): string {
    const frame = triggers.frameMoved;

    if (!frame) {
        throw new Error(
            'This action was not triggered by a frame moved trigger. Make sure the trigger for this action is set to frame moved.',
        );
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
function getFrameX(name: string | Frame): number {
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
function getFrameY(name: string | Frame): number {
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
function getFrameWidth(name: string | Frame): number {
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
function getFrameHeight(name: string | Frame): number {
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
function getFrameRotation(name: string | Frame): number {
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
function getFrameVisible(name: string | Frame): boolean {
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
function setFrameX(name: string | Frame, x: number | VariableValue) {
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
function setFrameY(name: string | Frame, y: number | VariableValue) {
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
function setFrameWidth(name: string | Frame, width: number | VariableValue) {
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
function setFrameHeight(name: string | Frame, height: number | VariableValue) {
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
function setFrameRotation(name: string | Frame, rotation: number | VariableValue) {
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
function setFrameVisible(name: string | Frame, visibility: boolean | VariableValue) {
    studio.frames.byName(name).setVisible(visibility);
}

/**
 * Get the name of the layout that triggered the action.
 *
 * @returns {string} The name of the triggered layout.
 *
 * @throws {Error} Throws an error if the action was not triggered by a selected layout change.
 */
function getTriggeredLayoutName(): string {
    const layout = triggers.selectedLayoutChanged;

    if (!layout) {
        throw new Error(
            'This action was not triggered by a variable value change. Make sure the trigger for this action is set to selected layout changed.',
        );
    }

    return layout.name;
}

/**
 * Get the name of the currently selected layout.
 *
 * @returns {string} The name of the selected layout.
 */
function getSelectedLayoutName(): string {
    return studio.layouts.getSelected().name;
}

/**
 * Selects a layout by its name or layout object.
 *
 * @param {string | Layout | VariableValue} layoutName - The name of the layout or a variable value holding the layout name or a layout object to select.
 */
function selectLayout(layoutName: string | Layout | VariableValue) {
    studio.layouts.select(layoutName);
}

/**
 * Get the width of the current page.
 *
 * @returns {number} The width of the page in pixels.
 */
function getPageWidth(): number {
    return studio.pages.getSize().width;
}

/**
 * Get the height of the current page.
 *
 * @returns {number} The width of the page in pixels.
 */
function getPageHeight(): number {
    return studio.pages.getSize().height;
}

/**
 * Set the size of the current page.
 *
 * @param {number | VariableValue} width - The new width of the page.
 * @param {number | VariableValue} height - The new height of the page.
 */
function setPageSize(width: number | VariableValue, height: number | VariableValue) {
    studio.pages.setSize(width, height);
}

/**
 * Copy a stylekit color.
 *
 * @param {string} from - The name of the source character style.
 * @param {string} to - The name of the target character style.
 */
function copyColorFromTo(from: string, to: string) {
    studio.stylekit.colors.copy(from, to);
}

/**
 * Copy a stylekit paragraph style.
 *
 * @param {string} from - The name of the source character style.
 * @param {string} to - The name of the target character style.
 */
function copyParagraphStyleFromTo(from: string, to: string) {
    studio.stylekit.paragraphStyles.copy(from, to);
}

/**
 * Copy a stylekit character style.
 *
 * @param {string} from - The name of the source character style.
 * @param {string} to - The name of the target character style.
 */
function copyCharacterStyleFromTo(from: string, to: string) {
    studio.stylekit.characterStyles.copy(from, to);
}
