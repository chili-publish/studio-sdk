import { EditorAPI, Id } from '../types/CommonTypes';
import { ColorUsage } from '../types/ColorStyleTypes';
import { CornerRadius, ShapeProperties } from '../types/ShapeTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ShapeController is responsible for all communication regarding Shapes.
 * Methods inside this controller can be called by `window.SDK.shape.{method-name}`
 */
export class ShapeController {
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
     * This method updates properties of the shape
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param properties A property to update
     * @returns
     */
    private setShapeProperties = async (shapeFrameId: Id, properties: ShapeProperties) => {
        const res = await this.#editorAPI;
        return res
            .setShapeProperties(shapeFrameId, JSON.stringify(properties))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the visibility of the shape fill.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param enableFill Whether the shape fill is visible.
     * @returns
     */
    setEnableFill = async (shapeFrameId: Id, enableFill: boolean) => {
        const properties: ShapeProperties = { enableFill: enableFill };
        return this.setShapeProperties(shapeFrameId, properties);
    };

    /**
     * This method will set the shape fill color of a specified shape frame.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param fillColor The new shape fill color that you want to set to the shapeFrame.
     * @returns
     */
    setFillColor = async (shapeFrameId: Id, fillColor: ColorUsage) => {
        const properties: ShapeProperties = { fillColor: fillColor };
        return this.setShapeProperties(shapeFrameId, properties);
    };

    /**
     * This method will set the visibility of the shape stroke.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param enableStroke Whether the shape stroke is visible.
     * @returns
     */
    setEnableStroke = async (shapeFrameId: Id, enableStroke: boolean) => {
        const properties: ShapeProperties = { enableStroke: enableStroke };
        return this.setShapeProperties(shapeFrameId, properties);
    };

    /**
     * This method will set the shape stroke color of a specified shape frame.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param strokeColor The new shape stroke color that you want to set to the shapeFrame.
     * @returns
     */
    setStrokeColor = async (shapeFrameId: Id, strokeColor: ColorUsage) => {
        const properties: ShapeProperties = { strokeColor: strokeColor };
        return this.setShapeProperties(shapeFrameId, properties);
    };

    /**
     * This method will set the shape stroke weight of a specified shape frame.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param strokeWeight The new shape stroke weight that you want to set to the shapeFrame.
     * @returns
     */
    setStrokeWeight = async (shapeFrameId: Id, strokeWeight: number) => {
        const properties: ShapeProperties = { strokeWeight: strokeWeight };
        return this.setShapeProperties(shapeFrameId, properties);
    };

    /**
     * This method will set the flag to change the way the rectangle shape corners will be changed: all at once or separately.
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param allCornersSame The new flag that you want to set to the shapeFrame.
     * @returns
     */
    setFlagAllCornersSame = async (shapeFrameId: Id, allCornersSame: boolean) => {
        const properties: ShapeProperties = { allCornersSame: allCornersSame };
        return this.setShapeProperties(shapeFrameId, properties);
    };

    /**
     * This method updates radii of the rectangle and polygon shapes
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param radius A radius object to update a desired corner;
     * @returns
     */
    private setShapeCorners = async (shapeFrameId: Id, radius: CornerRadius) => {
        const res = await this.#editorAPI;
        return res
            .setShapeCorners(shapeFrameId, JSON.stringify(radius))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the radius for all corners of the rectangle and polygon shapes
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param radius A radius to update all corners at once;
     * @returns
     */
    setRadiusAll = async (shapeFrameId: Id, radius: number) => {
        const cornerRadius: CornerRadius = { radiusAll: radius };
        return this.setShapeCorners(shapeFrameId, cornerRadius);
    };

    /**
     * This method will set the radius for the top left corner of the rectangle shape
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param radius A radius to update the top left corner;
     * @returns
     */
    setRadiusTopLeft = async (shapeFrameId: Id, radius: number) => {
        const cornerRadius: CornerRadius = { topLeft: radius };
        return this.setShapeCorners(shapeFrameId, cornerRadius);
    };

    /**
     * This method will set the radius for the bottom left corner of the rectangle shape
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param radius A radius to update the bottom left corner;
     * @returns
     */
    setRadiusBottomLeft = async (shapeFrameId: Id, radius: number) => {
        const cornerRadius: CornerRadius = { bottomLeft: radius };
        return this.setShapeCorners(shapeFrameId, cornerRadius);
    };

    /**
     * This method will set the radius for the top right corner of the rectangle shape
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param radius A radius to update the top right corner;
     * @returns
     */
    setRadiusTopRight = async (shapeFrameId: Id, radius: number) => {
        const cornerRadius: CornerRadius = { topRight: radius };
        return this.setShapeCorners(shapeFrameId, cornerRadius);
    };

    /**
     * This method will set the radius for the bottom right corner of the rectangle shape
     * @param shapeFrameId The ID of the shapeFrame that needs to get updated.
     * @param radius A radius to update the bottom right corner;
     * @returns
     */
    setRadiusBottomRight = async (shapeFrameId: Id, radius: number) => {
        const cornerRadius: CornerRadius = { bottomRight: radius };
        return this.setShapeCorners(shapeFrameId, cornerRadius);
    };
}
