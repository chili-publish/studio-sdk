import {
    APIBrandKitMedia,
    BrandKitColor,
    BrandKitCharacterStyle,
    BrandKitFont,
    BrandKitParagraphStyle,
    EngineBrandKit,
    StudioBrandKit,
    BrandKitInternal,
    APIBrandKit,
} from '../types/BrandKitTypes';
/**
 * Converts the engine getBrandKit() / setBrandKit() response to the user-facing StudioBrandKit shape.
 */
export function engineBrandKitToStudioBrandKit(engine: EngineBrandKit): StudioBrandKit {
    const fontConnectorId =
        engine.fontFamilies.length > 0 ? String(engine.fontFamilies[0].connectorId) : '';
    const brandKit: APIBrandKit = {
        id: engine.id ?? '',
        name: engine.name ?? '',
        dateCreated: '', // This is not supported by the API yet
        lastModifiedDate: engine.version ?? '',
        // Ideally those types should be mapped, but this is a breaking change
        fonts: engine.fontFamilies as unknown as BrandKitFont[],
        colors: engine.colors as unknown as BrandKitColor[],
        characterStyles: engine.characterStyles as unknown as BrandKitCharacterStyle[],
        paragraphStyles: engine.paragraphStyles as unknown as BrandKitParagraphStyle[],
        media: engine.media as unknown as APIBrandKitMedia[],
        themes: engine.themes,
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
        fonts: engine.fontFamilies,
        characterStyles: engine.characterStyles,
        paragraphStyles: engine.paragraphStyles,
        media: engine.media,
        themes: engine.themes,
    };
}
