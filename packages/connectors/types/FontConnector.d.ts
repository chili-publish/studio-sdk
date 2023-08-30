import { QueryOptions, Dictionary, ArrayBufferPointer, DownloadType } from "./Connector.Shared";

declare module "grafx-studio-fontconnector" {
    interface GrafxFontConnector {
        detail(id): Font;
        query(options: QueryOptions, context: Dictionary): Promise<FontPage>;
        download(id: string, previewType: DownloadType, context: Dictionary): Promise<ArrayBufferPointer>
        getQueryOptions(): string[] | null;
        getDownloadOptions(): string[] | null;
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