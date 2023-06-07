import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Page } from '../types/PageTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';

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
     * @param pageId the id of a specific page
     * @returns page properties
     */
    getById = async (pageId: Id) => {
        const res = await this.#editorAPI;
        return res.getPageById(pageId).then((result) => getEditorResponseData<Page>(result));
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
        const calc = getCalculatedValue(width);

        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setPageWidth(pageId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of the page to a specific value.
     * This only works if the document is a project.
     * @param pageId the id of a specific page
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2). The notation is in pixels
     * @returns
     */
    setHeight = async (pageId: Id, height: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(height);

        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setPageHeight(pageId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };
}
