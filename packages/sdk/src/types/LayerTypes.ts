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
 * `visibilityProperties.value` always holds the resolved settings, including inherited ones.
 * `visibilityProperties.isOverride` is `true` only when this layout sets the visibility properties of this layer itself.
 * It is `false` on the top layout, and `false` when a child layout inherits them from its parent.
 */
export type LayerProperties = {
    layerId: Id;
    visibilityProperties: PropertyState<VisibilityProperties>;
};

/**
 * The layer properties to change, the omitted ones stay unchanged.
 */
export type LayerPropertiesUpdate = {
    isPrintable?: boolean;
    visibilityMode?: VisibilityMode;
    visibilityConditions?: VariableWithValue[];
};
