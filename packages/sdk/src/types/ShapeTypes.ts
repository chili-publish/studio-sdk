import { ColorUsage } from './ColorStyleTypes';

export enum ShapeType {
    ellipse = 'ellipse',
    rectangle = 'rectangle',
    polygon = 'polygon',
    custom = 'custom',
}

export interface ShapeProperties {
    enableFill?: boolean;
    fillColor?: ColorUsage;
    enableStroke?: boolean;
    strokeColor?: ColorUsage;
    strokeWeight?: number;
    allCornersSame?: boolean;
}

export interface ShapeContainerProperties {
    enableStroke: boolean;
    strokeColor: ColorUsage;
    strokeWeight: number;
    allCornersSame: boolean;
}

export interface CornerRadiusUpdateModel {
    radiusAll?: number;
    topLeft?: number;
    bottomLeft?: number;
    topRight?: number;
    bottomRight?: number;
    allCornersSame?: boolean;
}

export interface CornerRadiusNone {
    type: string;
}

export interface CornerRadiusAll {
    type: string;
    radius: number;
}

export interface CornerRadiusOnly {
    type: string;
    topLeft: number;
    bottomLeft: number;
    topRight: number;
    bottomRight: number;
}

export enum CornerRadiusType {
    all = 'all',
    only = 'only',
    none = 'none',
}

export type CornerRadius = CornerRadiusNone | CornerRadiusAll | CornerRadiusOnly;

export type ShapeFrameRectSource = {
    type: ShapeType.rectangle;
    cornerRadius?: CornerRadius;
};

export type ShapeFrameEllipseSource = {
    type: ShapeType.ellipse;
};

export type ShapeFramePolygonSource = {
    type: ShapeType.polygon;
    sides?: number;
    cornerRadius?: CornerRadius;
};

export type ShapeFrameCustomSource = {
    type: ShapeType.custom;
    /**  
     * The shape path is in relative coordinates to the frame, 
     * with the top left corner of the frame being (0, 0) and the 
     * bottom right corner being (1, 1). The path should be a valid SVG path string. 
     */
    path: string;
};

export type ShapeFrameSource =
    | ShapeFrameRectSource
    | ShapeFrameEllipseSource
    | ShapeFramePolygonSource
    | ShapeFrameCustomSource;
