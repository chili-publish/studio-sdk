import { CharacterStyle } from './CharacterStyleTypes';
import { APIColorType, DocumentColor } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { DocumentFontFamily } from './FontTypes';
import { DocumentGradient } from './GradientStyleTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { Alignment, Case, Scripting } from './TextStyleTypes';

export type RGB = { r: number; g: number; b: number };
export type CMYK = { c: number; m: number; y: number; k: number };

type BaseBrandKitColor = { name: string; guid: string };

export type RGBColorValue = BaseBrandKitColor & { value: RGB | null; type: APIColorType.rgb };
export type CMYKColorValue = BaseBrandKitColor & { value: CMYK | null; type: APIColorType.cmyk };
export type HEXColorValue = BaseBrandKitColor & { value: string | null; type: APIColorType.hex };

export type SpotRGBColorValue = BaseBrandKitColor & { displayValue: RGB | null; value: string | null; type: APIColorType.spotRgb };
export type SpotCMYKColorValue = BaseBrandKitColor & { displayValue: CMYK | null; value: string | null; type: APIColorType.spotCmyk };
export type SpotHEXColorValue = BaseBrandKitColor & { displayValue: string | null; value: string | null; type: APIColorType.spotHex };

export type APIBrandKitColor =
    | RGBColorValue
    | CMYKColorValue
    | HEXColorValue
    | SpotRGBColorValue
    | SpotCMYKColorValue
    | SpotHEXColorValue;

export type APIBrandKitFont = {
    fontFamilyId: string;
    fontFamilyBrandKitGuid: string | null;
    fontConnectorId: string | null;
};

export type APIBrandKitCharacterStyle = {
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

export type APIBrandKitParagraphStyle = {
    name: string;
    brandKitFontFamilyGuid: string;
    fontStyleId: string;
    fontSize: number;
    typographicCase: Case;
    kerningOn: boolean;
    subSuperScript: Scripting;
    trackingLeft: number;
    trackingRight: number;

    textAlign: Alignment | null;

    textIndent: string | null;

    baselineShiftValue: string | null;
    lineHeight: number;
    textOverprint: boolean | null;

    brandKitColorGuid: string;
    fillColorApplied: boolean | null;

    textStrokeColorGuid: string | null;
    textStrokeColorApplied: boolean | null;
    textStrokeWidth: number | null;

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
    mediaConnectorId: Id | null;
    mediaId: Id | null;
};

export type APIBrandKitTheme = {
    id: Id;
    name: string;
    inheritsFrom: string | null;
    dateCreated: string | null;
    lastModifiedDate: string | null;
    colors: APIBrandKitColor[];
    characterStyles: APIBrandKitCharacterStyle[];
    paragraphStyles: APIBrandKitParagraphStyle[];
    fonts: APIBrandKitFont[];
    media: APIBrandKitMedia[];
};

export type APIBrandKit = {
    id: Id;
    name: string | null;
    dateCreated: string;
    lastModifiedDate: string;
    fonts: APIBrandKitFont[];
    colors: APIBrandKitColor[];
    characterStyles: APIBrandKitCharacterStyle[];
    paragraphStyles: APIBrandKitParagraphStyle[];
    media: APIBrandKitMedia[];
    themes: APIBrandKitTheme[];
};

export type StudioBrandKitTheme = {
    id: string;
    name: string;
    inheritsFrom: string | null;
    dateCreated: string | null;
    lastModifiedDate: string | null;
    colors: DocumentColor[];
    characterStyles: CharacterStyle[];
    paragraphStyles: ParagraphStyle[];
    media: BrandKitMedia[];
};

export type StudioBrandKit = {
    id: string | null;
    version: string | null;
    name: string | null;
    colors: DocumentColor[];
    gradients: DocumentGradient[];
    fonts: DocumentFontFamily[];
    characterStyles: CharacterStyle[];
    paragraphStyles: ParagraphStyle[];
    media: BrandKitMedia[];
    themes: StudioBrandKitTheme[];
};
