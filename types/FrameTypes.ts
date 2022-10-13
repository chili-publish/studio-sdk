// FramePropertiesDto
import { PropertyState } from './CommonTypes';

export type FrameLayoutType = {
    frameId: number;
    layoutId: number;
    x: PropertyState<number>;
    y: PropertyState<number>;
    width: PropertyState<number>;
    height: PropertyState<number>;
    rotationDegrees: PropertyState<number>;
    scaleX: PropertyState<number>;
    scaleY: PropertyState<number>;
    included: PropertyState<boolean>;
} | null;

//Frame.image
export type FrameType = {
    frameId: number;
    frameName: string;
    frameType: FrameTypeEnum;
    imageUrl: string;
    blendMode: string;
};

export type Frame = TextFrame | ImageFrame;
// used by new getter methods
export type ImageFrame = {
    frameId: number;
    frameName: string;
    frameType: FrameTypeEnum.image;
    src: string;
    blendMode: BlendMode;
};
export type TextFrame = {
    frameId: number;
    frameName: string;
    frameType: FrameTypeEnum.text;
    textContent: string;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    numberOfColumn: number;
    columnGap: number;
    textDirection: TextDirection;
    flowDirection: FlowDirection;
    verticalAlign: VerticalAlign;
    textStroke: boolean;
    textStrokeWeight: number;
    textStrokeColor: number;
    hasClippingPath: boolean;
    blendMode: BlendMode;
};

export enum FrameTypeEnum {
    text = 'text',
    image = 'image',
}

export enum TextDirection {
    leftToRight = 'leftToRight',
    rightToLeft = 'rightToLeft',
    weak = 'weak',
}

export enum FlowDirection {
    horizontal = 'horizontal',
    vertical = 'vertical',
    onPath = 'onPath',
}

export enum VerticalAlign {
    top = 'top',
    bottom = 'bottom',
    middle = 'middle',
    justify = 'justify',
}
export enum BlendMode {
    clear = 'clear',
    src = 'src',
    dst = 'dst',
    srcOver = 'srcOver',
    dstOver = 'dstOver',
    srcIn = 'srcIn',
    dstIn = 'dstIn',
    srcOut = 'srcOut',
    dstOut = 'dstOut',
    srcATop = 'srcATop',
    dstATop = 'dstATop',
    xor = 'xor',
    plus = 'plus',
    modulate = 'modulate',
    screen = 'screen',
    overlay = 'overlay',
    darken = 'darken',
    lighten = 'lighten',
    colorDodge = 'colorDodge',
    colorBurn = 'colorBurn',
    hardLight = 'hardLight',
    softLight = 'softLight',
    difference = 'difference',
    exclusion = 'exclusion',
    multiply = 'multiply',
    hue = 'hue',
    saturation = 'saturation',
    color = 'color',
    luminosity = 'luminosity',
}
