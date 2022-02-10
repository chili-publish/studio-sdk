import { Child, ConfigType } from '../../types/CommonTypes';

/**
 * The DocumentController is responsible for all communication regarding the Document.
 * Methods inside this controller can be called by `window.SDK.document.{method-name}`
 */

export class DocumentController {
    /**
     * @ignore
     */
    children: Child;
    /**
     * @ignore
     */
    config: ConfigType;

    /**
     * @ignore
     */
    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    /**
     * This method retrieves the current document state from the editor
     * @returns The JSON document in the form of a string
     */
    getCurrentDocumentState = async () => {
        const res = await this.children;
        return res.getCurrentDocumentState();
    };

    /**
     * This method will load a provided document
     * @param documentJson The document to load in string format
     * @returns The document loaded inside of the canvas
     */

    loadDocument = async (documentJson: string) => {
        const res = await this.children;
        return res.loadDocument(documentJson);
    };
}
