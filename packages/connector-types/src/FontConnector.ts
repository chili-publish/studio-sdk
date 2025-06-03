import { QueryPage } from './Connector.Shared';

export type FontFamilyPage = QueryPage<FontFamily>;

export interface FontFamily {
    id: string;
    name: string;
    fontStylesCount: number;
    extensions: string[];
}

export interface FontStyle {
    id: string;
    name: string;
    familyId: string;
    familyName: string;
}

export type FontConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    preview: boolean;
    filtering: boolean;
};
