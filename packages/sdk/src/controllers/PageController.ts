import { EditorAPI, EditorRawAPI, EditorResponse, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Page, SnapshotSettings } from '../types/PageTypes';
import { CallSender } from 'penpal';

/**
 * The PageController is responsible for all communication regarding Pages.
 * Methods inside this controller can be called by `window.SDK.page.{method-name}`
 */
export class PageController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    #blobAPI: EditorRawAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
        this.#blobAPI = editorAPI as CallSender as EditorRawAPI;
    }

    /**
     * @experimental
     * This method adds a new page.
     * @returns the id of the new page
     */
    add = async () => {
        const res = await this.#editorAPI;
        return res.addPage().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * @experimental
     * This method removes a certain page.
     * @param pageId the id of the page
     * @returns the id of the current active page
     */
    remove = async (pageId: Id) => {
        const res = await this.#editorAPI;
        return res.removePage(pageId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * @experimental
     * This method selects a certain page to be the active page.
     * @param pageId the id of the page
     * @returns
     */
    select = async (pageId: Id) => {
        const res = await this.#editorAPI;
        return res.selectPage(pageId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method sets the page's visibility.
     * @param pageId the id of the page
     * @param isVisible the visibility of the page
     * @returns
     */
    setVisibility = async (pageId: Id, isVisible: boolean) => {
        const res = await this.#editorAPI;
        return res.setPageIsVisible(pageId, isVisible).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method duplicates a certain page.
     * @param pageId the id of the page
     * @returns
     */
    duplicate = async (pageId: Id) => {
        const res = await this.#editorAPI;
        return res.duplicatePage(pageId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns the list of pages
     * @returns list of all pages
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getPages().then((result) => getEditorResponseData<Page[]>(result));
    };

    /**
     * This method returns a page by its id
     * @param pageId the id of a specific page
     * @returns page properties
     */
    getById = async (pageId: Id) => {
        const res = await this.#editorAPI;
        return res.getPageById(pageId).then((result) => getEditorResponseData<Page>(result));
    };

    /**
     * This method returns a UInt8Array containing a PNG encoded image of the page.
     * @param pageId The id of a specific page.
     * If not specified, selected page snapshot will be provided
     * @param settings an object to specify desired snapshot properties, e.g., resolution.
     * If it's not provided, default settings will be applied, e.g., page resolution.
     * Limit for `largestAxisSize` is 1000 px
     * @returns UInt8Array snapshot of the given page
     */
    getSnapshot = async (pageId?: Id, settings?: SnapshotSettings | null) => {
        const res = await this.#blobAPI;
        return res
            .getPageSnapshotWithSettings(pageId, settings == null ? null : JSON.stringify(settings))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * This method will set the width of the page to a specific value.
     * This only works if the document is a project.
     * @param _pageId the id of a specific page.
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2) The default unit is in the current layout unit (e.g. px, mm, in)
     */
    setWidth = async (_pageId: Id | undefined, width: string) => {
        if (_pageId !== undefined) {
            console.warn('pageId has no effect since all pages are being updated simultaneously.');
        }

        const res = await this.#editorAPI;
        return res.setPageWidth(width).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of the page to a specific value.
     * This only works if the document is a project.
     * @param _pageId the id of a specific page.
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2). The default unit is in the current layout unit (e.g. px, mm, in)
     * @returns
     */
    setHeight = async (_pageId: Id | undefined, height: string) => {
        if (_pageId !== undefined) {
            console.warn('pageId has no effect since all pages are being updated simultaneously.');
        }

        const res = await this.#editorAPI;
        return res.setPageHeight(height).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Sets the width and height of the page to a specific value simultaneously.
     * This only works if the document is a project.
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2). The default unit is in the current layout unit (e.g. px, mm, in)
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2). The default unit is in the current layout unit (e.g. px, mm, in)
     */
    setSize = async (width: string, height: string) => {
        const res = await this.#editorAPI;
        return res.setPageSize(width, height).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes the order of pages.
     * @param order the index in the list to move to
     * @param ids An array of all IDs you want to move to the given index
     * @returns
     */
    move = async (order: number, ids: Id[]) => {
        const res = await this.#editorAPI;
        return res.reorderPages(order, ids).then((result) => getEditorResponseData<null>(result));
    };
}
