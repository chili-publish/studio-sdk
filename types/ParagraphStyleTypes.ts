import { Alignment, Case, Scripting } from './TextStyleTypes';
import { Color, ColorUpdate } from './ColorStyleTypes';

export type ColorUsageUpdate = {
    /**
     * Reference to the stylekit color, can only be used if it is a stylekit color.
     */
    colorId?: string;
    /**
     * The local color object, can only be used if it is a local color.
     */
    color?: ColorUpdate;
    usageType: ColorUsageType;
    /**
     * Opacity of the color (0-100) where 0 = fully transparent.
     */
    opacity?: number;
    /**
     * Indicates if the color will be applied or not.
     */
    isApplied?: boolean;
};

export type ColorUsage = {
    /**
     * Reference to the stylekit color, can only be used if it is a stylekit color.
     */
    colorId?: string;
    /**
     * The local color object, can only be used if it is a local color.
     */
    color?: Color;
    usageType: ColorUsageType;
    /**
     * Opacity of the color (0-100) where 0 = fully transparent.
     */
    opacity?: number;
    /**
     * Indicates if the color will be applied or not.
     */
    isApplied?: boolean;
};

export enum ColorUsageType {
    /**
     * The color is defined locally on the object
     */
    local = 'local',
    /**
     * THe color is referencing a stylekit color
     */
    stylekit = 'stylekit',
}

export type ParagraphStyle = {
    id: string;
    name: string;
    fontKey: string;
    fontStyle: string;
    fontSize: number;
    typographicCase: Case;
    kerningOn: boolean;
    subSuperScript: Scripting;
    // the following properties are unit properties
    trackingLeft: string;
    trackingRight: string;
    paragraphStartIndent: string;
    paragraphEndIndent: string;
    paragraphSpaceBefore: string;
    paragraphSpaceAfter: string;
    textIndent: string;
    // end of unit properties
    alignToBaseLine: boolean;
    baselineShiftValue: string;
    lineHeight: number;
    textAlign: Alignment;
    textAlignLast: Alignment;
    textOverprint: boolean;
    color: ColorUsage;
    underline: boolean;
    lineThrough: boolean;
};

export type ParagraphStyleUpdate = {
    fontSize: {
        value: number;
    };
    typographicCase: {
        value: Case;
    };
    kerningOn: {
        value: boolean;
    };
    subSuperScript: {
        value: Scripting;
    };
    trackingLeft: {
        value: string;
    };
    trackingRight: {
        value: string;
    };
    textIndent: {
        value: string;
    };
    alignToBaseLine: {
        value: boolean;
    };
    baselineShiftValue: {
        value: string;
    };
    lineHeight: {
        value: number;
    };
    textAlign: {
        value: Alignment;
    };
    textAlignLast: {
        value: Alignment;
    };
    textOverprint: {
        value: boolean;
    };
    color: {
        value: ColorUsageUpdate;
    };
    underline: {
        value: boolean;
    };
    lineThrough: {
        value: boolean;
    };
};
