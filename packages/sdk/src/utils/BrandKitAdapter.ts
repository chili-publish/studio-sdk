import {
    APIBrandKit,
    APIBrandKitMedia,
    BrandKitColor,
    BrandKitFont,
    BrandKitCharacterStyle,
    BrandKitParagraphStyle,
    BrandKitMedia,
    EngineBrandKit,
    StudioBrandKit,
    BrandKitInternal,
} from '../types/BrandKitTypes';
import {
    APIColorType,
    ColorType,
    DocumentColor,
    type CMYKColor,
    type HexColor,
    type RGBColor,
    type SpotColorCMYK,
    type SpotColorHEX,
    type SpotColorRGB,
} from '../types/ColorStyleTypes';
import { CharacterStyle } from '../types/CharacterStyleTypes';
import { ParagraphStyle } from '../types/ParagraphStyleTypes';
import { DocumentFontFamily } from '../types/FontTypes';

/**
 * Converts the engine getBrandKit() / setBrandKit() response to the user-facing StudioBrandKit shape.
 */
export function engineBrandKitToStudioBrandKit(engine: EngineBrandKit): StudioBrandKit {
    const fontConnectorId =
        engine.fonts.length > 0 ? String(engine.fonts[0].connectorId) : '';
    const brandKit: APIBrandKit = {
        id: engine.id ?? '',
        name: engine.name ?? '',
        dateCreated: '', // This is not supported by the API yet
        lastModifiedDate: engine.version ?? '',
        fonts: engine.fonts.map(documentFontToBrandKitFont),
        colors: engine.colors.map(documentColorToBrandKitColor),
        characterStyles: engine.characterStyles.map(characterStyleToBrandKitCharacterStyle),
        paragraphStyles: engine.paragraphStyles.map(paragraphStyleToBrandKitParagraphStyle),
        media: engine.media.map(brandKitMediaToAPIBrandKitMedia),
    };
    return {
        id: engine.id ?? '',
        name: engine.name ?? '',
        fontConnectorId,
        brandKit,
    };
}

/**
 * Converts the engine setBrandKit() response to the BrandKitInternal shape returned by set().
 */
export function engineBrandKitToBrandKitInternal(engine: EngineBrandKit): BrandKitInternal {
    return {
        id: engine.id ?? '',
        version: engine.version ?? '',
        name: engine.name ?? '',
        colors: engine.colors,
        gradients: engine.gradients,
        fonts: engine.fonts,
        characterStyles: engine.characterStyles,
        paragraphStyles: engine.paragraphStyles,
        media: engine.media,
    };
}

function documentColorToBrandKitColor(doc: DocumentColor): BrandKitColor {
    const { id, name, color } = doc;
    const base = { name, guid: id };
    switch (color.type) {
        case ColorType.rgb: {
            const rgb = color as RGBColor;
            return {
                ...base,
                value: { r: rgb.r, g: rgb.g, b: rgb.b },
                type: APIColorType.rgb,
            };
        }
        case ColorType.cmyk: {
            const cmyk = color as CMYKColor;
            return {
                ...base,
                value: { c: cmyk.c, m: cmyk.m, y: cmyk.y, k: cmyk.k },
                type: APIColorType.cmyk,
            };
        }
        case ColorType.hex: {
            const hex = color as HexColor;
            return {
                ...base,
                value: hex.value,
                type: APIColorType.hex,
            };
        }
        case ColorType.spotRGB: {
            const spot = color as SpotColorRGB;
            return {
                ...base,
                displayValue: { r: spot.r, g: spot.g, b: spot.b },
                value: spot.spotName,
                type: APIColorType.spotRgb,
            };
        }
        case ColorType.spotCMYK: {
            const spot = color as SpotColorCMYK;
            return {
                ...base,
                displayValue: { c: spot.c, m: spot.m, y: spot.y, k: spot.k },
                value: spot.spotName,
                type: APIColorType.spotCmyk,
            };
        }
        case ColorType.spotHEX: {
            const spot = color as SpotColorHEX;
            return {
                ...base,
                displayValue: spot.value,
                value: spot.spotName,
                type: APIColorType.spotHex,
            };
        }
        default:
            return {
                ...base,
                value: { r: 0, g: 0, b: 0 },
                type: APIColorType.rgb,
            };
    }
}

function documentFontToBrandKitFont(doc: DocumentFontFamily): BrandKitFont {
    return {
        fontFamilyId: doc.fontFamilyId,
        fontFamilyBrandKitGuid: doc.id,
    };
}

function characterStyleToBrandKitCharacterStyle(style: CharacterStyle): BrandKitCharacterStyle {
    const brandKitColorGuid =
        style.color?.type === 'brandKit' && style.color.id != null ? String(style.color.id) : undefined;
    const textStrokeColorGuid =
        style.strokeColor?.type === 'brandKit' && style.strokeColor.id != null
            ? String(style.strokeColor.id)
            : undefined;
    return {
        name: style.name,
        fontSize: style.fontSize,
        typographicCase: style.typographicCase,
        kerningOn: style.kerningOn,
        subSuperScript: style.subSuperScript,
        trackingLeft: style.trackingLeft,
        trackingRight: style.trackingRight,
        textIndent: style.textIndent,
        baselineShiftValue: style.baselineShiftValue,
        lineHeight: style.lineHeight,
        textOverprint: style.textOverprint,
        brandKitColorGuid,
        fillColorApplied: style.fillColorApplied ?? undefined,
        textStrokeColorGuid: textStrokeColorGuid ?? null,
        textStrokeColorApplied: style.strokeColorApplied ?? null,
        textStrokeWidth: style.strokeWidth ?? null,
        underline: style.underline,
        lineThrough: style.lineThrough,
    };
}

function paragraphStyleToBrandKitParagraphStyle(style: ParagraphStyle): BrandKitParagraphStyle {
    const brandKitColorGuid =
        style.color?.type === 'brandKit' && style.color.id != null ? String(style.color.id) : '';
    const textStrokeColorGuid =
        style.strokeColor?.type === 'brandKit' && style.strokeColor.id != null
            ? String(style.strokeColor.id)
            : '';
    return {
        name: style.name,
        brandKitFontFamilyGuid: style.fontKey ?? '',
        fontStyleId: style.fontStyle ?? '',
        fontSize: style.fontSize,
        typographicCase: style.typographicCase,
        kerningOn: style.kerningOn,
        subSuperScript: style.subSuperScript,
        trackingLeft: style.trackingLeft,
        trackingRight: style.trackingRight,
        textAlign: style.textAlign,
        textIndent: style.textIndent,
        baselineShiftValue: style.baselineShiftValue,
        lineHeight: style.lineHeight,
        textOverprint: style.textOverprint,
        brandKitColorGuid,
        fillColorApplied: style.fillColorApplied,
        textStrokeColorGuid,
        textStrokeColorApplied: style.strokeColorApplied,
        textStrokeWidth: style.strokeWidth,
        underline: style.underline,
        lineThrough: style.lineThrough,
    };
}

function brandKitMediaToAPIBrandKitMedia(media: BrandKitMedia): APIBrandKitMedia {
    return {
        name: media.name,
        mediaConnectorId: media.remoteConnectorId,
        mediaId: media.assetId,
    };
}
