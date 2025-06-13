import { CharacterStyle } from '../types/CharacterStyleTypes';
import { DocumentColor } from '../types/ColorStyleTypes';
import { DocumentFontFamily } from '../types/FontTypes';
import { ParagraphStyle } from '../types/ParagraphStyleTypes';

type BrandKitInternal = {
    colors: DocumentColor[];
    fonts: DocumentFontFamily[];
    characterStyles: CharacterStyle[];
    paragraphStyles: ParagraphStyle[];
};
export const mapToStudioBrandKit = () => {};
