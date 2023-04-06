import { EditorAPI } from '../types/CommonTypes';
import type { ChiliDocument } from '../types/DocumentTypes';

import { getEditorResponseData } from '../utils/EditorResponseData';
/**
 * The DocumentController is responsible for all communication regarding the Document.
 * Methods inside this controller can be called by `window.SDK.document.{method-name}`
 */

export class DocumentController {
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
     * This method retrieves the current document state from the editor
     * @returns The JSON document in the form of a string
     */
    getCurrentDocumentState = async () => {
        const res = await this.#editorAPI;
        return res.getCurrentDocumentState().then((result) => getEditorResponseData<ChiliDocument>(result));
    };

    /**
     * This method will load a provided document in the ChiliDocument format
     * @param doc The document to load in
     * @returns The document loaded inside of the canvas
     */
    loadDocument = async (doc: ChiliDocument | string) => {
        const res = await this.#editorAPI;
        if (typeof doc === 'string') return res.loadDocument(doc);
        return res.loadDocument(JSON.stringify(doc)).then((result) => getEditorResponseData<null>(result));
    };
}
