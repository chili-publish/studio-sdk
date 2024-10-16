import { EditorAPI, EditorRawAPI, EditorResponse, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Page } from '../types/PageTypes';
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
     * @returns
     */
    add = async () => {
        const res = await this.#editorAPI;
        return res.addPage().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method removes a certain page.
     * @param pageId the id of the page
     * @returns
     */
    remove = async (pageId: Id) => {
        const res = await this.#editorAPI;
        return res.removePage(pageId).then((result) => getEditorResponseData<null>(result));
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
     * @param pageId the id of a specific page
     * @returns UInt8Array snapshot of the given page
     */
    getSnapshot = async (pageId: Id) => {
        const res = await this.#blobAPI;
        return res.getPageSnapshot(pageId).then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * This method will set the width of the page to a specific value.
     * This only works if the document is a project.
     * @param pageId the id of a specific page
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setWidth = async (pageId: Id, width: string) => {
        const res = await this.#editorAPI;
        return res.setPageWidth(pageId, width).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of the page to a specific value.
     * This only works if the document is a project.
     * @param id the id of a specific page
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2). The notation is in pixels
     * @returns
     */
    setHeight = async (id: Id, height: string) => {
        const res = await this.#editorAPI;
        return res.setPageHeight(id, height).then((result) => getEditorResponseData<null>(result));
    };
}
