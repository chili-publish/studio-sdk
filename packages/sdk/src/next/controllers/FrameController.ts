import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';

/**
 * The FrameController is responsible for all communication regarding Frames.
 * Methods inside this controller can be called by `window.SDK.next.frame.{method-name}`
 */
export class FrameController {
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
     * This method will exit cropping mode and save the applied crop.
     * @returns
     */
    exitCropMode = async () => {
        const res = await this.#editorAPI;
        return res.exitCropMode().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will exit subject mode and save the applied subject area.
     * @returns
     */
    exitSubjectMode = async () => {
        const res = await this.#editorAPI;
        return res.exitSubjectMode().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will exit gradient mode and save the applied gradient.
     * @returns
     */
    exitGradientMode = async () => {
        const res = await this.#editorAPI;
        return res.exitGradientMode().then((result) => getEditorResponseData<null>(result));
    };
}
