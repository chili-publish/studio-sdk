import { Id } from './CommonTypes';
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

export enum LayerVisibilityMode {
    visible = 'visible',
    hidden = 'hidden',
    conditional = 'conditional',
}

/**
 * The properties of a layer on a layout.
 */
export type LayerProperties = {
    layerId: Id;
    visibilityMode: LayerVisibilityMode;
    isPrintable: boolean;
    /**
     * The conditions that make the layer visible when `visibilityMode` is `conditional`.
     */
    visibilityConditions: VariableWithValue[];
};

/**
 * The layer properties to change, the omitted ones stay unchanged.
 */
export type LayerPropertiesUpdate = {
    isPrintable?: boolean;
    visibilityMode?: LayerVisibilityMode;
    visibilityConditions?: VariableWithValue[];
};
