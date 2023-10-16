import { QueryOptions, Dictionary, ArrayBufferPointer, ConnectorCapabilities, ConnectorConfigValue } from "./Connector.Shared";

export interface GrafxFontConnector {
    detail(familyId, context: Dictionary): FontStyle;
    query(options: QueryOptions, context: Dictionary): Promise<FontFamilyPage>;
    download(styleId: string, context: Dictionary): Promise<ArrayBufferPointer>
    preview(familyId: string, previewFormat: FontPreviewFormat, context: Dictionary): Promise<ArrayBufferPointer>
    getConfigurationOptions(): ConnectorConfigValue[] | null;
    getCapabilities(): ConnectorCapabilities;
}

export type FontPreviewFormat = 'square' | 'line';

export interface FontFamilyPage {
    pageSize: number;
    data: FontFamily[];
    links: {
        nextPage: string;
    };
}

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