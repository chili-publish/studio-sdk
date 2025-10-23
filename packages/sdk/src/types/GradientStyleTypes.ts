import { ColorUsage } from './ColorStyleTypes';
import { Id } from './CommonTypes';

export enum GradientType {
    linear = 'linear',
}

export type GradientDefinition = LinearGradientDefinition;

export type LinearGradientDefinition = {
    colors: ColorUsage[];
    stops: number[];
    type: GradientType;
};

export type GradientUpdate = GradientDefinition;

export type DocumentGradient = {
    id: string;
    name: string;
    gradient: GradientDefinition;
};

export type GradientUsage = LinearGradientUsage;

export type LinearGradientUsage = {
    /**
     * Indicates if the gradient will be applied or not.
     */
    enabled: boolean;
    /**
     * Reference to the brand kit color, can only be used if it is a brand kit color.
     */
    id?: Id;
    /**
     * The local color object, can only be used if it is a local color.
     */
    gradient?: LinearGradientDefinition;
    /**
     * The start and stop positions of the gradient. Relative to the frame size
     */
    startStop: RelativeOffsets;
    type: GradientUsageType;
};

export enum GradientUsageType {
    /**
     * The linear gradient is defined locally on the object
     */
    local = 'linearLocal',
    /**
     * The linear gradient is referencing a document gradient
     */
    linearBrandKit = 'linearBrandKit',
}

export type GradientDeltaUpdate = {
    /**
     * Reference to the brand kit gradient, can only be used if it is a brand kit gradient.
     */
    id?: Id;
    /**
     * The local gradient object, can only be used if it is a local gradient.
     */
    gradient?: GradientUpdate;
    /**
     * Indicates if the gradient will be applied or not.
     */
    isApplied?: boolean;
};

/**
 * Represents relative start and end offsets
 */
export type RelativeOffsets = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};
