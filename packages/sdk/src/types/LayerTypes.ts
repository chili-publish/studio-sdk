import { Id, PropertyState, VisibilityMode, VisibilityProperties } from './CommonTypes';
import { VariableWithValue } from './VariableTypes';

export type Layer = {
    id: Id;
    name: string;
    /**
     * The ids of the frames on this layer, ordered from bottom to top.
     */
    frameIds: Id[];
    /**
     * Frames on a locked layer can't be selected on the canvas. Frames added, pasted or moved to a locked layer are not selected.
     */
    isLocked: boolean;
};

/**
 * The properties of a layer on a layout (engine DTO; Dart name `LayerPropertiesDto`).
 * Each group has its own `isOverride` and `isReadOnly`. Both default to `false` and are always written.
 * `value` is the settings stored on this layout, and `null` when this layout does not set that group.
 * On a top layout both values are set and `isOverride` is `false`.
 * On a child layout a group is set only when that layout overrides it. The other value is `null`
 * with `isOverride` `false`, so a child can override one group without the other.
 */
export type LayerProperties = {
    layerId: Id;
    visibilityProperties: PropertyState<VisibilityProperties | null>;
    outputProperties: PropertyState<OutputProperties | null>;
};

/**
 * The layer properties to change. Omitted fields stay unchanged.
 */
export type LayerPropertiesUpdate = {
    outputIntent?: LayerOutputIntent;
    visibilityMode?: VisibilityMode;
    visibilityConditions?: VariableWithValue[];
};

/**
 * Whether a layer is included in output.
 * Omitted on read means `sameAsVisibility`.
 */
export enum LayerOutputIntent {
    sameAsVisibility = 'sameAsVisibility',
    notIncluded = 'notIncluded',
    alwaysIncluded = 'alwaysIncluded',
}

/**
 * Include-in-output settings of a layer on a layout.
 */
export type OutputProperties = {
    /** Default: `sameAsVisibility`. */
    outputIntent: LayerOutputIntent;
};
