// FramePropertiesDto
import { BarcodeCharacterSet, BarcodeErrorCorrectionLevel, BarcodeType, QuietZone } from './BarcodeTypes';
import { ColorUsage } from './ColorStyleTypes';
import { HasOverrideState, Id, PropertyState } from './CommonTypes';
import { GradientUsage } from './GradientStyleTypes';
import { CornerRadiusAll, CornerRadiusNone, CornerRadiusOnly, ShapeType } from './ShapeTypes';

export type FrameLayoutType = {
    id: Id;
    layoutId: Id;
    horizontal: FrameAnchor;
    vertical: FrameAnchor;
    x: PropertyState<number>;
    y: PropertyState<number>;
    width: PropertyState<number>;
    height: PropertyState<number>;
    rotationDegrees: PropertyState<number>;
    scaleX: PropertyState<number>;
    scaleY: PropertyState<number>;
    isVisible: PropertyState<boolean>;
    fitMode: PropertyState<FitMode>;
    fitModePosition: PropertyState<FitModePosition>;
    hasImageCrop: PropertyState<boolean>;
    hasFrameSubjectArea: PropertyState<boolean>;
    minCopyfitting: PropertyState<number>;
    maxCopyfitting: PropertyState<number>;
    enableCopyfitting: PropertyState<boolean>;
    autoGrow: AutoGrowSettings;
    isShowingCustomCroppedAsset: boolean;
    customCroppedAssetCount: number;
} | null;

//Frame.image
export type FrameType = {
    id: Id;
    name: string;
    type: FrameTypeEnum;
    // `imageUrl` is not generic: should be removed from model
    imageUrl: string;
    blendMode: string;
};

export type Frame = TextFrame | ImageFrame | ShapeFrame | BarcodeFrame;

export type ImageFrameVariableSource = {
    type: ImageSourceTypeEnum.variable;
    id: Id;
};

export type ImageFrameUrlSource = {
    type: ImageSourceTypeEnum.url;
    url: string;
};

export type ImageFrameConnectorSource = {
    type: ImageSourceTypeEnum.connector;
    assetId: Id;
    id: Id;
};

export type ImageFrameBrandkitMediaSource = {
    type: ImageSourceTypeEnum.brandKitMedia;
    name: string;
};

export type ImageFrameSource =
    | ImageFrameConnectorSource
    | ImageFrameVariableSource
    | ImageFrameUrlSource
    | ImageFrameBrandkitMediaSource;

// used by new getter methods
export type ImageFrame = {
    id: Id;
    name: string;
    type: FrameTypeEnum.image;
    src?: ImageFrameSource;
    blendMode: BlendMode;
    dropShadowSettings?: DropShadowSettings;
};

export type ShapeFrame = {
    id: Id;
    name: string;
    type: FrameTypeEnum.shape;
    blendMode: BlendMode;
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
    dropShadowSettings?: DropShadowSettings;
    gradient?: GradientUsage;
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
    dropShadowSettings?: DropShadowSettings;
};

export type BarcodeFrame = {
    id: Id;
    name: string;
    type: FrameTypeEnum.barcode;
    blendMode: BlendMode;
    barcodeProperties: {
        enableBackground: boolean;
        backgroundColor: ColorUsage;
        enableBarColor: boolean;
        barColor: ColorUsage;
        enableText: boolean;
        barHeight: number;
        magnification: number;
        quietZone: QuietZone;
        errorCorrectionLevel?: BarcodeErrorCorrectionLevel;
        characterSet?: BarcodeCharacterSet;
        drawStartStopChars: boolean;
    };
    src?: BarcodeSource;
    barcodeType: BarcodeType;
    dropShadowSettings?: DropShadowSettings;
};

export type BarcodeSource = BarcodeVariableSource | BarcodeTextSource;

export type BarcodeVariableSource = {
    type: BarcodeSourceTypeEnum.variable;
    id: Id;
};

