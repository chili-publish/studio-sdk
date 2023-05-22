import { ColorUsage } from './ColorStyleTypes';

export enum ShapeType {
    ellipse = 'ellipse',
    rectangle = 'rectangle',
    polygon = 'polygon',
}

export interface ShapeProperties {
    enableFill?: boolean;
    fillColor?: ColorUsage;
    enableStroke?: boolean;
    strokeColor?: ColorUsage;
    strokeWeight?: number;
    allCornersSame?: boolean;
}

export interface CornerRadius {
    radiusAll?: number;
    topLeft?: number;
    bottomLeft?: number;
    topRight?: number;
    bottomRight?: number;
}

export enum CornerRadiusType {
    all = 'all',
    only = 'only',
    none = 'none',
}
