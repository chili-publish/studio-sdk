import { ArrayBufferPointer, Dictionary, Id, QueryOptions } from './Connector.Shared';
import { ConnectorConfigValue } from './external/Connector.Shared.external';
import { FontConnectorCapabilities, FontFamily, FontPreviewFormat  as SharedFontPreviewFormat } from './external/FontConnector.Shared.external';

export interface GrafxFontConnector {
    detail(connectorId: Id, fontFamilyId: Id, context: Dictionary): Promise<FontStyle[]>;
    query(connectorId: Id, queryOptions: QueryOptions, context: Dictionary): Promise<FontFamilyPage>;
    download(styleId: Id, context: Dictionary): Promise<ArrayBufferPointer>;
    preview(familyId: Id, previewFormat: FontPreviewFormat, context: Dictionary): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigValue[];
    getCapabilities(): FontConnectorCapabilities;
}

export type FontPreviewFormat = `${SharedFontPreviewFormat}`;

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


