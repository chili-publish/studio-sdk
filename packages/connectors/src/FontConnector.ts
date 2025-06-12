import {
    Dictionary,
    FontConnectorCapabilities,
    FontFamilyPage,
    FontStyle,
    QueryOptions,
} from '@chili-studio/connector-types';
import { ArrayBufferPointer, ConnectorConfigOptions } from './Connector.Shared';

export type { FontConnectorCapabilities, FontFamily, FontFamilyPage, FontStyle } from '@chili-studio/connector-types';

export interface GrafxFontConnector {
    detail(connectorId: string, fontFamilyId: string, context: Dictionary): Promise<FontStyle[]>;
    query(connectorId: string, queryOptions: QueryOptions, context: Dictionary): Promise<FontFamilyPage>;
    download(styleId: string, context: Dictionary): Promise<ArrayBufferPointer>;
    preview(familyId: string, previewFormat: FontPreviewFormat, context: Dictionary): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigOptions | null;
    getCapabilities(): FontConnectorCapabilities;
}

export type FontPreviewFormat = 'square' | 'line';
