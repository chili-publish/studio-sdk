import { VerticalAlign } from './FrameTypes';
import { ColorUsage } from './ColorStyleTypes';

export enum FontWeights {
    BOLD = 'Bold',
    ITALIC = 'Italic',
    REGULAR = 'Regular',
}
export enum Alignment {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
    JUSTIFY = 'justify',
}

export enum TextPosition {
    TOP = 'top',
    CENTER = 'center',
    BOTTOM = 'bottom',
}
export enum Case {
    TO_LOWER_CASE = 'lowercase',
    TO_UPPER_CASE = 'uppercase',
    NORMAL = 'normal',
}
export enum Scripting {
    SUPERSCRIPT = 'superscript',
    SUBSCRIPT = 'subscript',
    NORMAL = 'normal',
}

export type DisplayColor = ColorUsage & {
    isApplied: boolean;
};
export interface TextProperties {
    fontKey?: string;
    fontStyle?: FontWeights;
    fontSize?: number;
    textAlign?: Alignment;
    verticalAlign?: VerticalAlign;
    underline?: boolean;
    lineThrough?: boolean;
    letterSpacing?: string;
    lineHeight?: number;
    SUB_SUPER_SCRIPT?: Scripting;
    typographicCase?: Case;
    color?: DisplayColor;
    [key: string]: number | string | Record<string, unknown> | null | boolean | undefined;
}

export interface TextStyle {
    paragraph?: string;
    character?: string;
    [key: string]: number | string | Record<string, unknown> | null | boolean | undefined;
}
export type TextStyleUpdateType = {
    [key in keyof typeof SelectedTextStyles]?: {
        value: number | string | boolean;
    };
};

export interface AppearanceProperties {
    blendMode?: string;
    opacity?: string;
    useFill?: boolean;
    useStroke?: boolean;
    useDropShadow?: boolean;
    fillColor?: string;
    strokeColor?: string;
    dropShadowColor?: string;
}

export interface SelectedTextStyle {
    paragraphStyleId?: string;
    characterStyleId?: string;
    fontKey?: string;
    fontSize: number;
    typographicCase: Case;
    kerningOn: boolean;
    subSuperScript: Scripting;
    trackingLeft: string;
    trackingRight: string;
    startIndent: string;
    endIndent: string;
    spaceBefore: string;
    spaceAfter: string;
    textIndent: string;
    alignToBaseLine: boolean;
    baselineShiftValue: string;
    lineHeight: number;
    verticalAlign: VerticalAlign;
    copyfittingScale: number;
    textAlign: HorizontalAlign;
    textAlignLast: HorizontalAlign;
    textOverprint: boolean;
    color: DisplayColor;
    underline: boolean;
    lineThrough: boolean;
}

export enum HorizontalAlign {
    left = 'left',
    center = 'center',
    right = 'right',
    justify = 'justify',
}

export enum SelectedTextStyleSections {
    STYLE = 'textStyle',
    PROPERTIES = 'textProperties',
    APPEARANCE = 'appearance',
}

export enum SelectedTextStyles {
    PARAGRAPH = 'paragraphStyleId',
    CHARACTER = 'characterStyleId',
    FONT_FAMILY = 'fontKey',
    FONT_STYLE = 'fontStyle',
    FONT_SIZE = 'fontSize',
    LETTER_SPACING = 'letterSpacing',
    LINE_HEIGHT = 'lineHeight',
    TEXT_ALIGN = 'textAlign',
    VERTICAL_ALIGN = 'verticalAlign',
    TYPOGRAPHIC_CASE = 'typographicCase',
    SUB_SUPER_SCRIPT = 'subSuperScript',
    UNDERLINE = 'underline',
    LINE_THROUGH = 'lineThrough',
    FILL_COLOR = 'fillColor',
    COLOR = 'color',
    FILL_COLOR_APPLIED = 'fillColorApplied',
    STROKE_COLOR = 'strokeColor',
    DROP_SHADOW_COLOR = 'dropShadowColor',
    BLEND_MODE = 'blendMode',
    OPACITY = 'opacity',
}

export interface UpdateStyleType {
    path: { value: number | string | Record<string, unknown> | null | boolean | undefined };
}
