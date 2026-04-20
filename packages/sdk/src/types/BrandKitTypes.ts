import { APIColorType, ColorUsage, DocumentColor } from './ColorStyleTypes';
import { Id, PropertyState } from './CommonTypes';
import { DocumentFontFamily } from './FontTypes';
import { DocumentGradient } from './GradientStyleTypes';
import { BulletListStyle, NumericListStyle } from './ParagraphStyleTypes';
import { Alignment, Case, Scripting } from './TextStyleTypes';

export type RGB = { r: number; g: number; b: number };
export type CMYK = { c: number; m: number; y: number; k: number };

type BaseBrandKitColor = { name: string; guid: string };

export type RGBColorValue = BaseBrandKitColor & { value: RGB; type: APIColorType.rgb };
export type CMYKColorValue = BaseBrandKitColor & { value: CMYK; type: APIColorType.cmyk };
export type HEXColorValue = BaseBrandKitColor & { value: string; type: APIColorType.hex };

export type SpotRGBColorValue = BaseBrandKitColor & { displayValue: RGB; value: string; type: APIColorType.spotRgb };
export type SpotCMYKColorValue = BaseBrandKitColor & { displayValue: CMYK; value: string; type: APIColorType.spotCmyk };
export type SpotHEXColorValue = BaseBrandKitColor & { displayValue: string; value: string; type: APIColorType.spotHex };

export type BrandKitColor =
    | RGBColorValue
    | CMYKColorValue
    | HEXColorValue
    | SpotRGBColorValue
    | SpotCMYKColorValue
    | SpotHEXColorValue;

export type BrandKitFont = {
    fontFamilyId: string;
    fontFamilyBrandKitGuid: string;
    fontConnectorId?: string | null;
};

export type BrandKitCharacterStyle = {
    name: string;
    brandKitFontFamilyGuid?: string;
    fontStyleId?: string;
    fontSize?: number;
    typographicCase?: Case;
    kerningOn?: boolean;
    subSuperScript?: Scripting;
    trackingLeft?: number;
    trackingRight?: number;

    textIndent?: string;

    baselineShiftValue?: string;
    lineHeight?: number;
    textOverprint?: boolean;

    brandKitColorGuid?: string;
    fillColorApplied?: boolean;

    textStrokeColorGuid?: string | null;
    textStrokeColorApplied?: boolean | null;
    textStrokeWidth?: number | null;

    underline?: boolean;
    lineThrough?: boolean;
};

export type BrandKitParagraphStyle = {
    name: string;
    brandKitFontFamilyGuid: string;
    fontStyleId: string;
    fontSize: number;
    typographicCase: Case;
    kerningOn: boolean;
    subSuperScript: Scripting;
    trackingLeft: number;
    trackingRight: number;

    textAlign: Alignment;

    textIndent: string;

    baselineShiftValue: string;
    lineHeight: number;
    textOverprint: boolean;

    brandKitColorGuid: string;
    fillColorApplied: boolean;

    textStrokeColorGuid: string;
    textStrokeColorApplied: boolean;
    textStrokeWidth: number;

    underline: boolean;
    lineThrough: boolean;
};

export type BrandKitMedia = {
    name: string;
    remoteConnectorId: Id;
    assetId: Id;
};

export type APIBrandKitMedia = {
    name: string;
    mediaConnectorId: Id;
    mediaId: Id;
};

export type APIBrandKitTheme = {
    id: Id;
    name: string;
    inheritsFrom: string | null;
    dateCreated: string | null;
    lastModifiedDate: string | null;
    colors: BrandKitColor[];
    characterStyles: BrandKitCharacterStyle[];
    paragraphStyles: BrandKitParagraphStyle[];
    media: BrandKitMedia[];
};

export type APIBrandKit = {
    id: Id;
    name: string;
    dateCreated: string;
    lastModifiedDate: string;
    fonts: BrandKitFont[];
    colors: BrandKitColor[];
    characterStyles: BrandKitCharacterStyle[];
    paragraphStyles: BrandKitParagraphStyle[];
    media: APIBrandKitMedia[];
    themes: APIBrandKitTheme[];
};

/**
 * User-facing brand kit type returned by BrandKitController.get() and accepted by BrandKitController.set().
 */
export type StudioBrandKit = {
    id: string;
    name: string;
    // This is here to be non-breaking but will be removed in next versions
    selectedThemeName: string | null;
    fontConnectorId: string;
    brandKit: APIBrandKit;
};

/**
 * Response shape from getBrandKit() / setBrandKit().
 */
export type BrandKit = {
    id: string | null;
    version: string | null;
    name: string | null;
    selectedThemeName: string | null;
    colors: PropertyState<DocumentColor>[];
    gradients: PropertyState<DocumentGradient>[];
    fontFamilies: PropertyState<DocumentFontFamily>[];
    characterStyles: PropertyState<CharacterStyleWithThemeOverrides>[];
    paragraphStyles: PropertyState<ParagraphStyleWithThemeOverrides>[];
    media: PropertyState<BrandKitMedia>[];
    isAutoSync: boolean | null;
};

export type CharacterStyleWithThemeOverrides = {
    id: string;
    name: string;
    fontKey: PropertyState<string | null>;
    fontSize: PropertyState<number | null>;
    typographicCase: PropertyState<Case | null>;
    kerningOn: PropertyState<boolean | null>;
    subSuperScript: PropertyState<Scripting | null>;
    trackingLeft: PropertyState<number | null>;
    trackingRight: PropertyState<number | null>;
    baselineShiftValue: PropertyState<string | null>;
    lineHeight: PropertyState<number | null>;
    textOverprint: PropertyState<boolean | null>;
    color: PropertyState<ColorUsage>;
    strokeColor: PropertyState<ColorUsage>;
    fillColorApplied: PropertyState<boolean | null>;
    strokeColorApplied: PropertyState<boolean | null>;
    underline: PropertyState<boolean | null>;
    lineThrough: PropertyState<boolean | null>;
    strokeWidth: PropertyState<number | null>;
};

export type ParagraphStyleWithThemeOverrides = {
    id: string;
    name: string;
    fontKey: PropertyState<string | null>;
    fontSize: PropertyState<number | null>;
    typographicCase: PropertyState<Case | null>;
    kerningOn: PropertyState<boolean | null>;
    subSuperScript: PropertyState<Scripting | null>;
    trackingLeft: PropertyState<number | null>;
    trackingRight: PropertyState<number | null>;
    indentStart: PropertyState<string | null>;
    indentEnd: PropertyState<string | null>;
    spaceBefore: PropertyState<string | null>;
    spaceAfter: PropertyState<string | null>;
    textIndent: PropertyState<string | null>;
    strokeWidth: PropertyState<number | null>;
    alignToBaseLine: PropertyState<boolean | null>;
    baselineShiftValue: PropertyState<string | null>;
    lineHeight: PropertyState<number | null>;
    textAlign: PropertyState<Alignment | null>;
    textAlignLast: PropertyState<Alignment | null>;
    textOverprint: PropertyState<boolean | null>;
    color: PropertyState<ColorUsage>;
    strokeColor: PropertyState<ColorUsage>;
    fillColorApplied: PropertyState<boolean | null>;
    strokeColorApplied: PropertyState<boolean | null>;
    underline: PropertyState<boolean | null>;
    lineThrough: PropertyState<boolean | null>;
    bulletListStyle: PropertyState<BulletListStyle>;
    numericListStyle: PropertyState<NumericListStyle>;
};
