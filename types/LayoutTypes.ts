import {PropertyState} from "./CommonTypes";

export type LayoutPropertiesType = {
    layoutId: number;

    width: { value: number; isOverride: boolean };
    height: { value: number; isOverride: boolean };
    [key: string]: number | string | Record<string, unknown>;
} | null;

export type FrameProperties = {
    frameId: number;
    framePropertiesType: string;
    height: number | null;
    included: boolean | null;
    rotationDegrees: number | null;
    scaleX: number | null;
    scaleY: number | null;
    width: number | null;
    x: number | null;
    y: number | null;
};

export type LayoutWithFrameProperties = {
    layoutId: number;
    layoutName: string;
    parentLayoutId?: number;
    width: number | null;
    height: number | null;
    timelineLengthMs?: number;
    frameProperties: FrameProperties[];
    childLayouts: number[];
    layoutType: LayoutType;
    children?: LayoutWithFrameProperties[];
}

// used by new getter methods
export type Layout = {
    layoutId: number;
    layoutName: string;
    parentLayoutId?: number;
    timelineLengthMs?: number;
    width: PropertyState<number>;
    height: PropertyState<number>;
    childLayouts: number[];
}

export enum LayoutType {
    top = 'top',
    child = 'child'
}