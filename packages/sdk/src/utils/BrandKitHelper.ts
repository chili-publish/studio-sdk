import {
    APIBrandKit,
    BrandKitCharacterStyle,
    BrandKitColor,
    BrandKitInternal,
    BrandKitParagraphStyle,
    HEXColorValue,
    SpotCMYKColorValue,
    SpotHEXColorValue,
    SpotRGBColorValue,
} from '../types/BrandKitTypes';
import { CharacterStyleUpdate } from '../types/CharacterStyleTypes';
import {
    APIColorType,
    Color,
    ColorType,
    ColorUpdate,
    ColorUsageType,
    DocumentColor,
    SpotColorCMYK,
    SpotColorHEX,
    SpotColorRGB,
} from '../types/ColorStyleTypes';
import { DocumentFontFamily } from '../types/FontTypes';
import { ParagraphStyleUpdate } from '../types/ParagraphStyleTypes';

const isSpotHexColor = (color: Color): color is SpotColorHEX => color.type === ColorType.spotHEX;
const isSpotRgbColor = (color: Color): color is SpotColorRGB => color.type === ColorType.spotRGB;
const isSpotCmykColor = (color: Color): color is SpotColorCMYK => color.type === ColorType.spotCMYK;

const isSpotColor = (color: Color): color is SpotColorRGB | SpotColorCMYK | SpotColorHEX =>
    isSpotHexColor(color) || isSpotRgbColor(color) || isSpotCmykColor(color);

const isBranKitSpotHexColor = (color: BrandKitColor): color is SpotHEXColorValue => color.type === APIColorType.spotHex;
const isBranKitHexColor = (color: BrandKitColor): color is HEXColorValue => color.type === APIColorType.hex;

const isBrandKitSpotColor = (
    color: BrandKitColor,
): color is SpotRGBColorValue | SpotCMYKColorValue | SpotHEXColorValue =>
    color.type === APIColorType.spotRgb || color.type === APIColorType.spotCmyk || color.type === APIColorType.spotHex;

export const mapToStudioBrandKit = (internalBrandKit: BrandKitInternal): APIBrandKit => {
    return {
        colors: internalBrandKit.colors.map((color) => {
            const colorInfo = color.color;
            return {
                guid: color.id,
                name: color.name,
                type: mapToAPIColorType(colorInfo.type),
                value: isSpotColor(colorInfo) ? colorInfo.spotName : colorInfo,
                ...(isSpotHexColor(colorInfo) && { displayValue: colorInfo.value }),
                ...(isSpotColor(colorInfo) && !isSpotHexColor(colorInfo) && { displayValue: colorInfo }),
            } as BrandKitColor;
        }),
        paragraphStyles: internalBrandKit.paragraphStyles.map((style) => {
            return {
                ...style,
                fontStyleId: style.fontStyle,
                brandKitColorGuid: style.color.id as string, ///
                brandKitFontFamilyGuid: style.fontKey, ///
            };
        }),
        characterStyles: [],
        fonts: [],
        media: [],
    };
};

export const mapBrandKitColorToLocal = (color: BrandKitColor): ColorUpdate => {
    const internalColorType: ColorType = mapToLocalColorType(color.type);

    if (isBrandKitSpotColor(color)) {
        return {
            ...(isBranKitSpotHexColor(color) && { value: color.displayValue }),
            ...(!isBranKitSpotHexColor(color) && { ...color.displayValue }),
            spotName: color.value,
            type: internalColorType,
        } as ColorUpdate;
    }
    return {
        ...(isBranKitHexColor(color) && { value: color.value }),
        ...(!isBranKitHexColor(color) && { ...color.value }),
        type: internalColorType,
    } as ColorUpdate;
};

export const mapBrandKitStyleToLocal = <
    T extends BrandKitParagraphStyle | BrandKitCharacterStyle,
    R extends ParagraphStyleUpdate | CharacterStyleUpdate,
>(
    style: T,
    localColor?: DocumentColor,
    fontKey?: string,
): R => {
    const { brandKitColorGuid, brandKitFontFamilyGuid, fontStyleId, ...styleUpdateObject } = style;
    const styleUpdate = Object.keys(styleUpdateObject).reduce((acc, key) => {
        return { ...acc, [key]: { value: style[key as keyof T] } };
    }, {});

    return {
        ...styleUpdate,
        ...(localColor && {
            color: {
                value: {
                    id: localColor.id,
                    color: localColor.color,
                    type: ColorUsageType.brandKit,
                    isApplied: styleUpdateObject.fillColorApplied,
                },
            },
        }),
        fontKey: {
            value: fontKey ?? null,
        },
    } as unknown as R;
};

const mapToAPIColorType = (type: ColorType) => {
    switch (type) {
        case ColorType.rgb:
            return APIColorType.rgb;
        case ColorType.cmyk:
            return APIColorType.cmyk;
        case ColorType.hex:
            return APIColorType.hex;
        case ColorType.spotRGB:
            return APIColorType.spotRgb;
        case ColorType.spotCMYK:
            return APIColorType.spotCmyk;
        case ColorType.spotHEX:
            return APIColorType.spotHex;
    }
};

const mapToLocalColorType = (type: APIColorType): ColorType => {
    switch (type) {
        case APIColorType.rgb:
            return ColorType.rgb;
        case APIColorType.cmyk:
            return ColorType.cmyk;
        case APIColorType.hex:
            return ColorType.hex;
        case APIColorType.spotRgb:
            return ColorType.spotRGB;
        case APIColorType.spotCmyk:
            return ColorType.spotCMYK;
        case APIColorType.spotHex:
            return ColorType.spotHEX;
    }
};

export const getColorById = (colors: DocumentColor[] | null, id: string | undefined) =>
    (colors || []).find((color) => color.id === id);

export const getFontKey = (
    fonts: DocumentFontFamily[] | null,
    familyId: string | undefined,
    styleId: string | undefined,
) =>
    (fonts || [])
        .find((font) => font.id === familyId)
        ?.fontStyles.find((fontStyle) => fontStyle.fontStyleId === styleId)?.id;
