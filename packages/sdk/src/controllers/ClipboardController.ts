import { ClipboardContentType } from '../types/ClipboardTypes';
import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ClipboardController is responsible for all communication regarding clipboard.
 * Methods inside this controller can be called by `window.SDK.clipboard.{method-name}`
 */
export class ClipboardController {
    /**
     * @ignore
     */
    #editorAPI: Promise<EditorAPI>;

    /**
     * @ignore
     */
    constructor(editorAPI: Promise<EditorAPI>) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method will copy the frames to the OS clipboard as a json frame
     * @param ids An array of all frame ids you want to copy
     * @returns
     */
    copyFrames = async (ids: Id[]) => {
        const res = await this.#editorAPI;
        const frameData = await res.copyFrames(ids);

        if (frameData.data) {
            await navigator.clipboard.writeText(frameData.data);
        }

        return getEditorResponseData<null>(frameData);
    };

    /**
     * This method will remove the frames and store them to the OS clipboard as
     * a json frame
     * @param ids An array of all frame ids you want to cut
     * @returns
     */
    cutFrames = async (ids: Id[]) => {
        const res = await this.#editorAPI;
        const frameData = await res.cutFrames(ids);

        if (frameData.data) {
            await navigator.clipboard.writeText(frameData.data);
        }

        return getEditorResponseData<null>(frameData);
    };

    /**
     * This method will paste the OS clipboard content to the editor as frames
     * @returns
     */
    pasteFrames = async () => {
        const res = await this.#editorAPI;

        const clipboardData = await navigator.clipboard.readText();
        const result = await res.pasteFrames(clipboardData);

        return getEditorResponseData<null>(result);
    };

    /**
     * This method will get the content type of the OS clipboard
     * @returns content type
     */
    getContentType = async () => {
        const res = await this.#editorAPI;

        const clipboardData = await navigator.clipboard.readText();
        const result = await res.getClipboardContentType(clipboardData);

        return getEditorResponseData<ClipboardContentType>(result);
    };
}
