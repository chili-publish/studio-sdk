import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { CharacterStyle, CharacterStyleUpdate } from '../types/CharacterStyleTypes';

/**
 * The CharacterStyleController is responsible for all communication regarding character styles.
 * Methods inside this controller can be called by `window.SDK.characterStyle.{method-name}`
 */
export class CharacterStyleController {
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
     * This method returns the list of character styles
     * @returns
     */
    getCharacterStyles = async () => {
        const res = await this.#editorAPI;
        return res.getCharacterStyles().then((result) => getEditorResponseData<CharacterStyle[]>(result));
    };

    /**
     * This method returns a character style by the ID
     * @param characterStyleId The ID of a specific character style
     * @returns
     */
    getCharacterStyle = async (characterStyleId: Id) => {
        const res = await this.#editorAPI;
        return res
            .getCharacterStyleById(characterStyleId)
            .then((result) => getEditorResponseData<CharacterStyle>(result));
    };

    /**
     * This method adds a new character style
     * @returns the new added character style ID
     */
    createCharacterStyle = async () => {
        const res = await this.#editorAPI;
        return res.createCharacterStyle().then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method updates a character style by the ID and provided properties
     * @param characterStyleId The ID of a specific character style
     * @param characterStyle The new character style properties
     * @returns
     */
    updateCharacterStyle = async (characterStyleId: Id, characterStyle: CharacterStyleUpdate) => {
        const res = await this.#editorAPI;
        return res
            .updateCharacterStyle(characterStyleId, JSON.stringify(characterStyle))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a character style by the ID
     * @param characterStyleId The ID of a specific character style
     * @returns
     */
    removeCharacterStyle = async (characterStyleId: Id) => {
        const res = await this.#editorAPI;
        return res.removeCharacterStyle(characterStyleId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method duplicates a character style by the ID
     * @param characterStyleId The ID of a specific character style
     * @returns
     */
    duplicateCharacterStyle = async (characterStyleId: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateCharacterStyle(characterStyleId).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method renames a character style by the ID
     * @param characterStyleId The ID of a specific character style
     * @param characterStyleName The new name of the character style
     * @returns
     */
    renameCharacterStyle = async (characterStyleId: Id, characterStyleName: string) => {
        const res = await this.#editorAPI;
        return res.renameCharacterStyle(characterStyleId, characterStyleName).then((result) => getEditorResponseData<null>(result));
    };
}
