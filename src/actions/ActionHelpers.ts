// eslint-disable-next-line import/no-unresolved
import { Frame, FrameType, IHasName, Layout, ListVariable, Page, StylekitChacterStylesController, StylekitColorsController, StylekitParagraphStylesController, Variable, VariableValue } from 'grafx-studio-actions';

/**
 * Whether the variable is the trigger for this action
 * @param name optional variable name
 * @returns true if it was the trigger, otherwise false
 */
export function isVariableTriggered(name?: string | Variable): boolean {
    const changedVariable = triggers.changedVariable;

    if (!changedVariable){
        return false;
    }

    let variableName = name;

    if (name && (name as Variable).name) {
        variableName = (name as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable argument should be of type "string" but was ' + typeof variableName);
    }

   return changedVariable.name.toLocaleLowerCase() === variableName.toLocaleLowerCase();
}

/**
 * Gets the triggered variable
 */
export function getTriggeredVariable(): Variable {
    const variable = triggers.changedVariable;
    
    if (!variable) {
        // TBD: Throw a friendly runtime error when changedVariable is not defined, this would
        // prevent them from having to if check these things.
        // 
        // However, what if they have multiple triggers? 
        // They would be forced to if check the changedVariable anyway in that case.
        //
        // Return an empty variable object?
        throw new Error('It seems the variable was not the trigger for this action.\nMake sure "Variable Value Changed" was added as a trigger for this action.');
    }

    return variable;
}

/**
 * Gets the variable by name
 *
 * @param name name of the variable
 */
export function getVariable(name: string): Variable {
    try {
        return studio.variables.byName(name);
    } catch (error) {
        // ignore engine error and wrap in user friendly error
        throw new VariableNotFoundError(name);
    }
}

/**
 * Get the value of a variable
 *
 * @param name variable name or variable object
 */
export function getVariableValue(name: string | Variable): VariableValue {
    let variableName = name;

    if ((name as Variable).name) {
        variableName = (name as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable argument should be of type "string" but was ' + typeof variableName);
    }

    try {
        return studio.variables.getValue(variableName);
    } catch (error) {
        throw new VariableNotFoundError(variableName);
    }
}

/**
 * sets the value of a variable
 * @param name the variable to update
 * @param value the new variable value
 */
export function setVariableValue(name: string | Variable, value?: VariableValue) {
    let variableName = name;

    if ((name as Variable).name) {
        variableName = (name as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable should be of type string');
    }

    studio.variables.setValue(variableName, value);
}

/**
 * Copies a variable value from one variable to another
 * @param fromName variable to copy the value from
 * @param toName variable to copy the value to
 */
export function copyVariableValue(fromName: string | Variable, toName: string | Variable) {
    setVariableValue(toName, getVariableValue(fromName));
}

/**
 * Gets all items from the list variable
 * @param name name of the variable
 * @returns 
 */
export function getAllOptionsFromList(name: string | Variable): string[]{
    let variableName = name;

    if ((name as Variable).name) {
        variableName = (name as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable should be of type string');
    }

    const list = getVariable(variableName) as ListVariable;

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    return list.items;
}

/**
 * Gets the selected item from a list variable
 * @param variable name of the variable
 * @returns selected item
 */
export function getSelectedFromList(variable: string | Variable){
    let variableName = variable;

    if ((variable as Variable).name) {
        variableName = (variable as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable should be of type string');
    }

    const list = getVariable(variableName) as ListVariable;

    if (list.type !== 'list') {
        throw new Error('Expected a list variable but got one of type ' + list.type);
    }

    return list.selected;
}

/**
 * Set selected list variable item. The same as setVariableValue but with extra runtime checks.
 * @param name variable name or variable object
 * @param item item to select, undefined to deselect, or text based variable are also allowed
 */
export function setSelectedFromList(name: string | Variable, item?: string | VariableValue) {
    let variableName = name;

    if ((name as Variable).name) {
        variableName = (name as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable should be of type string');
    }

    // 1) This is not needed, but might help with the error message.
    // 2) Since setVariableValue is generic, it might be that you mistype the name
    //    And by accident update a text variable with another string, and you'll not get any
    //    compile/runtime error.
    const list = getVariable(variableName) as ListVariable;

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
export function getTriggeredFrame(): Frame {
    const frame = triggers.changedFrame;
    
    if (!frame) {
        throw new Error('It seems the frame was not the trigger for this action');
    }

    return frame;
}

/**
 * Get the frame
 *
 * @param name name of the variable
 */
export function getFrame(name: string | Frame | VariableValue): Frame {
    let frameName = name;

    if ((name as Frame).name) {
        frameName = (name as Frame).name;
    }

    if (typeof frameName !== 'string') {
        throw new Error('name argument should be of type "string" but was ' + typeof frameName);
    }

    try {
        return studio.frames.byName(frameName);
    } catch (error) {
        throw new FrameNotFoundError(frameName);    
    }
}

/**
 * Get the frame X position
 * @param name frame name
 * @returns 
 */
export function getFrameX(name: string | Frame | VariableValue): number {
    return getFrame(name).x;
}

/**
 * Get the frame Y position
 * @param name frame name
 * @returns 
 */
export function getFrameY(name: string | Frame | VariableValue): number {
    return getFrame(name).y;
}

/**
 * Get the frame width
 * @param name frame name
 * @returns 
 */
export function getFrameWidth(name: string | Frame | VariableValue): number {
    return getFrame(name).width;
}

/**
 * Get the frame height
 * @param name frame name
 * @returns 
 */
export function getFrameHeight(name: string | Frame | VariableValue): number {
    return getFrame(name).height;
}

/**
 * Get the frame height
 * @param name frame name
 * @returns 
 */
export function getFrameRotation(name: string | Frame | VariableValue): number {
    return getFrame(name).rotation;
}

/**
 * Get the frame visibility
 * @param name frame name
 * @returns 
 */
export function getFrameVisibility(name: string | Frame | VariableValue): boolean {
    return getFrame(name).visible;
}

/**
 * Get the frame type
 * @param name frame name
 * @returns 
 */
export function getFrameType(name: string | Frame | VariableValue): FrameType {
    // TBD: Do we need this?
    return getFrame(name).type;
}

/**
 * Sets the frame X position
 * @param name name of the frame, or frame object
 * @param x x position
 */
export function setFrameX(name: string | Frame, x: number | VariableValue) {
    updateFrame(name, { x: x });
}

/**
 * Sets the frame Y position
 * @param name name of the frame, or frame object
 * @param y y position
 */
export function setFrameY(name: string | Frame, y: number | VariableValue ) {
    updateFrame(name, { y: y });
}

/**
 * Sets the width of the frame
 * @param name name of the frame, or frame object
 * @param width frame width
 */
export function setFrameWidth(name: string | Frame, width: number | VariableValue ) {
    updateFrame(name, { width: width });
}

/**
 * Sets the height of the frame
 * @param name name of the frame, or frame object
 * @param height frame height
 */
export function setFrameHeight(name: string | Frame, height: number | VariableValue ) {
    updateFrame(name, { height: height });
}

/**
 * Sets the rotation of the frame
 * @param name name of the frame, or frame object
 * @param rotation rotation of the frame
 */
export function setFrameRotation(name: string | Frame, rotation: number | VariableValue ) {
    updateFrame(name, { rotation: rotation });
}

/**
 * Sets the visibility of the frame
 * @param name name of the frame, or frame object
 * @param visibility whether the frame is visible
 */
export function setFrameVisible(name: string | Frame, visibility: boolean | VariableValue ) {
    updateFrame(name, { visibility: visibility });
}

/**
 * General purpose frame property updater
 * @param name frame name or frame object
 * @param update object to define which properties should be updated
 */
export function updateFrame(
    name: string | Frame, 
    update: { 
        x?: number | VariableValue, 
        y?: number | VariableValue, 
        width?: number | VariableValue, 
        height?: number | VariableValue, 
        rotation?: number | VariableValue, 
        visibility?: boolean | VariableValue 
    },
) {
    // Makes sure the frame exists + allows to use the shorthand syntax
    const frame = getFrame(name);

    if (update.x) {
        if (typeof update.x !== 'number') {
            throw new WrongTypeError('x', typeof update.x, 'number');
        }

        frame.setX(update.x);
    } 
    
    if (update.y) {
        if (typeof update.y !== 'number') {
            throw new WrongTypeError('y', typeof update.y, 'number');
        }

        frame.setY(update.y);
    } 
    
    if (update.width) {
        if (typeof update.width !== 'number') {
            throw new WrongTypeError('width', typeof update.width, 'number');
        }

        frame.setWidth(update.width);
    }
    
    if (update.height) {
        if (typeof update.height !== 'number') {
            throw new WrongTypeError('height', typeof update.height, 'number');
        }
        
        frame.setHeight(update.height);
    }
    
    if (update.rotation) {
        if (typeof update.rotation !== 'number') {
            throw new WrongTypeError('rotation', typeof update.rotation, 'number');
        }

        frame.setRotation(update.rotation);
    }
    
    if(update.visibility) {
        if (typeof update.visibility !== 'boolean') {
            throw new WrongTypeError('visibility', typeof update.visibility, 'boolean');
        }
        
        frame.setVisible(update.visibility);
    }
}

/**
 * Assign image variable to frame
 * @param variableName variable name
 * @param frameName frame name
 */
export function assignImageVariableToFrame(variableName: string | Variable, frameName: string | Frame) {
    let variableOrName = variableName;
    let frameOrName = frameName;

    if ((variableName as Variable).name) {
        variableOrName = (variableName as Variable).name;
    }

    if ((frameName as Frame).name) {
        frameOrName = (frameName as Frame).name;
    }

    if (typeof variableOrName !== 'string') {
        throw new Error('from should be of type string');
    }

    if (typeof frameOrName !== 'string') {
        throw new Error('to should be of type string');
    }

    studio.frames.assignVariable(variableOrName, frameOrName);
}


/**
 * Get the triggered layout
 */
export function getTriggeredLayout(): Layout {
    const layout = triggers.changedLayout;
    
    if (!layout) {
        throw new Error('It seems the layout was not the trigger for this action.\nMake sure "Layout Changed" was added as a trigger for this action.');
    }

    return layout;
}

/**
 * Get selected layout
 */
export function getSelectedLayout(): Layout {
    return studio.layouts.selected();
}


/**
 * Selects a layout
 *
 * VariableValue is allowed to allow the use case to select the layout from the changed variable trigger.
 * This will throw an error at runtime when the argument was not able to be resolved to a string.
 *
 * @param name layout name, layout object or string variable
 */
export function selectLayout(name: string | Layout | VariableValue) {
    let layoutName = name;

    if ((name as Layout).name) {
        layoutName = (name as Layout).name;
    }

    if (typeof layoutName !== 'string') {
        throw new Error('layout argument should be of type "string" but was ' + typeof layoutName);
    }

    try {
        studio.layouts.select(layoutName);
    } catch (error) {
        throw new LayoutNotFoundError(layoutName);
    }
}

/**
 * Get the triggered page
 */
export function getTriggeredPage(): Page {
    const page = triggers.changedPage;
    
    if (!page) {
        // TBD: Throw a friendly runtime error when changedVariable is not defined, this would
        // prevent them from having to if check these things.
        // 
        // However, what if they have multiple triggers? 
        // They would be forced to if check the changedVariable anyway in that case.
        //
        // Return an empty variable object?
        throw new Error('It seems the page was not the trigger for this action.\nMake sure "Page Size Changed" was added as a trigger for this action.');
    }

    return page;
}

/**
 * Get the page
 */
export function getPageSize(): Page {
    return studio.pages.getSize();
}

 /**
 * Set the page size, also allow getVariableValue to be used as arguments
 */
export function setPageSize(width: number | VariableValue, height: number | VariableValue) {
    if (typeof width !== 'number' || typeof height !== 'number'){
        throw Error('Page size arguments needs to be a number');
    }

    studio.pages.setSize(width, height);
 }

export function copyColorFromTo(from: string | IHasName, to: string | IHasName) {
    copyStylekitItem(studio.stylekit.colors, from, to);
}

export function copyParagraphStyleFromTo(from: string | IHasName, to: string | IHasName) {
    copyStylekitItem(studio.stylekit.paragraphStyles, from, to);
}

export function copyCharacterStyleFromTo(from: string | IHasName, to: string | IHasName) {
    copyStylekitItem(studio.stylekit.characterStyles, from, to);
}

export function copyStylekitItem(stylekit: StylekitChacterStylesController | StylekitParagraphStylesController | StylekitColorsController, from: string | IHasName, to: string | IHasName) {
    let fromName = from;
    let toName = to;

    if ((from as IHasName).name) {
        fromName = (from as IHasName).name;
    }

    if ((to as IHasName).name) {
        toName = (to as IHasName).name;
    }

    if (typeof fromName !== 'string') {
        throw new Error('from should be of type string');
    }

    if (typeof toName !== 'string') {
        throw new Error('to should be of type string');
    }

    stylekit.copy(fromName, toName);
}

export class VariableNotFoundError extends Error {
    constructor(name: string) {
        const names = studio.variables.all().map((variable) => variable.name).join(', ');
        super('Variable with name ' + name +' was not found.\nThis function expects any of the following values:\n'+names);
        this.name = this.constructor.name;
    }
}

export class LayoutNotFoundError extends Error {
    constructor(name: string) {
        const names = studio.layouts.all().map((layout) => layout.name).join(', ');
        super('Layout with name ' + name +' was not found.\nThis function expects any of the following values:\n'+names);
        this.name = this.constructor.name;
    }
}

export class FrameNotFoundError extends Error {
    constructor(name: string) {
        const names = studio.layouts.all().map((layout) => layout.name).join(', ');
        super('Frame with name ' + name +' was not found.\nThis function expects any of the following values:\n'+names);
        this.name = this.constructor.name;
    }
}

export class WrongTypeError extends Error {
    constructor(arg: string, type: string, expectedType: string) {
        super('"' + arg + '" expects to be of type ' + expectedType + ' but got one of type ' + type);
        this.name = this.constructor.name;
    }
}
