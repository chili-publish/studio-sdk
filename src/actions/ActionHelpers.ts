// eslint-disable-next-line import/no-unresolved
import { Frame, IHasName, Layout, ListVariable, Page, StylekitChacterStylesController, StylekitColorsController, StylekitParagraphStylesController, Variable, VariableValue } from 'grafx-studio-actions';

/**
 * Whether the variable is the trigger for this action
 * @param variable optional variable name
 * @returns true if it was the trigger, otherwise false
 */
export function isVariableTriggered(variable?: string | Variable): boolean {
    const changedVariable = triggers.changedVariable;

    if (!changedVariable){
        return false;
    }

    let variableName = variable;

    if ((variable as Variable).name) {
        variableName = (variable as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable argument should be of type "string" but was ' + typeof variableName);
    }

   return changedVariable.name.toLocaleLowerCase() === variableName.toLocaleLowerCase();
}

/**
 * Get the triggered variable
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
 * Get the variable
 *
 * @param variableName name of the variable
 */
export function getVariable(variableName: string): Variable {
    try {
        return studio.variables.byName(variableName);
    } catch (error) {
        throw new VariableNotFoundError(variableName);
    }
}

/**
 * Get the value of a variable
 *
 * @param variable layout name, layout object or string variable
 */
export function getVariableValue(variable: string | Variable): VariableValue {
    let variableName = variable;

    if ((variable as Variable).name) {
        variableName = (variable as Variable).name;
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
 * @param variable the variable to update
 * @param value the new variable value
 */
export function setVariableValue(variable: string | Variable, value?: VariableValue) {
    let variableName = variable;

    if ((variable as Variable).name) {
        variableName = (variable as Variable).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('variable should be of type string');
    }

    studio.variables.setValue(variableName, value);
}

/**
 * Copies a variable value from one variable to another
 * @param from variable to copy the value from
 * @param to variable to copy the value to
 */
export function copyVariableValue(from: string | Variable, to: string | Variable) {
    setVariableValue(to, getVariableValue(from));
}

export function getAllOptionsFromList(variable: string | Variable): string[]{
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

    return list.items;
}

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

export function setSelectedFromList(variable: string | Variable, item?: string | VariableValue) {
    let variableName = variable;

    if ((variable as Variable).name) {
        variableName = (variable as Variable).name;
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

export function setFrameX(name: string | Frame | VariableValue, x: number) {
    updateFrame(name, { x: x });
}

export function setFrameY(name: string | Frame | VariableValue, y: number) {
    updateFrame(name, { y: y });
}

export function setFrameWidth(name: string | Frame | VariableValue, width: number) {
    updateFrame(name, { width: width });
}

export function setFrameHeight(name: string | Frame | VariableValue, height: number) {
    updateFrame(name, { height: height });
}

export function setFrameRotation(name: string | Frame | VariableValue, rotation: number) {
    updateFrame(name, { rotation: rotation });
}

export function setFrameVisible(name: string | Frame | VariableValue, visibility: boolean) {
    updateFrame(name, { visibility: visibility });
}

export function updateFrame(
    name: string | Frame | VariableValue, 
    update: { x?: number, y?: number, width?: number, height?: number, rotation?: number, visibility?: boolean },
) {
    const frame = getFrame(name);

    if (update.x){
        frame.setX(update.x);
    } else if (update.y){
        frame.setY(update.y);
    } else if (update.width){
        frame.setWidth(update.width);
    } else if (update.height){
        frame.setHeight(update.height);
    } else if(update.rotation){
        frame.setRotation(update.rotation);
    } else if(update.visibility){
        frame.setVisible(update.visibility);
    }
}

export function assignImageVariableToFrame(variable: string | Variable, frame: string | Frame) {
    let variableName = variable;
    let frameName = frame;

    if ((variable as Variable).name) {
        variableName = (variable as Variable).name;
    }

    if ((frame as Frame).name) {
        frameName = (frame as Frame).name;
    }

    if (typeof variableName !== 'string') {
        throw new Error('from should be of type string');
    }

    if (typeof frameName !== 'string') {
        throw new Error('to should be of type string');
    }

    studio.frames.assignVariable(variableName, frameName);
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
 * @param layout layout name, layout object or string variable
 */
export function selectLayout(layout: string | Layout | VariableValue) {
    let layoutName = layout;

    if ((layout as Layout).name) {
        layoutName = (layout as Layout).name;
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
        super('Layout with name ' + name +' was not found.\nThis function expects any of the following values:\n'+names);
        this.name = this.constructor.name;
    }
}
