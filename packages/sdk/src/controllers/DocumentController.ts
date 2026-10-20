import { EditorAPI, Id } from '../types/CommonTypes';
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
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
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
     *
     * Note: This method must be called with valid authentication tokens set up (via ConfigurationController),
     * this method WILL NOT trigger a token refresh flow if the authentication is invalid or expired
     * @param doc the document to load in
     * @param options the options object for setting up the document load
     * @returns the document loaded inside of the canvas
     */
    load = async (doc: ChiliDocument | string, options: DocumentLoadOptions = { keepConnectors: false }) => {
        const res = await this.#editorAPI;

        const parsedDoc = typeof doc !== 'string' ? JSON.stringify(doc) : doc;

        return res
            .loadDocument(parsedDoc, JSON.stringify(options))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will create a new document, based on a document preset
     *
     * Note: This method must be called with valid authentication tokens set up (via ConfigurationController),
     * this method WILL NOT trigger a token refresh flow if the authentication is invalid or expired
     * @param preset the preset where we will create a document of.
     * @returns the new document created and loaded inside of the canvas
     */
    createAndLoad = async (preset: LayoutPreset) => {
        const res = await this.#editorAPI;

        const parsedDoc = JSON.stringify(preset);

        return res.createAndLoadDocument(parsedDoc).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method creates a component document out of frames of the current document.
     * The current document is not modified.
     *
     * The component gets the frames (in the z-order of the page), the selected layout (flattened, its page sized to
     * the bounding box of the frames), the variables the frames depend on and the brand kit.
     * Duplicated ids are ignored. To use the current selection, pass the ids of the selected frames.
     *
     * The method throws when no frame is provided, when a frame does not exist, is virtual, is a component or a
     * component grid, when the frames are on different pages or when they have no width or no height.
     * @param frameIds the ids of the frames to create the component from, they must be on the same page
     * @returns the component document
     */
    createComponentFromFrames = async (frameIds: Id[]) => {
        const res = await this.#editorAPI;
        return res.createComponentFromFrames(frameIds).then((result) => getEditorResponseData<ChiliDocument>(result));
    };
}
