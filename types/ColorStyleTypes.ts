export enum ColorType {
    rgb = 'rgb',
    cmyk = 'cmyk',
    lab = 'lab',
    gray = 'gray',
    xyz = 'xyz',
    hls = 'hls',
    spotCmyk = 'spotCmyk',
    spotRgb = 'spotRgb',
    custom = 'custom',
}

export type ColorUpdate = {
    r: number;
    g: number;
    b: number;
    colorType: ColorType;
}

export type Color = {
    colorType:ColorType
    r: number;
    g: number;
    b: number;
    displayValue?: string;
}

export type DocumentColor = {
    id: string;
    name: string;
    color: Color;
}