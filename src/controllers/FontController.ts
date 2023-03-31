import { EditorAPI, Id } from '../types/CommonTypes';
import { AddDocumentFont, DocumentFont } from '../types/FontTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The FontController is responsible for all communication regarding font styles.
 * Methods inside this controller can be called by `window.SDK.font.{method-name}`
 */
export class FontController {
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
     * This method returns the list of fonts
     * @returns
     */
    getFonts = async () => {
        const res = await this.#editorAPI;
        return res.getFonts().then((result) => getEditorResponseData<DocumentFont[]>(result));
    };

    /**
     * This method returns a font by id
     * @param fontId The ID of a specific font
     * @returns
     */
    getFontById = async (fontId: Id) => {
        const res = await this.#editorAPI;
        return res.getFontById(fontId).then((result) => getEditorResponseData<DocumentFont>(result));
    };

    /**
     * This method returns the default font.
     * Be aware that the default font will not change during the entire lifetime of the SDK session.
     * It is not necessary to call this more than once in an integration, this value can be safely stored during the lifetime of this SDK session.
     * @returns
     */
    getDefaultFont = async () => {
        const res = await this.#editorAPI;
        return res.getDefaultFont().then((result) => getEditorResponseData<DocumentFont>(result));
    };

    /**
     * This method removes a font
     * @param id The ID of a specific font
     * @returns
     */
    removeFont = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeFont(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method adds a font
     * @param connectorId unique Id of the font connector
     * @param font The font object
     * @returns
     */
    addFont = async (connectorId: Id, font: AddDocumentFont) => {
        const res = await this.#editorAPI;
        return res.addFont(connectorId, JSON.stringify(font)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Check if the font is used anywhere in the document
     * @param fontKey The ID of the font to check
     * @returns Whether the font is used
     */
    isFontUsed = async (fontKey: string) => {
        const res = await this.#editorAPI;
        return res.isFontUsed(fontKey).then((result) => getEditorResponseData<boolean>(result));
    };
}
