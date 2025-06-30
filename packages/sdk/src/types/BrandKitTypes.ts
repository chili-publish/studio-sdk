import { APIColorType, DocumentColor } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { DocumentCharacterStyle, DocumentParagraphStyle } from './DocumentTypes';
import { DocumentFontFamily } from './FontTypes';
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

    underline: boolean;
    lineThrough: boolean;
};

export type BrandKitMedia = {
    name: string;
    remoteConnectorId: Id;
    assetId: Id;
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
    media: BrandKitMedia[];
};

export type StudioBrandKit = {
    id: string;
    name: string;
    fontConnectorId: string;
    brandKit: APIBrandKit;
};

export type BrandKitInternal = {
    id: string;
    version: string;
    colors: DocumentColor[];
    fonts: DocumentFontFamily[];
    characterStyles: DocumentCharacterStyle[];
    paragraphStyles: DocumentParagraphStyle[];
    media: BrandKitMedia[];
};
