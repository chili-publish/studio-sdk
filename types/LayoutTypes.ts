import { Id, PropertyState } from './CommonTypes';

export type LayoutPropertiesType = {
    layoutId: Id;

    width: { value: number; isOverride: boolean };
    height: { value: number; isOverride: boolean };
    timelineLengthMs: { value: number; isOverride: boolean };
    [key: string]: number | string | Record<string, unknown>;
} | null;

export type FrameProperties = {
    frameId: Id;
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
    layoutId: Id;
    layoutName: string;
    parentLayoutId?: Id;
    frameProperties: FrameProperties[];
    width: number | null;
    height: number | null;
    childLayouts: Id[];
    layoutType: LayoutType;
    timelineLengthMs?: number;
    children?: LayoutWithFrameProperties[];
};

// used by new getter methods
export type Layout = {
    layoutId: Id;
    layoutName: string;
    parentLayoutId?: Id;
    width: PropertyState<number>;
    height: PropertyState<number>;
    childLayouts: Id[];
    timelineLengthMs?: number;
};

export enum LayoutType {
    top = 'top',
    child = 'child',
}
