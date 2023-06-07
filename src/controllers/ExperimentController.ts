import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { ImageSourceTypeEnum, ImageFrameVariableSource } from '../types/FrameTypes';

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
     * This method will enter text editing mode on the provided frame.
     * @param id the id frame to enter text edit mode on.
     * @returns
     */
    enterTextEditMode = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.enterTextEditMode(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will exit text editing mode.
     * @returns
     */
    exitTextEditMode = async () => {
        const res = await this.#editorAPI;
        return res.exitTextEditMode().then((result) => getEditorResponseData<null>(result));
    };
}
