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
     * This method retrieves the current documentstate from the editor
     * @returns The JSON document in the form of a string
     */
     getCurrentDocumentState= async () => {
        const res = await this.children;
        return String(res.getCurrentDocumentState());
    };
}
