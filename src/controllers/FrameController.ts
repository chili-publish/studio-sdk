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
     * @returns list of all frames
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getFrames().then((result) => getEditorResponseData<FrameType[]>(result));
    };

    /**
     * This method returns the list of selected frames
     * @returns list of all selected frames
     */
    getSelected = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedFrames().then((result) => getEditorResponseData<FrameType[]>(result));
    };

    /**
     * This method returns the list of frames by id
     * @param id the id of a specific page
     * @returns list of all frames by id
     */
    getAllByPageId = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getFramesByPageId(id).then((result) => getEditorResponseData<FrameType[]>(result));
    };

    /**
     * This method returns a frame by its name
     * @param name the name of a specific frame
     * @returns frame properties
     */
    getByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res.getFrameByName(name).then((result) => getEditorResponseData<FrameType>(result));
    };

    /**
     * This method returns a frame by its id
     * @param id the id of a specific frame
     * @returns frame properties
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getFrameById(id).then((result) => getEditorResponseData<FrameType>(result));
    };

    /**
     * This method returns all frame properties on current layout
     * @returns all frame properties on current layout
     */
    getPropertiesOnSelectedLayout = async () => {
        const res = await this.#editorAPI;
        return res
            .getFramePropertiesOnSelectedLayout()
            .then((result) => getEditorResponseData<FrameLayoutType[]>(result));
    };

    /**
     * This method returns frame layout properties for a given frame and layout
     * @param id the id of a specific frame
     * @param layoutId the id of a specific layout
     * @returns frame layout properties
     */
    getLayoutProperties = async (id: Id, layoutId?: Id) => {
        const res = await this.#editorAPI;
        return res
            .getFramePropertiesByFrameId(id, layoutId)
            .then((result) => getEditorResponseData<FrameLayoutType>(result));
    };

    /**
     * This method returns a list of frame properties for a given layout
     * @param layoutId the id of a specific layout
     * @returns list of frame layout properties
     */
    getAllLayoutProperties = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res.getFramesProperties(layoutId).then((result) => getEditorResponseData<FrameLayoutType[]>(result));
    };

    /**
     * This method will reset the frame size (width and height) to the frame's original value
     * @param id the id of a specific frame
     * @returns
     */
    resetSize = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameSize(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select a specific frame
     * @param id the id of a specific frame
     * @returns
     */
    select = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.selectFrames([id]).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select multipleFrames
     * @param ids An array of all ids you want to select
     * @returns
     */
    selectMultiple = async (ids: Id[]) => {
        const res = await this.#editorAPI;
        return res.selectFrames(ids).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes the order of frames in the z-index list.
     * @param order the index in the list to move to
     * @param frameIds An array of all IDs you want to move to the given index
     * @returns
     */
    reorderFrames = async (order: number, frameIds: Id[]) => {
        const res = await this.#editorAPI;
        return res.reorderFrames(order, frameIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will update the z-index of a frame.
     * @param id the id of the frame you want to change the z-index of
     * @param method the z-index update method to perform
     * @returns
     */
    setZIndex = async (id: Id, method: UpdateZIndexMethod) => {
        const res = await this.#editorAPI;
        return res.setFrameZIndex(id, method).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of a specific frame
     * @param id the id of a specific frame
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setHeight = async (id: Id, height: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(height);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setFrameHeight(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the rotation angle of a specific frame
     * @param id the id of a specific frame
     * @param rotation the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setRotation = async (id: Id, rotation: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(rotation);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setFrameRotation(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the width of a specific frame
     * @param id the id of a specific frame
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setWidth = async (id: Id, width: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(width);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setFrameWidth(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the x value of a specific frame
     * @param id the id of a specific frame
     * @param XValue the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setX = async (id: Id, XValue: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(XValue);

        if (calc === null || calc === Infinity) {
            return null;
        }
        return res
            .setFrameX(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the y value of a specific frame
     * @param id the id of a specific frame
     * @param YValue the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setY = async (id: Id, YValue: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(YValue);

        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setFrameY(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will update the name of a specific frame
     * @param id the id of a specific frame
     * @param name the new name that the frame should receive
     * @returns
     */
    rename = async (id: Id, name: string) => {
        const res = await this.#editorAPI;
        return res.renameFrame(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset properties of a specific frame to their original values
     * @param id the id of the frame that needs to get reset
     * @returns
     */
    reset = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrame(id).then((result) => getEditorResponseData<null>(result));
    };
    /**
     * This method will reset the x value of a specific frame to its original value
     * @param id the id of the frame that needs to get reset
     * @returns
     */
    resetX = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameX(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the y value of a specific frame to its original value
     * @param id the id of the frame that needs to get reset
     * @returns
     */
    resetY = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameY(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the rotation value of a specific frame to its original value
     * @param id the id of the frame that needs to get reset
     * @returns
     */
    resetRotation = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameRotation(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the width of a specific frame to its original value
     * @param id the id of the frame that needs to get reset
     * @returns
     */
    resetWidth = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameWidth(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the height of a specific frame to its original value
     * @param id the id of the frame that needs to get reset
     * @returns
     */
    resetHeight = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameHeight(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the fitMode property of a specific frame to its original value
     * @param id the id of the frame that needs to get reset
     * @returns
     */
    resetImageFrameFitMode = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetImageFrameFitMode(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the visibility property of a specified frame. If set to false the frame will be invisible and vice versa.
     * @param id the id of the frame that needs to get updated
     * @param value True means the frame gets visible, false means the frame gets invisible
     * @returns
     */
    setVisibility = async (id: Id, value: boolean) => {
        const res = await this.#editorAPI;
        return res.setFrameVisibility(id, value).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will remove a specific frame using the Id.
     * @param id the id of the frame that needs to be deleted
     * @returns
     */
    remove = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeFrame(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will create a new frame of 'type' to the template positioned on the requested
     * coordinates.
     * @param type the type of frame to create
     * @param x X coordinate of the new frame within the template
     * @param y Y coordinate of the new frame within the template
     * @param width Width of the new frame within the template
     * @param height Height of the new frame within the template
     * @returns the newly created frame's id
     */
    create = async (type: FrameTypeEnum, x: number, y: number, width: number, height: number) => {
        const res = await this.#editorAPI;
        return res.addFrame(type, x, y, width, height).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method will create a new frame of 'type' type to the template positioned on the requested
     * coordinates.
     * @param type the type of frame to create
     * @param x X coordinate of the new frame within the template
     * @param y Y coordinate of the new frame within the template
     * @param width Width of the new frame within the template
     * @param height Height of the new frame within the template
     * @returns the newly created shape frame's id
     */
    createShapeFrame = async (type: ShapeType, x: number, y: number, width: number, height: number) => {
        const res = await this.#editorAPI;
        return res.addFrame(type, x, y, width, height).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method sets or removes the image source to the ImageFrame
     * @param imageFrameId the id of the imageFrame where an image needs to be assigned to
     * @param newImageSource A new image source
     * @returns
     */
    private updateImageSource = async (imageFrameId: Id, src: ImageFrameSource | null) => {
        const res = await this.#editorAPI;
        const srcJson = src !== null ? JSON.stringify(src) : null;
        return res.setImageSource(imageFrameId, srcJson).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes the image source from the ImageFrame
     * @param imageFrameId the id of the imageFrame where an image needs to be removed from
     */
    removeImageSource = async (imageFrameId: string) => {
        return this.updateImageSource(imageFrameId, null);
    };

    /**
     * This method will assign an image from a mediaConnector to the correct ImageFrame
     * @param imageFrameId the id of the imageFrame where an image needs to be assigned to
     * @param connectorId Unique Id of the media connector
     * @param resourceId Unique Id of the asset that you want to assign to the imageFrame
     * @returns
     */
    setImageFromConnector = async (imageFrameId: Id, connectorId: string, resourceId: string) => {
        const src: ImageFrameConnectorSource = {
            assetId: resourceId,
            connectorId: connectorId,
            type: ImageSourceTypeEnum.connector,
        };
        return this.updateImageSource(imageFrameId, src);
    };

    /**
     * This method will assign an image from url to the correct ImageFrame
     * Make sure the url can be accessed by the editor.
     * @param imageFrameId the id of the imageFrame where an image needs to be assigned to
     * @param url A valid image uri
     * @returns
     */
    setImageFromUrl = async (imageFrameId: Id, url: string) => {
        const source: ImageFrameUrlSource = { url: url, type: ImageSourceTypeEnum.url };
        return this.updateImageSource(imageFrameId, source);
    };

    /**
     * This method will set the fitMode property of a specified image frame.
     * @param imageFrameId the id of the imageFrame that needs to get updated.
     * @param fitMode the new fitMode that you want to set to the imageFrame.
     * @returns
     */
    setImageFrameFitMode = async (imageFrameId: Id, fitMode: FitMode) => {
        const res = await this.#editorAPI;
        return res.setImageFrameFitMode(imageFrameId, fitMode).then((result) => getEditorResponseData<null>(result));
    };
    /**
     * This method will set the constrainProportions property of a specified frame.
     * @param id the id of the frame that needs to get updated.
     * @param constrainProportions The new constraint that you want to set to the frame.
     * @returns
     */
    setFrameConstrainProportions = async (id: Id, constrainProportions: boolean) => {
        const res = await this.#editorAPI;
        return res
            .setFrameConstrainProportions(id, constrainProportions)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the vertical alignment property of a specified frame.
     * @param id the id of the frame that needs to get updated
     * @param verticalAlign the new vertical alignment to be set to the frame.
     * @returns
     */
    setVerticalAlign = async (id: Id, verticalAlign: VerticalAlign) => {
        const res = await this.#editorAPI;
        return res.setVerticalAlignment(id, verticalAlign).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the min copyFitting property of a specified frame.
     * @param id the id of the frame that needs to get updated
     * @param value the new min copyFitting value to be set to the frame.
     * @returns
     */
    setMinCopyfitting = async (id: Id, value: string) => {
        const res = await this.#editorAPI;

        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setMinCopyfitting(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the max copyFitting property of a specified frame.
     * @param id the id of the frame that needs to get updated
     * @param value the new max copyFitting value to be set to the frame.
     * @returns
     */
    setMaxCopyfitting = async (id: Id, value: string) => {
        const res = await this.#editorAPI;

        const calc = getCalculatedValue(value);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setMaxCopyfitting(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will enable copyFitting on a specified frame.
     * @param id the id of the frame that needs to get updated
     * @param value the new value to be set to the frame.
     * @returns
     */
    setEnableCopyfitting = async (id: Id, value: boolean) => {
        const res = await this.#editorAPI;
        return res.setEnableCopyfitting(id, value).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the frame minCopyfitting to the frame's original value
     * @param id the id of a specific frame
     * @returns
     */
    resetMinCopyfitting = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetMinCopyfitting(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the frame maxCopyfitting to the frame's original value
     * @param id the id of a specific frame
     * @returns
     */
    resetMaxCopyfitting = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetMaxCopyfitting(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the frame enableCopyfitting to the frame's original value
     * @param id the id of a specific frame
     * @returns
     */
    resetEnableCopyfitting = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetEnableCopyfitting(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the visibility of the shape fill.
     * @param shapeFrameId the id of the shapeFrame that needs to get updated.
     * @param enableFill Whether the shape fill is visible.
     * @returns
     */
    setShapeFrameEnableFill = async (shapeFrameId: Id, enableFill: boolean) => {
        return this.shapeController.setEnableFill(shapeFrameId, enableFill);
    };

    /**
     * This method will set the shape fill color of a specified shape frame.
     * @param shapeFrameId the id of the shapeFrame that needs to get updated.
     * @param fillColor the new shape fill color that you want to set to the shapeFrame.
     * @returns
     */
    setShapeFrameFillColor = async (shapeFrameId: Id, fillColor: ColorUsage) => {
        return this.shapeController.setFillColor(shapeFrameId, fillColor);
    };

    /**
     * This method will set the visibility of the shape stroke.
     * @param shapeFrameId the id of the shapeFrame that needs to get updated.
     * @param enableStroke Whether the shape stroke is visible.
     * @returns
     */
    setShapeFrameEnableStroke = async (shapeFrameId: Id, enableStroke: boolean) => {
        return this.shapeController.setEnableStroke(shapeFrameId, enableStroke);
    };

    /**
     * This method will set the shape stroke color of a specified shape frame.
     * @param shapeFrameId the id of the shapeFrame that needs to get updated.
     * @param strokeColor the new shape stroke color that you want to set to the shapeFrame.
     * @returns
     */
    setShapeFrameStrokeColor = async (shapeFrameId: Id, strokeColor: ColorUsage) => {
        return this.shapeController.setStrokeColor(shapeFrameId, strokeColor);
    };

    /**
     * This method will set the shape stroke weight of a specified shape frame.
     * @param shapeFrameId the id of the shapeFrame that needs to get updated.
     * @param strokeWeight the new shape stroke weight that you want to set to the shapeFrame.
     * @returns
     */
    setShapeFrameStrokeWeight = async (shapeFrameId: Id, strokeWeight: number) => {
        return this.shapeController.setStrokeWeight(shapeFrameId, strokeWeight);
    };

    /**
     * This method will set the blend mode of a specified shape frame
     * @param id the id of a specific frame
     * @param blendMode the blend mode
     * @returns
     */
    setBlendMode = async (id: Id, blendMode: BlendMode) => {
        const res = await this.#editorAPI;
        return res.setFrameBlendMode(id, blendMode).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will make the specified image frame go into cropping mode.
     * @param id the id of a specific image frame
     * @returns
     */
    enterCropMode = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.enterCropMode(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will exit cropping mode while saving the applied crop.
     * @returns
     */
    applyCropMode = async () => {
        const res = await this.#editorAPI;
        return res.applyCropMode().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the currently applied crop mode and apply the last selected fit mode again.
     * @param id the id of a specific image frame
     * @returns
     */
    resetCropMode = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetCropMode(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will exit cropping mode without saving the applied crop.
     * @returns
     */
    exitCropMode = async () => {
        const res = await this.#editorAPI;
        return res.cancelCropMode().then((result) => getEditorResponseData<null>(result));
    };
}
