import { QueryOptions, Dictionary, ArrayBufferPointer, DownloadType, ConnectorConfigOptions } from "./Connector.Shared";

declare module "grafx-studio-fontconnector" {
    interface GrafxFontConnector {
        detail(id, context: Dictionary): Font;
        query(options: QueryOptions, context: Dictionary): Promise<FontPage>;
        download(id: string, previewType: DownloadType, context: Dictionary): Promise<ArrayBufferPointer>
        getConfigurationOptions(): ConnectorConfigOptions | null;
        getCapabilities(): FontConnectorCapabilities;
    }

    type FontConnectorCapabilities = {
        filtering: boolean;
        query: boolean;
        detail: boolean;
    }

    interface FontPage {
        pageSize: number;
        data: Font[];
        links: {
            nextPage: string;
        };
    }
    
    interface Font {
        id: string,
        name: string,
        relativePath: string,
        extension: string,
        type: number,
        family: string,
        style: string,
        metaData: Dictionary;
    }
}