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
     * @returns list of all character styles
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getCharacterStyles().then((result) => getEditorResponseData<CharacterStyle[]>(result));
    };

    /**
     * This method returns a character style by the id
     * @param characterStyleId the id of a specific character style
     * @returns character style for given id
     */
    getById = async (characterStyleId: Id) => {
        const res = await this.#editorAPI;
        return res
            .getCharacterStyleById(characterStyleId)
            .then((result) => getEditorResponseData<CharacterStyle>(result));
    };

    /**
     * This method creates a new character style
     * @returns the id of new character style
     */
    create = async () => {
        const res = await this.#editorAPI;
        return res.createCharacterStyle().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method updates a character style by the id and provided properties
     * @param characterStyleId the id of a specific character style
     * @param characterStyle the new character style properties
     * @returns
     */
    update = async (characterStyleId: Id, characterStyle: CharacterStyleUpdate) => {
        const res = await this.#editorAPI;
        return res
            .updateCharacterStyle(characterStyleId, JSON.stringify(characterStyle))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a character style by the id
     * @param characterStyleId the id of a specific character style
     * @returns
     */
    remove = async (characterStyleId: Id) => {
        const res = await this.#editorAPI;
        return res.removeCharacterStyle(characterStyleId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method duplicates a character style by the id
     * @param characterStyleId the id of a specific character style
     * @returns id of the duplicated character style
     */
    duplicate = async (characterStyleId: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateCharacterStyle(characterStyleId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method renames a character style by the id
     * @param characterStyleId the id of a specific character style
     * @param characterStyleName the new name of the character style
     * @returns
     */
    rename = async (characterStyleId: Id, characterStyleName: string) => {
        const res = await this.#editorAPI;
        return res
            .renameCharacterStyle(characterStyleId, characterStyleName)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of character styles
     * @param order the position of the character styles
     * @param ids the list of character style ids
     * @returns
     */
    move = async (order: number, ids: Id[]) => {
        const res = await this.#editorAPI;
        return res.moveCharacterStyles(order, ids).then((result) => getEditorResponseData<null>(result));
    };
}
