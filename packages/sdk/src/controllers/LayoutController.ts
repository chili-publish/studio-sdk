import type { EditorAPI, EditorRawAPI, EditorResponse, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Layout, MeasurementUnit, LayoutIntent } from '../types/LayoutTypes';
import { CallSender } from 'penpal';

/**
 * The LayoutController is responsible for all communication regarding Layouts.
 * Methods inside this controller can be called by `window.SDK.layout.{method-name}`
 */
export class LayoutController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;
    #blobAPI: EditorRawAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
        this.#blobAPI = editorAPI as CallSender as EditorRawAPI;
    }

    /**
     * This method returns the list of layouts
     * @returns list of all layouts
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getLayouts().then((result) => getEditorResponseData<Layout[]>(result));
    };

    /**
     * This method returns a layout by its id
     * @param id the id of a specific layout
     * @returns layout properties
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getLayoutById(id).then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method returns a layout by its name
     * @param name the name of a specific layout
     * @returns layout properties
     */
    getByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res.getLayoutByName(name).then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method returns the selected layout
     * @returns layout properties
     */
    getSelected = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedLayout().then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method will remove a specific layout
     * @param id the id of a specific layout
     * @returns
     */
    remove = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeLayout(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will create a new child layout (a new layout is always child of a root / parent)
     * @param parentId the id of a specific layout, being the parent
     * @returns id of new layout
     */
    create = async (parentId: Id) => {
        const res = await this.#editorAPI;
        return res.addLayout(parentId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method will update the name of a specific layout
     * @param id the id of a specific layout
     * @param name the new name that the layout should receive
     * @returns
     */
    rename = async (id: Id, name: string) => {
        const res = await this.#editorAPI;
        return res.renameLayout(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select a specific layout
     * @param id the id of a specific layout
     * @returns
     */
    select = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.selectLayout(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will duplicate a specific layout
     * @param id the id of a specific layout
     * @returns id of specific layout
     */
    duplicate = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateLayout(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method will reset a specific layout to its original value
     * @param id the id of a specific layout
     * @returns
     */
    reset = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayout(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of the layout to a specific value
     * @param id the id of a specific layout
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setHeight = async (id: Id, height: string) => {
        const res = await this.#editorAPI;
        return res.setLayoutHeight(id, height).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the width of the layout to a specific value
     * @param id the id of a specific layout
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setWidth = async (id: Id, width: string) => {
        const res = await this.#editorAPI;
        return res.setLayoutWidth(id, width).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the unit of the layout to a specific value
     *
     * @param id The id of a specific layout
     * @param unit the unit that will be used for the layout. All values in this layout will now be reported in this unit
     * @returns
     */
    setUnit = async (id: Id, unit: MeasurementUnit) => {
        const res = await this.#editorAPI;
        return res.setLayoutUnit(id, unit).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the height of a specific layout to its original value
     * @param id the id of a specific layout
     * @returns
     */
    resetHeight = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutHeight(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the width of a specific layout to its original value
     * @param id the id of a specific layout
     * @returns
     */
    resetWidth = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutWidth(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the unit of a specific layout to its original (inherited) value
     * @param id the id of a specific layout
     * @returns
     */
    resetUnit = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutUnit(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns a UInt8Array containing a PNG encoded image of the currently selected layout.
     * @returns UInt8Array snapshot of the current layout
     */
    getSelectedSnapshot = async () => {
        const res = await this.#blobAPI;
        return res.getPageSnapshot().then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * This method sets the intent of a specific layout. Note that setting the intent for a layout
     * can have side-effects such as updating the measurement unit
     * @param id the id of a specific layout
     * @param intent the intent that will be used for the layout
     */
    setLayoutIntent = async (id: Id, intent: LayoutIntent) => {
        const res = await this.#editorAPI;
        return res.setLayoutIntent(id, intent).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method resets the intent of a specific layout to its original (inherited) value.
     * Note: Calling this on the top layout is not valid
     * 
     * @param id The id of the (child) layout to reset the intent for
     */
    resetLayoutIntent = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutIntent(id).then((result) => getEditorResponseData<null>(result));
    };
}
