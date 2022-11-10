import type { EditorAPI, EditorRawAPI, EditorResponse, Id } from '../../types/CommonTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Layout } from '../../types/LayoutTypes';
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
     * @returns
     */
    getLayouts = async () => {
        const res = await this.#editorAPI;
        return res.getLayouts().then((result) => getEditorResponseData<Layout[]>(result));
    };

    /**
     * This method returns a layout by its id
     * @param id The ID of a specific layout
     * @returns
     */
    getLayoutById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getLayoutById(id).then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method returns a layout by its name
     * @param name The name of a specific layout
     * @returns
     */
    getLayoutByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res.getLayoutByName(name).then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method returns the selected layout
     * @returns
     */
    getSelectedLayout = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedLayout().then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method will remove a specific layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    removeLayout = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.removeLayout(layoutId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will add a new child layout (a new layout is always child of a root / parentlayout)
     * @param parentId The ID of a specific layout, being the parent
     * @returns
     */
    addLayout = async (parentId: Id) => {
        const res = await this.#editorAPI;
        return res.addLayout(parentId).then((result) => getEditorResponseData<number>(result));
    };

    /**
     * This method will update the name of a specific layout
     * @param layoutId The ID of a specific layout
     * @param layoutName The new name that the layout should receive
     * @returns
     */
    setLayoutName = async (layoutId: Id, layoutName: string) => {
        const res = await this.#editorAPI;
        return res.renameLayout(layoutId, layoutName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select a specific layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    selectLayout = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.selectLayout(layoutId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will duplicate a specific layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    duplicateLayout = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateLayout(layoutId).then((result) => getEditorResponseData<number>(result));
    };

    /**
     * This method will reset a specific layout to its original value
     * @param layoutId The ID of a specific layout
     * @returns
     */
    resetLayout = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayout(layoutId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of the layout to a specific value
     * @param layoutId The ID of a specific layout
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setLayoutHeight = async (layoutId: Id, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }
        return res
            .setLayoutHeight(layoutId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the width of the layout to a specific value
     * @param layoutId The ID of a specific layout
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setLayoutWidth = async (layoutId: Id, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setLayoutWidth(layoutId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the height of a specific layout to its original value
     * @param layoutId The ID of a specific layout
     * @returns
     */
    resetLayoutHeight = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutHeight(layoutId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the width of a specific layout to its original value
     * @param layoutId The ID of a specific layout
     * @returns
     */
     resetLayoutWidth = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutWidth(layoutId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns a UInt8Array containing a PNG encoded image of the currently selected layout.
     * @returns UInt8Array snapshot of the current layout
     */
    getSelectedLayoutSnapshot = async () => {
        const res = await this.#blobAPI;
        return res.getPageSnapshot().then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };
}
