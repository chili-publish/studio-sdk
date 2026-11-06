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
 * The properties of a layer on a layout.
 * `visibilityProperties.value` always holds the resolved visibility settings, including inherited ones.
 * `visibilityProperties.isOverride` is `true` only when this layout sets the visibility of this layer itself.
 * It is `false` on the top layout, and `false` when a child layout inherits visibility from its parent.
 * `outputProperties` is not inherited. `outputIntent` defaults to `sameAsVisibility`.
 */
export type LayerProperties = {
    layerId: Id;
    visibilityProperties: PropertyState<VisibilityProperties>;
    outputProperties: OutputProperties;
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
