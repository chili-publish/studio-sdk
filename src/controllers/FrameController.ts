import type { EditorAPI } from '../../types/CommonTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { FrameLayoutType, FrameType } from '../../types/FrameTypes';

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
        return res.getFrames().then((result) => getEditorResponseData<FrameType[]>(result));
    };

    /**
     * This method returns the list of selected frames
     * @returns
     */
    getSelectedFrames = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedFrames().then((result) => getEditorResponseData<FrameType[]>(result));
    };

    /**
     * This method returns the list of frames by pageId
     * @param pageId The ID of a specific page
     * @returns
     */
    getFramesByPageId = async (pageId: number) => {
        const res = await this.#editorAPI;
        return res.getFramesByPageId(pageId).then((result) => getEditorResponseData<FrameType[]>(result));
    };

    /**
     * This method returns a frame by its name
     * @param name The name of a specific frame
     * @returns
     */
    getFrameByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res.getFrameByName(name).then((result) => getEditorResponseData<FrameType>(result));
    };

    /**
     * This method returns a frame by its id
     * @param id The ID of a specific frame
     * @returns
     */
    getFrameById = async (id: number) => {
        const res = await this.#editorAPI;
        return res.getFrameById(id).then((result) => getEditorResponseData<FrameType>(result));
    };

    /**
     * This method returns all frame properties on current layout
     * @returns
     */
    getFramePropertiesOnSelectedLayout = async () => {
        const res = await this.#editorAPI;
        return res
            .getFramePropertiesOnSelectedLayout()
            .then((result) => getEditorResponseData<FrameLayoutType[]>(result));
    };

    /**
     * This method returns frame properties for a given frame and layout
     * @param frameId The ID of a specific frame
     * @param layoutId The ID of a specific layout
     * @returns
     */
    getFramePropertiesByFrameId = async (frameId: number, layoutId?: number) => {
        const res = await this.#editorAPI;
        return res
            .getFramePropertiesByFrameId(frameId, layoutId)
            .then((result) => getEditorResponseData<FrameLayoutType>(result));
    };

    /**
     * This method returns frame properties for a given layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    getFramesProperties = async (layoutId: number) => {
        const res = await this.#editorAPI;
        return res.getFramesProperties(layoutId).then((result) => getEditorResponseData<FrameLayoutType[]>(result));
    };

    /**
     * This method will reset the frame size (width and height) to the frame's original value
     * @param frameId The ID of a specific frame
     * @returns
     */
    resetFrameSize = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameSize(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select a specific frame
     * @param frameId The ID of a specific frame
     * @returns
     */
    selectFrame = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.selectFrames([frameId]).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select multipleFrames
     * @param frameIds An array of all IDs you want to select
     * @returns
     */
    selectMultipleFrames = async (frameIds: number[]) => {
        const res = await this.#editorAPI;
        return res.selectFrames(frameIds).then((result) => getEditorResponseData<null>(result));
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

        return res
            .setFrameHeight(frameId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
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

        return res
            .setFrameRotation(frameId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
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

        return res
            .setFrameWidth(frameId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
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
        return res
            .setFrameX(frameId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
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

        return res
            .setFrameY(frameId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will update the name of a specific frame
     * @param frameId The ID of a specific frame
     * @param frameName The new name that the frame should receive
     * @returns
     */
    setFrameName = async (frameId: number, frameName: string) => {
        const res = await this.#editorAPI;
        return res.renameFrame(frameId, frameName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset properties of a specific frame to their original values
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrame = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrame(frameId).then((result) => getEditorResponseData<null>(result));
    };
    /**
     * This method will reset the x value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameX = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameX(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the y value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameY = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameY(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the rotation value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameRotation = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameRotation(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the width of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameWidth = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameWidth(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the height of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameHeight = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.resetFrameHeight(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the visibility property of a specified frame. If set to false the frame will be invisible and vice versa.
     * @param frameId The ID of the frame that needs to get updated
     * @param value True means the frame gets visible, false means the frame gets invisible
     * @returns
     */
    setFrameVisibility = async (frameId: number, value: boolean) => {
        const res = await this.#editorAPI;
        return res.setFrameVisibility(frameId, value).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will remove a specific frame using the Id.
     * @param frameId The ID of the frame that needs to be deleted
     * @returns
     */
    removeFrame = async (frameId: number) => {
        const res = await this.#editorAPI;
        return res.removeFrame(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will assign an image from the mediaConnector to the correct imageFrame
     * @param frameId The ID of the imageFrame where an image needs to be assigned to
     * @param connectorId Unique Id of the media connector
     * @param imageId Unique Id of the image that you want to assign to the imageFrame
     * @returns
     */
    assignImageToFrame = async (frameId: number, connectorId: string, imageId: string) => {
        const res = await this.#editorAPI;
        return res.assignImage(frameId, connectorId, imageId).then((result) => getEditorResponseData<null>(result));
    };
}
