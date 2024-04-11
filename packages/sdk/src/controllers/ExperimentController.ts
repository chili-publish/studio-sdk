import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { ImageSourceTypeEnum, ImageFrameVariableSource } from '../types/FrameTypes';
import { TextType } from '../types/TextTypes';

/**
 * The ExperimentController contains all SDK functions that are considered for addition,
 * or functions we want to keep open for changing definitions. This is a sneak peak
 * into future versions of the SDK. Never build production code relying on functions in
 * this controller.
 */
export class ExperimentController {
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
     * @experimental
     * This method will assign an image from a variable to the correct ImageFrame
     * @param imageFrameId the id of the imageFrame where an image needs to be assigned to
     * @param variableId the id of the variable which contains the image
     * @returns
     */
    insertImageVariableToFrame = async (imageFrameId: Id, variableId: Id) => {
        const res = await this.#editorAPI;
        const src: ImageFrameVariableSource = { id: variableId, type: ImageSourceTypeEnum.variable };
        return res
            .setImageSource(imageFrameId, JSON.stringify(src))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method will insert a text variable in the selected frame. Calling this method
     * requires that the selected frame is in text editing mode.
     * @param id the id of the variable to be inserted.
     * @returns
     */
    insertTextVariable = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.insertTextVariable(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method will enter text editing mode on the provided frame.
     * @param id the id frame to enter text edit mode on.
     * @returns
     */
    enterTextEditMode = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.enterTextEditMode(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method will exit text editing mode.
     * @returns
     */
    exitTextEditMode = async () => {
        const res = await this.#editorAPI;
        return res.exitTextEditMode().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method gets the text content of a text frame.
     * The variables contained in the text will return their values only if you
     * are in text editing mode.
     * @param frameId The ID of a text frame
     * @param textType The type of the text
     * @returns the text content
     */
    getText = async (frameId: string, textType: TextType) => {
        const res = await this.#editorAPI;
        return res.getTextByFrameId(frameId, textType).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * @experimental
     * This method sets the text content of a text frame
     * @param frameId The ID of a text frame
     * @param text The new text content
     * @returns
     */
    setText = async (frameId: string, text: string) => {
        const res = await this.#editorAPI;
        return res.setTextByFrameId(frameId, text).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method selects the text content of a text frame
     * @param frameId The ID of a text frame
     * @param startIndex The index where the selection starts
     * @param length The length of selection from startIndex
     * @returns
     */
    selectText = async (frameId: string, startIndex: number, length: number) => {
        const res = await this.#editorAPI;
        return res.selectTextById(frameId, startIndex, length).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental
     * This method will apply smartcrop to an image frame
     * @param frameId The ID of an image frame
     * @param apply If the smartcrop should be applied or not
     * @returns
     */
    applySmartCropToFrame = async (frameId: string, apply?: boolean) => {
        const res = await this.#editorAPI;
        return res.applySmartCropToFrame(frameId, apply);
    };
}
