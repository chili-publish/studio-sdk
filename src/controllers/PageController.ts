import { EditorAPI } from '../../types/CommonTypes';

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
        return res.getPages();
    };

    /**
     * This method returns a page by its id
     * @param pageId The ID of a specific page
     * @returns
     */
    getPageById = async (pageId: number) => {
        const res = await this.#editorAPI;
        return res.getPageById(pageId);
    };
}
