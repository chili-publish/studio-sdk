// eslint-disable-next-line import/no-unresolved
import { Frame, HasName, Layout, Variable, VariableValue } from 'grafx-studio-actions';


/**
 * Get the triggered variable name
 * @returns the name of the variable
 */
export function getTriggeredVariableName(): string {
    const variable = triggers.changedVariable;
    
    if (!variable) {
        throw new Error('It seems the variable was not the trigger for this action');
    }

    return variable.name;
}

/**
 * Get the triggered variable value
 * @returns the value of the triggered variable
 */
export function getTriggeredVariableValue(): VariableValue {
    const variable = triggers.changedVariable;
    
    if (!variable) {
        throw new Error('It seems the variable was not the trigger for this action');
    }

    return variable.value;
}

/**
 * Get the value of a variable
 * @param variableName variable name or variable object
 * @returns the value of the variable
 */
export function getVariableValue(variableName: string | Variable): VariableValue {
    return studio.variables.getValue(variableName);
}

/**
 * sets the value of a variable
 * @param variableName the name of the variable to update
 * @param value the new variable value (make sure the types are correct)
 */
export function setVariableValue(variableName: string | Variable, value: VariableValue) {
    studio.variables.setValue(variableName, value);
}

/**
 * Gets the visibility of the variable
 * @param name the name of the variable or a variable object
 * @returns true if visible, otherwise false
 */
export function getVariableIsVisible(name: string | Variable): boolean {
    return studio.variables.byName(name).isVisible;
}

/**
 * sets the visibility of the variable
 * @param name the name of the variable or a variable object
 * @param visibility true if visible, otherwise false
 */
export function setVariableVisible(name: string | Variable, visibility: VariableValue) {
    studio.variables.setVisible(name, visibility);
}

/**
 * Copies a variable value from one variable to another
 * @param fromName the name of the variable or a variable object to copy from
 * @param toName the name of the variable or a variable object to copy to
 */
export function copyVariableValueFromTo(fromName: string | Variable, toName: string | Variable) {
    setVariableValue(toName, getVariableValue(fromName));
}

/**
 * Gets all items from the list variable
 * @param variableName name of the variable
 * @returns 
 */
export function getAllItemsFromListVariable(variableName: string | Variable): string[] {
    const list = studio.variables.byName(variableName);

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    return list.items;
}

/**
 * Gets the selected item from a list variable
 * @param variableName name of the variable
 * @returns selected item
 */
export function getSelectedItemFromListVariable(variableName: string | Variable) {
    const list = studio.variables.byName(variableName);

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    return list.selected;
}

/**
 * Set selected list variable item. The same as setVariableValue but with extra runtime checks.
 * @param variableName variable name or variable object
 * @param item item to select, undefined to deselect, or text based variable are also allowed
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
 * Get the triggered frame
 */
export function getTriggeredFrameName(): string {
    const frame = triggers.changedFrame;
    
    if (!frame) {
        throw new Error('It seems the frame was not the trigger for this action');
    }

    return frame.name;
}

/**
 * Get the frame X position
 * @param name frame name
 * @returns 
 */
export function getFrameX(name: string | Frame): number {
    return studio.frames.byName(name).x;
}

/**
 * Get the frame Y position
 * @param name frame name
 * @returns 
 */
export function getFrameY(name: string | Frame): number {
    return studio.frames.byName(name).y;
}

/**
 * Get the frame width
 * @param name frame name
 * @returns 
 */
export function getFrameWidth(name: string | Frame): number {
    return studio.frames.byName(name).width;
}

/**
 * Get the frame height
 * @param name frame name
 * @returns 
 */
export function getFrameHeight(name: string | Frame): number {
    return studio.frames.byName(name).height;
}

/**
 * Get the frame height
 * @param name frame name
 * @returns 
 */
export function getFrameRotation(name: string | Frame): number {
    return studio.frames.byName(name).rotation;
}

/**
 * Get the frame visibility
 * @param name frame name
 * @returns 
 */
export function getFrameVisible(name: string | Frame): boolean {
    return studio.frames.byName(name).isVisible;
}

/**
 * Sets the frame X position
 * @param name name of the frame, or frame object
 * @param x x position
 */
export function setFrameX(name: string | Frame, x: number | VariableValue) {
    studio.frames.byName(name).setX(x);
}

/**
 * Sets the frame Y position
 * @param name name of the frame, or frame object
 * @param y y position
 */
export function setFrameY(name: string | Frame, y: number | VariableValue ) {
    studio.frames.byName(name).setY(y);
}

/**
 * Sets the width of the frame
 * @param name name of the frame, or frame object
 * @param width frame width
 */
export function setFrameWidth(name: string | Frame, width: number | VariableValue ) {
    studio.frames.byName(name).setWidth(width);
}

/**
 * Sets the height of the frame
 * @param name name of the frame, or frame object
 * @param height frame height
 */
export function setFrameHeight(name: string | Frame, height: number | VariableValue ) {
    studio.frames.byName(name).setHeight(height);
}

/**
 * Sets the rotation of the frame
 * @param name name of the frame, or frame object
 * @param rotation rotation of the frame
 */
export function setFrameRotation(name: string | Frame, rotation: number | VariableValue ) {
    studio.frames.byName(name).setRotation(rotation);
}

/**
 * Sets the visibility of the frame
 * @param name name of the frame, or frame object
 * @param visibility whether the frame is visible
 */
export function setFrameVisible(name: string | Frame, visibility: boolean | VariableValue ) {
    studio.frames.byName(name).setVisible(visibility);
}

/**
 * Get the triggered layout name
 */
export function getTriggeredLayoutName(): string {
    const layout = triggers.changedLayout;
    
    if (!layout) {
        throw new Error('It seems the layout was not the trigger for this action');
    }

    return layout.name;
}

/**
 * Get selected layout name
 */
export function getSelectedLayoutName(): string {
    return studio.layouts.getSelected().name;
}

/**
 * Selects a layout
 * @param layoutName the name of the layout to select
 */
export function selectLayout(layoutName: string | Layout | VariableValue) {
    studio.layouts.select(layoutName);
   
}

/**
 * Get the page width
 */
export function getPageWidth(): number {
    return studio.pages.getSize().width;
}

/**
 * Get the page height
 */
export function getPageHeight(): number {
    return studio.pages.getSize().height;
}

 /**
 * Set the page size
 * @param width the new width of the page
 * @param height the new height of the page
 */
export function setPageSize(width: number | VariableValue, height: number | VariableValue) {
    studio.pages.setSize(width, height);
 }

export function copyColorFromTo(from: string | HasName, to: string | HasName) {
    studio.stylekit.colors.copy(from, to);
}

export function copyParagraphStyleFromTo(from: string | HasName, to: string | HasName) {
    studio.stylekit.paragraphStyles.copy(from, to);
}

export function copyCharacterStyleFromTo(from: string | HasName, to: string | HasName) {
    studio.stylekit.characterStyles.copy(from, to);
}
