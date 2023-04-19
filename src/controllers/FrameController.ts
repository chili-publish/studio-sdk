import type { EditorAPI, Id } from '../types/CommonTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';
import { getEditorResponseData } from '../utils/EditorResponseData';
import {
    BlendMode,
    FitMode,
    FrameLayoutType,
    FrameType,
    FrameTypeEnum,
    ImageFrameConnectorSource,
    ImageFrameSource,
    ImageFrameUrlSource,
    ImageSourceTypeEnum,
    UpdateZIndexMethod,
    VerticalAlign,
} from '../types/FrameTypes';
import { ColorUsage } from '../types/ColorStyleTypes';
import { ShapeType } from '../types/ShapeTypes';
import { ShapeController } from './ShapeController';

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
        this.shapeController = new ShapeController(this.#editorAPI);
    }

    /**
     * This variable helps to redirect shapes related methods to newly introduced ShapeController
     * to avoid any breaking changes
     */
    private shapeController: ShapeController;
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
    getFramesByPageId = async (pageId: Id) => {
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
    getFrameById = async (id: Id) => {
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
    getFramePropertiesByFrameId = async (frameId: Id, layoutId?: Id) => {
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
    getFramesProperties = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.getFramesProperties(layoutId).then((result) => getEditorResponseData<FrameLayoutType[]>(result));
    };

    /**
     * This method will reset the frame size (width and height) to the frame's original value
     * @param frameId The ID of a specific frame
     * @returns
     */
    resetFrameSize = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameSize(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select a specific frame
     * @param frameId The ID of a specific frame
     * @returns
     */
    selectFrame = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.selectFrames([frameId]).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select multipleFrames
     * @param frameIds An array of all IDs you want to select
     * @returns
     */
    selectMultipleFrames = async (frameIds: Id[]) => {
        const res = await this.#editorAPI;
        return res.selectFrames(frameIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes the order of frames in the z-index list.
     * @param orderIndex The index in the list to move to
     * @param frameIdsToMove An array of all IDs you want to move to the given index
     * @returns
     */
    reorderFrames = async (orderIndex: number, frameIdsToMove: Id[]) => {
        const res = await this.#editorAPI;
        return res.reorderFrames(orderIndex, frameIdsToMove).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will update the z-index of a frame.
     * @param frameId The ID of the frame you want to change the z-index of
     * @param method The z-index update method to perform
     * @returns
     */
    setFrameZIndex = async (frameId: Id, method: UpdateZIndexMethod) => {
        const res = await this.#editorAPI;
        return res.setFrameZIndex(frameId, method).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of a specific frame
     * @param frameId The ID of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setFrameHeight = async (frameId: Id, value: string) => {
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
    setFrameRotation = async (frameId: Id, value: string) => {
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
    setFrameWidth = async (frameId: Id, value: string) => {
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
    setFrameX = async (frameId: Id, value: string) => {
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
    setFrameY = async (frameId: Id, value: string) => {
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
    setFrameName = async (frameId: Id, frameName: string) => {
        const res = await this.#editorAPI;
        return res.renameFrame(frameId, frameName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset properties of a specific frame to their original values
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrame = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrame(frameId).then((result) => getEditorResponseData<null>(result));
    };
    /**
     * This method will reset the x value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameX = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameX(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the y value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameY = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameY(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the rotation value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameRotation = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameRotation(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the width of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameWidth = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameWidth(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the height of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameHeight = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameHeight(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the fitMode property of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetImageFrameFitMode = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetImageFrameFitMode(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the visibility property of a specified frame. If set to false the frame will be invisible and vice versa.
     * @param frameId The ID of the frame that needs to get updated
     * @param value True means the frame gets visible, false means the frame gets invisible
     * @returns
     */
    setFrameVisibility = async (frameId: Id, value: boolean) => {
        const res = await this.#editorAPI;
        return res.setFrameVisibility(frameId, value).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will remove a specific frame using the Id.
     * @param frameId The ID of the frame that needs to be deleted
     * @returns
     */
    removeFrame = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.removeFrame(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will add a new frame of 'frameType' to the template positioned on the requested
     * coordinates.
     * @param frameType The type of frame to create
     * @param x X coordinate of the new frame within the template
     * @param y Y coordinate of the new frame within the template
     * @param width Width of the new frame within the template
     * @param height Height of the new frame within the template
     * @returns The newly created frame's ID
     */
    addFrame = async (frameType: FrameTypeEnum, x: number, y: number, width: number, height: number) => {
        const res = await this.#editorAPI;
        return res.addFrame(frameType, x, y, width, height).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method will add a new frame of 'shapeType' type to the template positioned on the requested
     * coordinates.
     * @param shapeType The type of frame to create
     * @param x X coordinate of the new frame within the template
     * @param y Y coordinate of the new frame within the template
     * @param width Width of the new frame within the template
     * @param height Height of the new frame within the template
     * @returns The newly created frame's ID
     */
    addShapeFrame = async (shapeType: ShapeType, x: number, y: number, width: number, height: number) => {
        const res = await this.#editorAPI;
        return res.addFrame(shapeType, x, y, width, height).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method sets or removes the image source to the ImageFrame
     * @param imageFrameId The ID of the imageFrame where an image needs to be assigned to
     * @param src A new image source
     * @returns
     */
    private updateImageSource = async (imageFrameId: Id, src: ImageFrameSource | null) => {
        const res = await this.#editorAPI;
        const srcJson = src !== null ? JSON.stringify(src) : null;
        return res.setImageSource(imageFrameId, srcJson).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes the image source from the ImageFrame
     * @param imageFrameId The ID of the imageFrame where an image needs to be removed from
     */
    removeImageSource = async (imageFrameId: string) => {
        return this.updateImageSource(imageFrameId, null);
    };

    /**
     * This method will assign an image from a mediaConnector to the correct ImageFrame
     * @param imageFrameId The ID of the imageFrame where an image needs to be assigned to
     * @param connectorId Unique Id of the media connector
     * @param resourceId Unique Id of the asset that you want to assign to the imageFrame
     * @returns
     */
    setImageFromConnector = async (imageFrameId: Id, connectorId: string, resourceId: string) => {
        const src: ImageFrameConnectorSource = {
            assetId: resourceId,
            connectorId: connectorId,
            sourceType: ImageSourceTypeEnum.connector,
        };
        return this.updateImageSource(imageFrameId, src);
    };

    /**
     * This method will assign an image from url to the correct ImageFrame
     * Make sure the url can be accessed by the editor.
     * @param imageFrameId The ID of the imageFrame where an image needs to be assigned to
     * @param url A valid image uri
     * @returns
     */
    setImageFromUrl = async (imageFrameId: Id, url: string) => {
        const src: ImageFrameUrlSource = { url: url, sourceType: ImageSourceTypeEnum.url };
        return this.updateImageSource(imageFrameId, src);
    };

    /**
     * This method will set the fitMode property of a specified image frame.
     * @param imageFrameId The ID of the imageFrame that needs to get updated.
     * @param fitMode The new fitMode that you want to set to the imageFrame.
     * @returns
     */
    setImageFrameFitMode = async (imageFrameId: Id, fitMode: FitMode) => {
        const res = await this.#editorAPI;
        return res.setImageFrameFitMode(imageFrameId, fitMode).then((result) => getEditorResponseData<null>(result));
    };
    /**
     * This method will set the constrainProportions property of a specified frame.
     * @param frameId The ID of the frame that needs to get updated.
     * @param constrainProportions The new constraint that you want to set to the frame.
     * @returns
     */
    setFrameConstrainProportions = async (frameId: Id, constrainProportions: boolean) => {
        const res = await this.#editorAPI;
        return res
            .setFrameConstrainProportions(frameId, constrainProportions)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the vertical alignment property of a specified frame.
     * @param frameId The ID of the frame that needs to get updated
     * @param verticalAlign The new vertical alignment to be set to the frame.
     * @returns
     */
    setVerticalAlignment = async (frameId: Id, verticalAlign: VerticalAlign) => {
        const res = await this.#editorAPI;
        return res.setVerticalAlignment(frameId, verticalAlign).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the min copyFitting property of a specified frame.
     * @param frameId The ID of the frame that needs to get updated
     * @param value The new min copyFitting value to be set to the frame.
     * @returns
     */
    setMinCopyfitting = async (frameId: Id, value: string) => {
        const res = await this.#editorAPI;

        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setMinCopyfitting(frameId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the max copyFitting property of a specified frame.
     * @param frameId The ID of the frame that needs to get updated
     * @param value The new max copyFitting value to be set to the frame.
     * @returns
     */
    setMaxCopyfitting = async (frameId: Id, value: string) => {
        const res = await this.#editorAPI;

        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setMaxCopyfitting(frameId, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will enable copyFitting on a specified frame.
     * @param frameId The ID of the frame that needs to get updated
     * @param value The new value to be set to the frame.
     * @returns
     */
    setEnableCopyfitting = async (frameId: Id, value: boolean) => {
        const res = await this.#editorAPI;
        return res.setEnableCopyfitting(frameId, value).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the frame minCopyfitting to the frame's original value
     * @param frameId The ID of a specific frame
     * @returns
     */
    resetMinCopyfitting = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetMinCopyfitting(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the frame maxCopyfitting to the frame's original value
     * @param frameId The ID of a specific frame
     * @returns
     */
    resetMaxCopyfitting = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetMaxCopyfitting(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the frame enableCopyfitting to the frame's original value
     * @param frameId The ID of a specific frame
     * @returns
     */
    resetEnableCopyfitting = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetEnableCopyfitting(frameId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the visibility of the shape fill.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param enableFill Whether the shape fill is visible.
     * @returns
     */
    setShapeFrameEnableFill = async (shapeFrameId: Id, enableFill: boolean) => {
        return this.shapeController.setEnableFill(shapeFrameId, enableFill);
    };

    /**
     * This method will set the shape fill color of a specified shape frame.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param fillColor The new shape fill color that you want to set to the shapeFrame.
     * @returns
     */
    setShapeFrameFillColor = async (shapeFrameId: Id, fillColor: ColorUsage) => {
        return this.shapeController.setFillColor(shapeFrameId, fillColor);
    };

    /**
     * This method will set the visibility of the shape stroke.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param enableStroke Whether the shape stroke is visible.
     * @returns
     */
    setShapeFrameEnableStroke = async (shapeFrameId: Id, enableStroke: boolean) => {
        return this.shapeController.setEnableStroke(shapeFrameId, enableStroke);
    };

    /**
     * This method will set the shape stroke color of a specified shape frame.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param strokeColor The new shape stroke color that you want to set to the shapeFrame.
     * @returns
     */
    setShapeFrameStrokeColor = async (shapeFrameId: Id, strokeColor: ColorUsage) => {
        return this.shapeController.setStrokeColor(shapeFrameId, strokeColor);
    };

    /**
     * This method will set the shape stroke weight of a specified shape frame.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param strokeWeight The new shape stroke weight that you want to set to the shapeFrame.
     * @returns
     */
    setShapeFrameStrokeWeight = async (shapeFrameId: Id, strokeWeight: number) => {
        return this.shapeController.setStrokeWeight(shapeFrameId, strokeWeight);
    };

    /**
     * This method will set the blend mode of a specified shape frame
     * @param frameId The ID of a specific frame
     * @param blendMode The blend mode
     * @returns
     */
    setFrameBlendMode = async (frameId: Id, blendMode: BlendMode) => {
        const res = await this.#editorAPI;
        return res.setFrameBlendMode(frameId, blendMode).then((result) => getEditorResponseData<null>(result));
    };
}
