// FramePropertiesDto
import { ColorUsage } from './ColorStyleTypes';
import { Id, PropertyState } from './CommonTypes';
import { CornerRadiusAll, CornerRadiusNone, CornerRadiusOnly, ShapeType } from './ShapeTypes';

export type FrameLayoutType = {
    id: Id;
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
    hasImageCrop: PropertyState<boolean>;
    minCopyfitting: PropertyState<number>;
    maxCopyfitting: PropertyState<number>;
    enableCopyfitting: PropertyState<boolean>;
} | null;

//Frame.image
export type FrameType = {
    id: Id;
    name: string;
    type: FrameTypeEnum;
    // `imageUrl` is not generic: should be removed from model
    imageUrl: string;
    blendMode: string;
    constrainProportions: boolean;
};

export type Frame = TextFrame | ImageFrame | ShapeFrame;

export type ImageFrameVariableSource = {
    variableId: string;
    type: ImageSourceTypeEnum.variable;
};

export type ImageFrameUrlSource = {
    url: string;
    type: ImageSourceTypeEnum.url;
};

export type ImageFrameConnectorSource = {
    id: string;
    assetId: string;
    type: ImageSourceTypeEnum.connector;
};

export type ImageFrameSource = ImageFrameUrlSource | ImageFrameConnectorSource | ImageFrameVariableSource;

// used by new getter methods
export type ImageFrame = {
    id: Id;
    name: string;
    type: FrameTypeEnum.image;
    src?: ImageFrameSource;
    blendMode: BlendMode;
    constrainProportions: boolean;
    crop?: CropSettings | NoCropSettings;
};

export type ShapeFrame = {
    id: Id;
    name: string;
    type: FrameTypeEnum.shape;
    blendMode: BlendMode;
    constrainProportions: boolean;
    shapeProperties: {
        enableFill: boolean;
        fillColor: ColorUsage;
        enableStroke: boolean;
        strokeWeight: number;
        strokeColor: ColorUsage;
        allCornersSame: boolean;
    };
    src: {
        type: ShapeType;
        cornerRadius: CornerRadiusNone | CornerRadiusAll | CornerRadiusOnly;
        sides?: number;
    };
};

export type TextFrame = {
    id: Id;
    name: string;
    type: FrameTypeEnum.text;
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
    constrainProportions: boolean;
};

export type CropSettings = {
    left: number;
    top: number;
    width: number;
    height: number;
    rotationDegrees: number;
    type: 'default';
};

export type NoCropSettings = {
    type: 'noCrop';
};

export enum ImageSourceTypeEnum {
    url = 'url',
    variable = 'variable',
    connector = 'connector',
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
    normal = 'normal',
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
