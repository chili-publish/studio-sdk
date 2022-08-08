export enum FontWeights {
    BOLD = 'bold',
    ITALIC = 'italic',
    REGULAR = 'regular',
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

export interface TextProperties {
    fontFamily?: string;
    fontWeight?: FontWeights;
    fontSize?: string;
    textAlign?: Alignment;
    position?: TextPosition;
    underline?: boolean;
    lineThrough?: boolean;
    letterSpacing?: string;
    lineHeight?: string;
    SUB_SUPER_SCRIPT?: Scripting;
    typographicCase?: Case;
    [key: string]: number | string | Record<string, unknown> | null | boolean | undefined;
}

export interface TextStyle {
    paragraph?: string;
    character?: string;
    [key: string]: number | string | Record<string, unknown> | null | boolean | undefined;
}
export type TextStyleUpdateType = {
    [key in keyof typeof TextSelectionStyles]?
    : {
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
export enum TextSelectionSections {
    STYLE = 'textStyle',
    PROPERTIES = 'textProperties',
    APPEARANCE = 'appearance',
}

export enum TextSelectionStyles {
    PARAGRAPH = 'paragraph',
    CHARACTER = 'character',
    FONT_FAMILY = 'fontFamily',
    FONT_WEIGHT = 'fontWeight',
    FONT_SIZE = 'fontSize',
    LETTER_SPACING = 'letterSpacing',
    LINE_HEIGHT = 'lineHeight',
    TEXT_ALIGN = 'textAlign',
    POSITON = 'position',
    TYPOGRAPHIC_CASE = 'typographicCase',
    SUB_SUPER_SCRIPT = 'subSuperScript',
    UNDERLINE = 'underline',
    LINETHROUGH = 'lineThrough',
    FILL_COLOR = 'fillColor',
    STROKE_COLOR = 'strokeColor',
    DROP_SHADOW_COLOR = 'dropShadowColor',
    BLEND_MODE = 'blendMode',
    OPACITY = 'opacity',
}
export enum BlendModes {
    NORMAL = 'normal',
    DARKEN = 'darken',
    MULTIPLY = 'multiply',
    COLOR_BURN = 'color burn',
    LIGHT = 'light',
    SCREEN = 'screen',
    COLOR_DODGE = 'color dodge',
    OVERLAY = 'overlay',
    SOFT_LIGHT = 'soft light',
    HARD_LIGHT = 'hard light',
    DIFFERENCE = 'difference',
    EXCLUSION = 'exclusion',
    HUE = 'hue',
    SATURATION = 'saturation',
    COLOR = 'color',
    LUMINOSITY = 'luminosity',
}

export interface UpdateStyleType {
    path: { value: number | string | Record<string, unknown> | null | boolean | undefined }
}

