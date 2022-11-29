import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { CharacterStyle, CharacterStyleUpdate } from '../../types/CharacterStyleTypes';

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
     * This method returns a character style by id
     * @param characterStyleId The ID of a specific character style
     * @returns
     */
    getCharacterStyleById = async (characterStyleId: string) => {
        const res = await this.#editorAPI;
        return res
            .getCharacterStyleById(characterStyleId)
            .then((result) => getEditorResponseData<CharacterStyle>(result));
    };

    /**
     * This method creates a new character style
     * @returns the new created character style id
     */
    createCharacterStyle = async () => {
        const res = await this.#editorAPI;
        return res.createCharacterStyle().then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method updates a character style
     * @param id The ID of a specific character style
     * @param characterStyle The new character style properties
     * @returns
     */
    updateCharacterStyle = async (id: string, characterStyle: CharacterStyleUpdate) => {
        const res = await this.#editorAPI;
        return res
            .updateCharacterStyle(id, JSON.stringify(characterStyle))
            .then((result) => getEditorResponseData<null>(result));
    };
}
