import { EditorAPI } from '../types/CommonTypes';
import { TextType } from '../types/TextTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The TextController is responsible for manipulating text.
 * Methods inside this controller can be called by `window.SDK.text.{method-name}`
 */
export class TextController {
    /**
     * @ignore
     */
    readonly #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method gets the text content of a text frame
     * @param frameId The ID of a text frame
     * @param textType The type of the text
     * @returns the text content
     */
    getText = async (frameId: string, textType: TextType) => {
        const res = await this.#editorAPI;
        return res
            .getTextByFrameId(frameId, textType)
            .then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method sets the text content of a text frame
     * @param frameId The ID of a text frame
     * @param text The new text content
     * @returns
     */
    setText = async (frameId: string, text: string) => {
        const res = await this.#editorAPI;
        return res
            .setTextByFrameId(frameId, text)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method selects the text content of a text frame
     * @param frameId The ID of a text frame
     * @param startIndex The index where the selection starts
     * @param length The length of selection from startIndex
     * @returns
     */
    selectText = async (frameId: string, startIndex: number, length: number) => {
        const res = await this.#editorAPI;
        return res
            .selectTextByFrameId(frameId, startIndex, length)
            .then((result) => getEditorResponseData<null>(result));
    };
}
