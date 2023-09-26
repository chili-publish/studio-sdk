import { Id } from './CommonTypes';

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
    fontFamilyId: string;
    connectorId: Id;
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
