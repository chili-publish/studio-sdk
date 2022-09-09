import { PropertyState } from './CommonTypes';

export type LayoutPropertiesType = {
    layoutId: number;

    width: { value: number; isOverride: boolean };
    height: { value: number; isOverride: boolean };
    timelineLengthMs: { value: number; isOverride: boolean };
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
    frameProperties: FrameProperties[];
    width: number | null;
    height: number | null;
    childLayouts: number[];
    layoutType: LayoutType;
    timelineLengthMs?: number;
    children?: LayoutWithFrameProperties[];
};

// used by new getter methods
export type Layout = {
    layoutId: number;
    layoutName: string;
    parentLayoutId?: number;
    width: PropertyState<number>;
    height: PropertyState<number>;
    childLayouts: number[];
    timelineLengthMs?: number;
};

export enum LayoutType {
    top = 'top',
    child = 'child',
}
