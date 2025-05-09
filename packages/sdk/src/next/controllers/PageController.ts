import { EditorAPI, EditorRawAPI } from '../../types/CommonTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';
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
     * This method will set the width of all pages to a specific value.
     * This only works if the document is a project.
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2)  The default unit is in the current layout unit (e.g. px, mm, in)
     * @returns
     */
    setWidth = async (width: string) => {
        const res = await this.#editorAPI;
        return res.setPageWidth(width).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of all pages to a specific value.
     * This only works if the document is a project.
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2).  The default unit is in the current layout unit (e.g. px, mm, in)
     * @returns
     */
    setHeight = async (height: string) => {
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
}
