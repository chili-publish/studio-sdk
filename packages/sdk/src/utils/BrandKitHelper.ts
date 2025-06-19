import {
    BrandKitCharacterStyle,
    BrandKitColor,
    BrandKitParagraphStyle,
    HEXColorValue,
    SpotCMYKColorValue,
    SpotHEXColorValue,
    SpotRGBColorValue,
} from '../types/BrandKitTypes';
import { CharacterStyleUpdate } from '../types/CharacterStyleTypes';
import { APIColorType, ColorType, ColorUpdate, ColorUsageType, DocumentColor } from '../types/ColorStyleTypes';
import { DocumentFontFamily } from '../types/FontTypes';
import { ParagraphStyleUpdate } from '../types/ParagraphStyleTypes';

const isBrandKitHexColor = (color: BrandKitColor): color is HEXColorValue => color.type === APIColorType.hex;

const isBrandKitSpotHexColor = (color: BrandKitColor): color is SpotHEXColorValue =>
    color.type === APIColorType.spotHex;
const isBrandKitSpotRgbColor = (color: BrandKitColor): color is SpotRGBColorValue =>
    color.type === APIColorType.spotRgb;
const isBrandKitSpotCmykColor = (color: BrandKitColor): color is SpotRGBColorValue =>
    color.type === APIColorType.spotCmyk;

const isBrandKitSpotColor = (
    color: BrandKitColor,
): color is SpotRGBColorValue | SpotCMYKColorValue | SpotHEXColorValue =>
    isBrandKitSpotRgbColor(color) || isBrandKitSpotCmykColor(color) || isBrandKitSpotHexColor(color);

export const mapBrandKitColorToLocal = (color: BrandKitColor): ColorUpdate => {
    const internalColorType: ColorType = mapToLocalColorType(color.type);

    if (isBrandKitSpotColor(color)) {
        return {
            ...(isBrandKitSpotHexColor(color) && { value: color.displayValue }),
            ...(!isBrandKitSpotHexColor(color) && { ...color.displayValue }),
            spotName: color.value,
            type: internalColorType,
        } as ColorUpdate;
    }
    return {
        ...(isBrandKitHexColor(color) && { value: color.value }),
        ...(!isBrandKitHexColor(color) && { ...color.value }),
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const getColorById = (colors: DocumentColor[] | null, id: string | undefined) => {
    if (colors === null || id === undefined) return;
    return (colors || []).find((color) => color.id === id);
};

export const getFontKey = (
    fonts: DocumentFontFamily[] | null,
    familyId: string | undefined,
    styleId: string | undefined,
) => {
    if (fonts === null || familyId === undefined || styleId === undefined) return;
    return (fonts || [])
        .find((font) => font.id === familyId)
        ?.fontStyles.find((fontStyle) => fontStyle.fontStyleId === styleId)?.id;
};
