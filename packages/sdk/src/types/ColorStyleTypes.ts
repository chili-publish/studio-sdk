import { Id } from './CommonTypes';

export enum ColorType {
    rgb = 'rgb',
    hex = 'hex',
    cmyk = 'cmyk',
    gray = 'gray',
    hsl = 'hsl',
    /**
     * @deprecated Use spotCMYK or spotRGB instead
     */
    spot = 'spot',
    spotCMYK = 'spotCMYK',
    spotRGB = 'spotRGB',
}

export type RGBColor = {
    r: number;
    g: number;
    b: number;
    type: ColorType;
};

export type CMYKColor = {
    c: number;
    m: number;
    y: number;
    k: number;
    type: ColorType;
};

export type HSLColor = {
    h: number;
    s: number;
    l: number;
    type: ColorType;
};

export type GrayColor = {
    g: number;
    type: ColorType;
};

/**
 * @deprecated Use SpotColorCMYK or SpotColorRGB instead
 */
export type SpotColor = {
    spotName: string;
    c: number;
    m: number;
    y: number;
    k: number;
    type: ColorType;
};

export type SpotColorCMYK = {
    spotName: string;
    c: number;
    m: number;
    y: number;
    k: number;
    type: ColorType;
};

export type SpotColorRGB = {
    spotName: string;
    r: number;
    g: number;
    b: number;
    type: ColorType;
};

export type HexColor = {
    value: string;
    type: ColorType;
};

export type Color = RGBColor | CMYKColor | HSLColor | GrayColor | SpotColor | HexColor | SpotColorCMYK | SpotColorRGB;

export type ColorUpdate = Color;

export type DocumentColor = {
    id: string;
    name: string;
    color: Color;
};

export type ColorUsageUpdate = {
    /**
     * Reference to the stylekit color, can only be used if it is a stylekit color.
     */
    id?: Id;
    /**
     * The local color object, can only be used if it is a local color.
     */
    color?: ColorUpdate;
    type: ColorUsageType;
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
    id?: Id;
    /**
     * The local color object, can only be used if it is a local color.
     */
    color?: Color;
    type: ColorUsageType;
    /**
     * Opacity of the color (0-100) where 0 = fully transparent.
     */
    opacity?: number;
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
