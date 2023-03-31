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
     * @returns
     */
    getPages = async () => {
        const res = await this.#editorAPI;
        return res.getPages().then((result) => getEditorResponseData<Page[]>(result));
    };

    /**
     * This method returns a page by its id
     * @param pageId The ID of a specific page
     * @returns
     */
    getPageById = async (pageId: Id) => {
        const res = await this.#editorAPI;
        return res.getPageById(pageId).then((result) => getEditorResponseData<Page>(result));
    };

    /**
     * This method will set the width of the page to a specific value.
     * This only works if the document is a project.
     * @param pageId The ID of a specific page
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setPageWidth = async (pageId: Id, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);

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
     * @param pageId The ID of a specific page
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setPageHeight = async (pageId: Id, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);

        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setPageHeight(pageId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };
}
