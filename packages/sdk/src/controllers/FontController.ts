import { EditorAPI, Id } from '../types/CommonTypes';
import {
    AddDocumentFontFamily,
    AddDocumentFontStyle,
    CharacterPreview,
    CharacterPreviewStyle,
    DocumentFontFamily,
    DocumentFontStyle,
} from '../types/FontTypes';
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
     * This method adds a font family
     * @param connectorId unique id of the font connector
     * @param fontFamily the font family object
     * @returns id generated on the engine side `CONNECTOR_ID::FONT_FAMILY_ID`
     */
    addFontFamily = async (connectorId: Id, fontFamily: AddDocumentFontFamily) => {
        const res = await this.#editorAPI;
        return res
            .addFontFamily(connectorId, JSON.stringify(fontFamily))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a font family
     * @param id the id of a specific font family
     * @returns
     */
    removeFontFamily = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeFontFamily(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method adds a font style
     * @param connectorId unique id of the font connector
     * @param fontStyle the font object
     * @returns id generated on the engine side `CONNECTOR_ID::FONT_FAMILY_ID::FONT_STYLE_ID`
     */
    addFontStyle = async (connectorId: Id, fontStyle: AddDocumentFontStyle) => {
        const res = await this.#editorAPI;
        return res
            .addFontStyle(connectorId, JSON.stringify(fontStyle))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a font style
     * @param id the id of a specific font style
     * @returns
     */
    removeFontStyle = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeFontStyle(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns the list of font families
     * @returns DocumentFontFamily[]
     */
    getFontFamilies = async () => {
        const res = await this.#editorAPI;
        return res.getFontFamilies().then((result) => getEditorResponseData<DocumentFontFamily[]>(result));
    };

    /**
     * This method returns the list of font styles for a specific family
     * @param id the id of a specific font style
     * @returns DocumentFontStyle[]
     */
    getFontStyles = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getFontStyles(id).then((result) => getEditorResponseData<DocumentFontStyle[]>(result));
    };

    /**
     * This method returns a font family by id
     * @param id the id of a specific font family
     * @returns DocumentFontFamily properties
     */
    getFontFamilyById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getFontFamilyById(id).then((result) => getEditorResponseData<DocumentFontFamily>(result));
    };

    /**
     * This method returns a font style by id
     * @param id the id of a specific font style
     * @returns DocumentFontStyle properties
     */
    getFontStyleById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getFontStyleById(id).then((result) => getEditorResponseData<DocumentFontStyle>(result));
    };

    /**
     * This method returns the default font.
     * Be aware that the default font will not change during the entire lifetime of the SDK session.
     * It is not necessary to call this more than once in an integration, this value can be safely stored during the lifetime of this SDK session.
     * @returns a default DocumentFontStyle
     */

    getDefaultFontStyle = async () => {
        const res = await this.#editorAPI;
        return res.getDefaultFontStyle().then((result) => getEditorResponseData<DocumentFontStyle>(result));
    };

    /**
     * This method returns the default font family.
     * Be aware that the default font family will not change during the entire lifetime of the SDK session.
     * It is not necessary to call this more than once in an integration, this value can be safely stored during the lifetime of this SDK session.
     * @returns a default DocumentFontFamily
     */
    getDefaultFontFamily = async () => {
        const res = await this.#editorAPI;
        return res.getDefaultFontFamily().then((result) => getEditorResponseData<DocumentFontFamily>(result));
    };

    /**
     * Check if the font family is used anywhere in the document
     * @param id the id of the font family to check
     * @returns boolean
     */
    isFontFamilyUsed = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.isFontFamilyUsed(id).then((result) => getEditorResponseData<boolean>(result));
    };

    /**
     * Check if the font style is used anywhere in the document
     * @param id the id of the font style to check
     * @returns boolean
     */
    isFontStyleUsed = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.isFontStyleUsed(id).then((result) => getEditorResponseData<boolean>(result));
    };

    /**
     * This method changes positions of font families
     * @param order the position of the font family
     * @param ids the list of font family  IDs
     * @returns
     */
    moveFontFamilies = async (order: number, ids: string[]) => {
        const res = await this.#editorAPI;
        return res.moveFontFamilies(order, ids).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns SVG graphics for requested characters used as bullets
     * @param characters the list of characters to render as SVG
     * @param characterPreviewStyle style to generate characters preview
     * @returns An object with the characters as keys and the SVG graphics as values
     */
    getPreviewsOfCharacterStrings = async (characters: string[], characterPreviewStyle: CharacterPreviewStyle) => {
        const res = await this.#editorAPI;
        return res
            .getPreviewsOfCharacterStrings(characters, JSON.stringify(characterPreviewStyle))
            .then((result) => getEditorResponseData<CharacterPreview>(result));
    };
}
