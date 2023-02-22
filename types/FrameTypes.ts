// FramePropertiesDto
import { Id, PropertyState } from './CommonTypes';

export type FrameLayoutType = {
    frameId: Id;
    layoutId: Id;
    x: PropertyState<number>;
    y: PropertyState<number>;
    width: PropertyState<number>;
    height: PropertyState<number>;
    rotationDegrees: PropertyState<number>;
    scaleX: PropertyState<number>;
    scaleY: PropertyState<number>;
    included: PropertyState<boolean>;
    fitMode: PropertyState<FitMode>;
    minCopyfitting: PropertyState<number>;
    maxCopyfitting: PropertyState<number>;
    enableCopyfitting: PropertyState<boolean>;
} | null;

//Frame.image
export type FrameType = {
    frameId: Id;
    frameName: string;
    frameType: FrameTypeEnum;
    // `imageUrl` is not generic: should be removed from model
    imageUrl: string;
    blendMode: string;
    isConstrained: boolean;
};

export type Frame = TextFrame | ImageFrame | ShapeFrame;

export type ImageFrameVariableSource = {
    sourceType: ImageSourceTypeEnum.variable;
    variableId: string;
};

export type ImageFrameUrlSource = {
    sourceType: ImageSourceTypeEnum.url;
    url: string;
};

export type ImageFrameConnectorSource = {
    assetId: string;
    connectorId: string;
    sourceType: ImageSourceTypeEnum.connector;
};

export type ImageFrameSource = ImageFrameUrlSource | ImageFrameConnectorSource | ImageFrameVariableSource;

// used by new getter methods
export type ImageFrame = {
    frameId: Id;
    frameName: string;
    frameType: FrameTypeEnum.image;
    src?: ImageFrameSource;
    blendMode: BlendMode;
    isConstrained: boolean;
};

export type ShapeFrame = {
    frameId: Id;
    frameName: string;
    shapeType: ShapeType;
    frameType: FrameTypeEnum.shape;
    blendMode: BlendMode;
    isConstrained: boolean;
};

export type TextFrame = {
    frameId: Id;
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
    isConstrained: boolean;
};

export enum ImageSourceTypeEnum {
    url = 'url',
    variable = 'variable',
    connector = 'assetProvider',
}

export enum FrameTypeEnum {
    text = 'text',
    image = 'image',
    shape = 'shape',
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

export enum FitMode {
    fit = 'fit',
    fill = 'fill',
}

export enum UpdateZIndexMethod {
    bringToFront = 'bringToFront',
    sendToBack = 'sendToBack',
    bringForward = 'bringForward',
    sendBackward = 'sendBackward',
}

export enum ShapeType {
    ellipse = 'ellipse',
    rectangle = 'rectangle',
    polygon = 'polygon',
}
