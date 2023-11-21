import { HorizontalAlign, VerticalAlign } from '../utils/enums';
import { DisplayColor } from './ColorStyleTypes';

export enum FontWeights {
    BOLD = 'Bold',
    ITALIC = 'Italic',
    REGULAR = 'Regular',
}

export enum TextType {
    TEXT = 'text',
    FORMATTED = 'formatted',
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
    dropShadowColor?: string;
    fillColor?: string;
    opacity?: string;
    strokeColor?: string;
    useDropShadow?: boolean;
    useFill?: boolean;
    useStroke?: boolean;
}

export type BaseTextStyle = {
    alignToBaseLine?: boolean;
    baselineShiftValue?: string;
    characterStyleId?: string;
    color?: DisplayColor;
    copyfittingScale?: number;
    fontKey?: string;
    fontSize?: number;
    kerningOn?: boolean;
    lineHeight?: number;
    lineThrough?: boolean;
    paragraphIndentEnd?: string;
    paragraphIndentStart?: string;
    paragraphSpaceAfter?: string;
    paragraphSpaceBefore?: string;
    paragraphStyleId?: string;
    subSuperScript?: Scripting;
    textAlign?: HorizontalAlign;
    textAlignLast?: HorizontalAlign;
    textIndent?: string;
    textOverprint?: boolean;
    trackingLeft?: string;
    trackingRight?: string;
    typographicCase?: Case;
    underline?: boolean;
    verticalAlign?: VerticalAlign;
}

export type SelectedTextStyle = BaseTextStyle & {
    hasLocalFormatting: boolean;
}

export enum SelectedTextStyleSections {
    STYLE = 'textStyle',
    PROPERTIES = 'textProperties',
    APPEARANCE = 'appearance',
}

export enum SelectedTextStyles {
    BLEND_MODE = 'blendMode',
    CHARACTER = 'characterStyleId',
    COLOR = 'color',
    DROP_SHADOW_COLOR = 'dropShadowColor',
    FILL_COLOR = 'fillColor',
    FILL_COLOR_APPLIED = 'fillColorApplied',
    FONT_FAMILY = 'fontKey',
    FONT_SIZE = 'fontSize',
    FONT_STYLE = 'fontStyle',
    LETTER_SPACING = 'letterSpacing',
    LINE_HEIGHT = 'lineHeight',
    LINE_THROUGH = 'lineThrough',
    OPACITY = 'opacity',
    PARAGRAPH = 'paragraphStyleId',
    STROKE_COLOR = 'strokeColor',
    SUB_SUPER_SCRIPT = 'subSuperScript',
    TEXT_ALIGN = 'textAlign',
    TYPOGRAPHIC_CASE = 'typographicCase',
    UNDERLINE = 'underline',
    VERTICAL_ALIGN = 'verticalAlign',
}

export interface UpdateStyleType {
    path: { value: number | string | Record<string, unknown> | null | boolean | undefined };
}
