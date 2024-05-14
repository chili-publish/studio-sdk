import { ArrayBufferPointer, ConnectorConfigValue, Dictionary, Id, QueryOptions } from './Connector.Shared';

export interface GrafxFontConnector {
    detail(connectorId: Id, fontFamilyId: Id, context: Dictionary): Promise<FontStyle[]>;
    query(connectorId: Id, queryOptions: QueryOptions, context: Dictionary): Promise<FontFamilyPage>;
    download(styleId: Id, context: Dictionary): Promise<ArrayBufferPointer>;
    preview(familyId: Id, previewFormat: FontPreviewFormat, context: Dictionary): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigValue[];
    getCapabilities(): FontConnectorCapabilities;
}

export type FontConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    preview: boolean;
    filtering: boolean;
};

export enum FontPreviewFormat {
    Square = 'square',
    Line = 'line',
}

export interface FontFamily {
    id: Id;
    name: string;
    fontStylesCount: number;
    extensions: string[];
}

export interface FontFamilyPage {
    pageSize: number;
    data: FontFamily[];
    links: {
        nextPage: string;
    };
}

export interface FontStyle {
    id: Id;
    name: string;
    familyId: string;
    familyName: string;
}


