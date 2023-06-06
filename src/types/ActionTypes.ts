import { Id } from './CommonTypes';

/**
 * Editor Events that Actions can react to.
 */
export enum ActionEditorEvent {
    /**
     * Indicates the selected layout changed.
     */
    selectedLayoutChanged = 'selectedLayoutChanged',

    /**
     * Indicates a frame was moved, resized, rotated.
     * Note: this does not trigger when a different layout is selected.
     */
    frameMoved = 'frameMoved',

    /**
     * Indicates the size of a page has changed.
     */
    pageSizeChanged = 'pageSizeChanged',

    /**
     * Indicates the document is fully initialized, actions can safely be executed.
     * Note: the other events will only be triggered after a document is fully initialized.
     */
    documentLoaded = 'documentLoaded',

    /**
     * Indicates the value of a variable changed.
     */
    variableValueChanged = 'variableValueChanged',
}

/**
 * Action used by the document.
 */
export interface DocumentAction {
    /**
     * Unique Id of the action.
     */
    id: Id;

    /**
     * Unique action name
     */
    actionName: string;

    /**
     * All the triggers this action will react to.
     */
    triggers: ActionTrigger[];

    /**
     * The JavaScript based action script.
     */
    script: string;
}

/**
 * Trigger used to fire an action.
 */
export type ActionTrigger =
    | SelectedLayoutChangedTrigger
    | FrameMovedTrigger
    | PageSizeChangedTrigger
    | DocumentLoadedTrigger
    | VariableValueChangedTrigger;

export interface SelectedLayoutChangedTrigger {
    event: ActionEditorEvent.selectedLayoutChanged;
}

export interface FrameMovedTrigger {
    event: ActionEditorEvent.frameMoved;
    /**
     * The frame ID's this trigger should react to.
     * Leaving this `undefined`, will make this trigger react to any frame that moves in any direction (also rotation, resize and ).
     */
    triggers?: Id[];
}

export interface PageSizeChangedTrigger {
    event: ActionEditorEvent.pageSizeChanged;
}

export interface DocumentLoadedTrigger {
    event: ActionEditorEvent.documentLoaded;
}

export interface VariableValueChangedTrigger {
    event: ActionEditorEvent.variableValueChanged;

    /**
     * The variable ID's this trigger should react to.
     * Leaving this `undefined`, will make this trigger react to all variableValueChanges.
     */
    triggers?: Id[];
}
