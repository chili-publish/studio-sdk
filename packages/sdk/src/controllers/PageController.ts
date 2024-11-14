import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Page } from '../types/PageTypes';

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
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

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
     * @param id the id of a specific page
     * @returns page properties
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getPageById(id).then((result) => getEditorResponseData<Page>(result));
    };

    /**
     * This method will set the width of the page to a specific value.
     * This only works if the document is a project.
     * @param id the id of a specific page
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setWidth = async (id: Id, width: string) => {
        const res = await this.#editorAPI;
        return res.setPageWidth(id, width).then((result) => getEditorResponseData<null>(result));
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
