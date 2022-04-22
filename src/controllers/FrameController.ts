import type { EditorAPI } from '../../types/CommonTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';

/**
 * The FrameController is responsible for all communication regarding Frames.
 * Methods inside this controller can be called by `window.SDK.frame.{method-name}`
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
     * This method returns the list of frames
     * @returns
     */
    getFrames = async () => {
        const res = await this.#editorAPI;
        return res.getFrames();
    };

    /**
     * This method returns the list of selected frames
     * @returns
     */
    getSelectedFrames = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedFrames();
    };

    /**
     * This method returns the list of frames by pageId
     * @param pageId The ID of a specific page
     * @returns
     */
    getFramesByPageId = async (pageId: number) => {
        const res = await this.#editorAPI;
        return res.getFramesByPageId(pageId);
    };

    /**
     * This method returns a frame by its name
     * @param name The name of a specific frame
     * @returns
     */
    getFrameByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res.getFrameByName(name);
    };

    /**
     * This method returns a frame by its id
     * @param id The ID of a specific frame
     * @returns
     */
    getFrameById = async (id: number) => {
        const res = await this.#editorAPI;
        return res.getFrameById(id);
    };

    /**
     * This method returns all frame properties on current layout
     * @returns
     */
    getFramePropertiesOnSelectedLayout = async () => {
        const res = await this.#editorAPI;
        return res.getFramePropertiesOnSelectedLayout();
    };

    /**
     * This method returns frame properties for a given frame and layout
     * @param frameId The ID of a specific frame
     * @param layoutId The ID of a specific layout
     * @returns
     */
    getFramePropertiesByFrameId = async (frameId: number, layoutId?: number) => {
        const res = await this.#editorAPI;
        return res.getFramePropertiesByFrameId(frameId, layoutId);
    };

    /**
     * This method returns frame properties for a given layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    getFramesProperties = async (layoutId: number) => {
        const res = await this.#editorAPI;
        return res.getFramesProperties(layoutId);
    };

    /**
     * This method will reset the frame size (width and height) to the frame's original value
     * @param frameId The ID of a specific frame
     * @returns
     */
    resetFrameSize = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameSize(frameId);
    };

    /**
     * This method will select a specific frame
     * @param frameId The ID of a specific frame
     * @returns
     */
    selectFrame = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.selectFrames([frameId]);
    };

    /**
     * This method will select multipleFrames
     * @param frameIds An array of all IDs you want to select
     * @returns
     */
    selectMultipleFrames = async (frameIds: number[]) => {
        const res = await this.#editorAPI;
        return res.selectFrames(frameIds);
    };

    /**
     * This method will set the height of a specific frame
     * @param frameId The ID of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setFrameHeight = async (frameId: number, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res.setFrameHeight(frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the rotation angle of a specific frame
     * @param frameId The ID of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setFrameRotation = async (frameId: number, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res.setFrameRotation(frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the width of a specific frame
     * @param frameId The ID of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setFrameWidth = async (frameId: number, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res.setFrameWidth(frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the x value of a specific frame
     * @param frameId The ID of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setFrameX = async (frameId: number, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);

        if (calc === null || calc === Infinity) {
            return null;
        }
        return res.setFrameX(frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the y value of a specific frame
     * @param frameId The ID of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setFrameY = async (frameId: number, value: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(value);

        if (calc === null || calc === Infinity) {
            return null;
        }

        return res.setFrameY(frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will reset properties of a specific frame to their original values
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrame = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrame(frameId);
    };
    /**
     * This method will reset the x value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameX = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameX(frameId);
    };

    /**
     * This method will reset the y value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameY = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameY(frameId);
    };

    /**
     * This method will reset the rotation value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameRotation = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameRotation(frameId);
    };

    /**
     * This method will reset the width of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameWidth = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameWidth(frameId);
    };

    /**
     * This method will reset the height of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameHeight = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameHeight(frameId);
    };

    /**
     * This method will set the visibility property of a specified frame. If set to false the frame will be invisible and vice versa.
     * @param frameId The ID of the frame that needs to get updated
     * @param value True means the frame gets visible, false means the frame gets invisible
     * @returns
     */
    setFrameVisibility = async (frameId: number, value: boolean) => {
        const res = await this.#editorAPI;
        return res.setFrameVisibility(frameId, value);
    };

    addImgFrame = async (name: string, url: string) => {
        const res = await this.#editorAPI;
        return res.addImgFrame(name, url);
    };
}
