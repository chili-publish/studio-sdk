import { ArrayBufferPointer, ConnectorConfigValue, Dictionary, QueryOptions } from './Connector.Shared';

export interface GrafxFontConnector {
    detail(connectorId: string, fontFamilyId: string, context: Dictionary): Promise<FontStyle[]>;
    query(connectorId: string, queryOptions: QueryOptions, context: Dictionary): Promise<FontFamilyPage>;
    download(styleId: string, context: Dictionary): Promise<ArrayBufferPointer>;
    preview(familyId: string, previewFormat: FontPreviewFormat, context: Dictionary): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigValue[] | null;
    getCapabilities(): FontConnectorCapabilities;
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

export type FontConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    preview: boolean;
    filtering: boolean;
};
