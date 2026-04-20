import {
    BrandKitColor,
    BrandKitCharacterStyle,
    BrandKitParagraphStyle,
    APIBrandKitMedia as MainAPIBrandKitMedia,
    BrandKitMedia,
    APIBrandKitTheme,
} from '../../types/BrandKitTypes';
import { CharacterStyle } from '../../types/CharacterStyleTypes';
import { DocumentColor } from '../../types/ColorStyleTypes';
import { Id } from '../../types/CommonTypes';
import { DocumentFontFamily } from '../../types/FontTypes';
import { DocumentGradient } from '../../types/GradientStyleTypes';
import { ParagraphStyle } from '../../types/ParagraphStyleTypes';

/** API-style color union (alias of main BrandKitColor). */
export type APIBrandKitColor = BrandKitColor;

export type APIBrandKitFont = {
    fontFamilyId: string;
    fontFamilyBrandKitGuid: string;
    fontConnectorId: string;
};

/** API-style character style (alias of main BrandKitCharacterStyle). */
export type APIBrandKitCharacterStyle = BrandKitCharacterStyle;

/** API-style paragraph style (alias of main BrandKitParagraphStyle). */
export type APIBrandKitParagraphStyle = BrandKitParagraphStyle;

/** API-style media (re-export from main). */
export type APIBrandKitMedia = MainAPIBrandKitMedia;

/**
 * API brand kit shape: used as the input to set().
 * Environment/API format with guid-based references.
 */
export type APIBrandKit = {
    id: Id;
    name: string;
    dateCreated: string;
    lastModifiedDate: string;
    fonts: APIBrandKitFont[];
    colors: APIBrandKitColor[];
    characterStyles: APIBrandKitCharacterStyle[];
    paragraphStyles: APIBrandKitParagraphStyle[];
    media: APIBrandKitMedia[];
    themes: APIBrandKitTheme[];
};
