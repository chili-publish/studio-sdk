import { ColorType } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { Case, Scripting } from './TextStyleTypes';

export type RGB = { r: number; g: number; b: number };
export type CMYK = { c: number; m: number; y: number; k: number };

type BaseBrandKitColor = { name: string; guid: string };

type RGBColorValue = BaseBrandKitColor & { value: RGB; type: ColorType.rgb };
type CMYKColorValue = BaseBrandKitColor & { value: CMYK; type: ColorType.cmyk };
type HEXColorValue = BaseBrandKitColor & { value: string; type: ColorType.hex };

type SpotRGBColorValue = BaseBrandKitColor & { displayValue: RGB; value: string; type: ColorType.spotRGB };
type SpotCMYKColorValue = BaseBrandKitColor & { displayValue: CMYK; value: string; type: ColorType.spotCMYK };
type SpotHEXColorValue = BaseBrandKitColor & { displayValue: string; value: string; type: ColorType.spotHEX };

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
    kerningOn?: boolean;
    subSuperScript: Scripting;
    trackingLeft?: number;
    trackingRight: number;

    textIndent?: string;

    baselineShiftValue?: string;
    lineHeight: number;
    textOverprint?: boolean;

    brandKitColorGuid: string;
    fillColorApplied?: boolean;

    underline: boolean;
    lineThrough: boolean;
};

export type BrandKitMedia = {
    name: string;
    mediaId: string;
    mediaConnectorId: string;
};

export type BrandKit = {
    id: Id;
    name: string;
    dateCreated: string;
    fonts: BrandKitFont[];
    colors: BrandKitColor[];
    characterStyles: BrandKitCharacterStyle[];
    paragraphStyles: BrandKitParagraphStyle[];
    media: BrandKitMedia[];
};

export type StudioBrandKit = {
    id?: string;
    name?: string;
    location: 'remote' | 'local';
    brandKit: BrandKit;
};
