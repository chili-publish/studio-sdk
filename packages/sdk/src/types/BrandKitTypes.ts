import { CharacterStyle } from './CharacterStyleTypes';
import { APIColorType, DocumentColor } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { DocumentCharacterStyle, DocumentParagraphStyle } from './DocumentTypes';
import { DocumentFontFamily } from './FontTypes';
import { DocumentGradient } from './GradientStyleTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
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
 * Internal brand kit shape returned by BrandKitController.set() with document-style resources.
 */
export type BrandKitInternal = {
    id: string;
    version: string;
    name: string;
    selectedThemeName: string | null;
    colors: DocumentColor[];
    gradients: DocumentGradient[];
    fonts: DocumentFontFamily[];
    characterStyles: DocumentCharacterStyle[];
    paragraphStyles: DocumentParagraphStyle[];
    media: BrandKitMedia[];
};

/**
 * Engine response shape from getBrandKit() / setBrandKit(). Used internally to adapt to StudioBrandKit / BrandKitInternal.
 */
export type EngineBrandKit = {
    id: string | null;
    version: string | null;
    name: string | null;
    selectedThemeName: string | null;
    colors: DocumentColor[];
    gradients: DocumentGradient[];
    fontFamilies: DocumentFontFamily[];
    characterStyles: CharacterStyle[];
    paragraphStyles: ParagraphStyle[];
    media: BrandKitMedia[];
    isAutoSync: boolean | null;
};