export type BarcodeTextSource = {
    type: BarcodeSourceTypeEnum.text;
    text: string;
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

export type AutoGrowSettings = {
    enabled: PropertyState<boolean>;
    minWidth: PropertyState<number>;
    maxWidth: PropertyState<number>;
    minHeight: PropertyState<number>;
    maxHeight: PropertyState<number>;
    directions: PropertyState<Array<AutoGrowDirection>>;
};

export interface AutoGrowDeltaUpdate {
    enabled?: {
        value: boolean;
    };
    minWidth?: {
        value: string | null;
    };
    maxWidth?: {
        value: string | null;
    };
    minHeight?: {
        value: string | null;
    };
    maxHeight?: {
        value: string | null;
    };
    directions?: {
        value: Array<AutoGrowDirection>;
    };
}

export type DropShadowSettings = {
    enabled: boolean;
    distance: number;
    angleDegrees: number;
    blurRadius: number;
    color: ColorUsage;
};

export interface ShadowSettingsDeltaUpdate {
    distance?: {
        value: string;
    };
    angleDegrees?: {
        value: number;
    };
    blurRadius?: {
        value: number;
    };
    enabled?: {
        value: boolean;
    };
    color?: {
        value: ColorUsage;
    };
}

export enum AutoGrowDirection {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
}

export enum ImageSourceTypeEnum {
    url = 'url',
    variable = 'variable',
    connector = 'connector',
    brandKitMedia = 'brandKitMedia',
}

export enum FrameTypeEnum {
    text = 'text',
    image = 'image',
    shape = 'shape',
    barcode = 'barcode',
}

export enum BarcodeSourceTypeEnum {
    variable = 'variable',
    text = 'text',
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
    fill = 'fill',
    fit = 'fit',
    smartCrop = 'smartCrop',
    manualCrop = 'manualCrop',
}

export enum FitModePosition {
    topLeft = 'topLeft',
    topCenter = 'topCenter',
    topRight = 'topRight',
    centerLeft = 'centerLeft',
    center = 'center',
    centerRight = 'centerRight',
    bottomLeft = 'bottomLeft',
    bottomCenter = 'bottomCenter',
    bottomRight = 'bottomRight',
}

export enum UpdateZIndexMethod {
    bringToFront = 'bringToFront',
    sendToBack = 'sendToBack',
    bringForward = 'bringForward',
    sendBackward = 'sendBackward',
}

export enum FrameAnchorType {
    relative = 'relative',
    start = 'start',
    end = 'end',
    startAndEnd = 'startAndEnd',
    center = 'center',
}

export enum AnchorTargetType {
    page = 'page',
    frame = 'frame',
}

export enum AnchorTargetEdgeType {
    start = 'start',
    end = 'end',
    center = 'center',
}

export class PageAnchorTarget {
    type = AnchorTargetType.page;
}

export class FrameAnchorTarget {
    frameId: Id;
    edge: AnchorTargetEdgeType;
    type = AnchorTargetType.frame;

    constructor(id: Id, edge: AnchorTargetEdgeType) {
        (this.frameId = id), (this.edge = edge);
    }
}

export type AnchorTarget = PageAnchorTarget | FrameAnchorTarget;

export type RelativeFrameAnchor = {
    start: PropertyState<number>;
    end: PropertyState<number>;
    target: AnchorTarget;
    type: FrameAnchorType.relative;
} & HasOverrideState;

export type StartFrameAnchor = {
    offset: PropertyState<number>;
    target: AnchorTarget;
    type: FrameAnchorType.start;
} & HasOverrideState;

export type EndFrameAnchor = {
    offset: PropertyState<number>;
    target: AnchorTarget;
    type: FrameAnchorType.end;
} & HasOverrideState;

export type StartAndEndFrameAnchor = {
    start: PropertyState<number>;
    startTarget: AnchorTarget;
    end: PropertyState<number>;
    endTarget: AnchorTarget;
    type: FrameAnchorType.startAndEnd;
} & HasOverrideState;

export type CenterFrameAnchor = {
    offset: PropertyState<number>;
    target: AnchorTarget;
    type: FrameAnchorType.center;
} & HasOverrideState;

export type FrameAnchor =
    | RelativeFrameAnchor
    | StartFrameAnchor
    | EndFrameAnchor
    | StartAndEndFrameAnchor
    | CenterFrameAnchor;

export type FrameAnchorProperties = {
    horizontal: boolean;
    type: FrameAnchorType;
    target: AnchorTarget;
    endTarget?: AnchorTarget | null;
};

export type AnchorConfiguration = {
    allowedTypes: Set<FrameAnchorType>;
    allowedFrameIds: Set<Id>;
};

export type FrameConfiguration = {
    horizontal: AnchorConfiguration;
    vertical: AnchorConfiguration;
};

export enum CropType {
    frameCrop = 'frameCrop',
    assetCrop = 'assetCrop',
}
