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

export type RGBColorValue = BaseBrandKitColor & { value: RGB; type: APIColorType.rgb };
export type CMYKColorValue = BaseBrandKitColor & { value: CMYK; type: APIColorType.cmyk };
export type HEXColorValue = BaseBrandKitColor & { value: string; type: APIColorType.hex };

export type SpotRGBColorValue = BaseBrandKitColor & { displayValue: RGB; value: string; type: APIColorType.spotRgb };
export type SpotCMYKColorValue = BaseBrandKitColor & { displayValue: CMYK; value: string; type: APIColorType.spotCmyk };
export type SpotHEXColorValue = BaseBrandKitColor & { displayValue: string; value: string; type: APIColorType.spotHex };

export type APIBrandKitColor =
    | RGBColorValue
    | CMYKColorValue
    | HEXColorValue
    | SpotRGBColorValue
    | SpotCMYKColorValue
    | SpotHEXColorValue;

export type APIBrandKitFont = {
    fontFamilyId: string;
    fontFamilyBrandKitGuid: string;
    fontConnectorId: string;
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
};
