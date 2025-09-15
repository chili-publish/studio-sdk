import { Id } from './CommonTypes';
import { Color } from './ColorStyleTypes';

export type DocumentFontStyle = {
    id: Id;
    fontStyleId: string;
    fontFamilyId: string;
    connectorId: Id;
    name: string;
    isDefault: boolean;
};

export type DocumentFontFamily = {
    id: Id;
    name: string;
    connectorId: Id;
    fontFamilyId: string;
    fontStyles: DocumentFontStyle[];
};

export type AddDocumentFontStyle = {
    name: string;
    fontStyleId: Id;
    fontFamilyId: Id;
};

export type AddDocumentFontFamily = {
    name: string;
    fontFamilyId: Id;
};

export type CharacterPreviewStyle = {
    fontStyleId: string;
    color: Color;
};

export type CharacterPreview = Record<string, string>;
