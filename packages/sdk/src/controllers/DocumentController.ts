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
     * This method loads a template as a new, unsaved project and clears old document states.
     *
     * The project keeps the component versions the template uses, as they are now: a live version stays live, a
     * specific version stays that version, and the latest version becomes the version that is the newest at this
     * moment. Nothing is stored: save the project from `getCurrentState`.
     *
     * The project's `templateId` is the value of `WellKnownConfigurationKeys.GraFxStudioTemplateId`, so set it
     * first. The method sets `WellKnownConfigurationKeys.GraFxStudioDocumentType` to `project`.
     *
     * When the latest version of a component can't be resolved, for example because the component has no saved
     * versions, the method fails and no document is loaded afterwards.
     *
     * `DocumentLoadOptions.keepConnectors` works as in `load`.
     *
     * Note: This method must be called with valid authentication tokens set up (via ConfigurationController),
     * this method WILL NOT trigger a token refresh flow if the authentication is invalid or expired
     * @param template the template to create the project from
     * @param options the options object for setting up the document load
     * @returns
     */
    loadAndCreateProject = async (
        template: ChiliDocument | string,
        options: DocumentLoadOptions = { keepConnectors: false },
    ) => {
        const res = await this.#editorAPI;

        const parsedTemplate = typeof template !== 'string' ? JSON.stringify(template) : template;

        return res
            .loadAndCreateProject(parsedTemplate, JSON.stringify(options))
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
}
