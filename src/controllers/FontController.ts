import { EditorAPI, Id } from '../../types/CommonTypes';
import { AddDocumentFont, DocumentFont } from '../../types/FontTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The FontController is responsible for all communication regarding color styles.
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
     * This method returns the list of colors
     * @returns
     */
    getFonts = async () => {
        const res = await this.#editorAPI;
        return res.getFonts().then((result) => getEditorResponseData<DocumentFont[]>(result));
    };

    /**
     * This method returns a color by id
     * @param colorId The ID of a specific color
     * @returns
     */
    getFontById = async (fontId: Id) => {
        const res = await this.#editorAPI;
        return res.getFontById(fontId).then((result) => getEditorResponseData<DocumentFont>(result));
    };

    /**
     * This method removes a color
     * @param id The ID of a specific color
     * @returns
     */
    removeFont = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeFont(id).then((result) => getEditorResponseData<null>(result));
    };

    addFont = async (connectorId: Id, font: AddDocumentFont) => {
        const res = await this.#editorAPI;        
        return res.addFont(connectorId, JSON.stringify(font)).then((result) => getEditorResponseData<null>(result));    
    }
}
