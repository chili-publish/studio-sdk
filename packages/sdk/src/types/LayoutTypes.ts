import { Id, PropertyState } from './CommonTypes';

export type LayoutPropertiesType = {
    id: Id;
    width: { value: number; isOverride: boolean };
    height: { value: number; isOverride: boolean };
    timelineLengthMs: { value: number; isOverride: boolean };
    [key: string]: number | string | Record<string, unknown>;
} | null;

export type FrameProperties = {
    id: Id;
    type: string;
    height: number | null;
    isVisible: boolean | null;
    rotationDegrees: number | null;
    scaleX: number | null;
    scaleY: number | null;
    width: number | null;
    x: number | null;
    y: number | null;
};

export type LayoutWithFrameProperties = {
    id: Id;
    name: string;
    parentId?: Id;
    frameProperties: FrameProperties[];
    width: number | null;
    height: number | null;
    childLayouts: Id[];
    type: LayoutType;
    timelineLengthMs?: number;
    children?: LayoutWithFrameProperties[];
};

// used by new getter methods
export type Layout = {
    id: Id;
    name: string;
    parentId?: Id;
    width: PropertyState<number>;
    height: PropertyState<number>;
    childLayouts: Id[];
    timelineLengthMs?: number;
};

// used by onLayoutsChanged
export type LayoutListItemType = {
    id: string;
    name: string;
    type: LayoutType;
    parentId?: string | null;
    childLayouts: string[];
};

export enum LayoutType {
    top = 'top',
    child = 'child',
}
