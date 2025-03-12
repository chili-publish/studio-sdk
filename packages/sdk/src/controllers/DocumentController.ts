import { EditorAPI } from '../types/CommonTypes';
import type { ChiliDocument, DocumentLoadOptions } from '../types/DocumentTypes';
import { LayoutPreset } from '../types/LayoutTypes';

import { getEditorResponseData } from '../utils/EditorResponseData';
/**
 * The DocumentController is responsible for all communication regarding the Document.
 * Methods inside this controller can be called by `window.SDK.document.{method-name}`
 */

export class DocumentController {
    /**
     * @ignore
     */
    #editorAPI: Promise<EditorAPI>;

    /**
     * @ignore
     */
    constructor(editorAPI: Promise<EditorAPI>) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method retrieves the current document state from the editor
     * @returns the JSON document in the form of a string
     */
    getCurrentState = async () => {
        const res = await this.#editorAPI;
        return res.getCurrentDocumentState().then((result) => getEditorResponseData<ChiliDocument>(result));
    };

    /**
     * This method will load a provided document in the ChiliDocument format and
     * clean old document states.
     * If you set `DocumentLoadOptions.keepConnectors` to true, `load` will keep
     * your old connectors states e.g. options, authentication..
     * By default `keepConnectors` is false and your connectors states are reset.
     * In this case, you would need to configure your connectors appropriately
     * beforehand.
     * @param doc the document to load in
     * @param options the options object for setting up the document load
     * @returns the document loaded inside of the canvas
     */
    load = async (doc: ChiliDocument | string, options: DocumentLoadOptions = { keepConnectors: false }) => {

        console.log('load', doc, options);

        const res = await this.#editorAPI;

        console.log('res', res);

        const parsedDoc = typeof doc !== 'string' ? JSON.stringify(doc) : doc;

        console.log('parsedDoc', parsedDoc);

        return res
            .loadDocument(parsedDoc, JSON.stringify(options))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will create a new document, based on a document preset
     * @param preset the preset where we will create a document of.
     * @returns the new document created and loaded inside of the canvas
     */
    createAndLoad = async (preset: LayoutPreset) => {
        const res = await this.#editorAPI;

        const parsedDoc = JSON.stringify(preset);

        return res.createAndLoadDocument(parsedDoc).then((result) => getEditorResponseData<null>(result));
    };
}
