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
     * @returns list of all fonts
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getFonts().then((result) => getEditorResponseData<DocumentFont[]>(result));
    };

    /**
     * This method returns a font by id
     * @param id the id of a specific font
     * @returns font properties
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getFontById(id).then((result) => getEditorResponseData<DocumentFont>(result));
    };

    /**
     * This method returns the default font.
     * Be aware that the default font will not change during the entire lifetime of the SDK session.
     * It is not necessary to call this more than once in an integration, this value can be safely stored during the lifetime of this SDK session.
     * @returns font properties
     */
    getDefault = async () => {
        const res = await this.#editorAPI;
        return res.getDefaultFont().then((result) => getEditorResponseData<DocumentFont>(result));
    };

    /**
     * This method removes a font
     * @param id the id of a specific font
     * @returns
     */
    remove = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeFont(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method adds a font
     * @param id unique id of the font connector
     * @param font the font object
     * @returns
     */
    add = async (id: Id, font: AddDocumentFont) => {
        const res = await this.#editorAPI;
        return res.addFont(id, JSON.stringify(font)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Check if the font is used anywhere in the document
     * @param id the id of the font to check
     * @returns whether the font is used
     */
    isUsed = async (id: string) => {
        const res = await this.#editorAPI;
        return res.isFontUsed(id).then((result) => getEditorResponseData<boolean>(result));
    };
}
