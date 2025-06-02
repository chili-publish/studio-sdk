import { ColorUsage } from './ColorStyleTypes';
import { Id, PrivateData, PropertyState } from './CommonTypes';

export type LayoutPropertiesType = {
    id: Id;
    name: string;
    displayName: string | null;
    width: PropertyState<number>;
    height: PropertyState<number>;
    animated: PropertyState<boolean>;
    intent: PropertyState<LayoutIntent>;
    unit: PropertyState<MeasurementUnit>;
    fillColor: PropertyState<ColorUsage>;
    fillColorEnabled: PropertyState<boolean>;
    bleed: PropertyState<LayoutBleed | undefined>;
    availableForUser: boolean;
    selectedByUser: boolean;
    timelineLengthMs: PropertyState<number>;
    resizableByUser: ResizableLayoutProperties;
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
    intent: LayoutIntent | null;
};

// used by new getter methods
export type Layout = {
    id: Id;
    name: string;
    displayName?: string | null;
    privateData: PrivateData;
    parentId?: Id;
    width: PropertyState<number>;
    height: PropertyState<number>;
    layoutWidth: PropertyState<number>;
    layoutHeight: PropertyState<number>;
    childLayouts: Id[];
    timelineLengthMs: PropertyState<number>;
    unit: PropertyState<MeasurementUnit>;
    intent: PropertyState<LayoutIntent>;
    bleed: PropertyState<LayoutBleed>;
    fillColor: PropertyState<ColorUsage>;
    fillColorEnabled: PropertyState<boolean>;
    availableForUser: boolean;
    selectedByUser: boolean;
    resizableByUser: ResizableLayoutProperties;
};

// used by onLayoutsChanged
export type LayoutListItemType = {
    id: string;
    name: string;
    displayName?: string | null;
    type: LayoutType;
    availableForUser: boolean;
    selectedByUser: boolean;
    parentId?: Id | null;
    childLayouts: Id[];
};

export type LayoutBleed = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    areBleedValuesCombined: boolean;
};

export type BleedDeltaUpdate = {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    areBleedValuesCombined?: boolean;
};

export type LayoutPreset = {
    name: string;
    intent: LayoutIntent;
    unit: MeasurementUnit;
    width: string;
    height: string;
    duration?: number;
    bleed?: BleedDeltaUpdate;
};

export enum PositionEnum {
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    left = 'left',
}

export enum LayoutType {
    top = 'top',
    child = 'child',
}

export enum MeasurementUnit {
    px = 'px',
    mm = 'mm',
    cm = 'cm',
    inch = 'inch',
    pt = 'pt',
}

export enum LayoutIntent {
    print = 'print',
    digitalStatic = 'digitalStatic',
    digitalAnimated = 'digitalAnimated',
}

export type ResizableLayoutProperties = {
    enabled: boolean;
    minWidth?: number | null;
    maxWidth?: number | null;
    minHeight?: number | null;
    maxHeight?: number | null;
};

export type ResizableLayoutPropertiesUpdate = {
    enabled?: {
        value: boolean;
    } | null;
    minWidth?: {
        value: string | null;
    } | null;
    maxWidth?: {
        value: string | null;
    } | null;
    minHeight?: {
        value: string | null;
    } | null;
    maxHeight?: {
        value: string | null;
    } | null;
};
