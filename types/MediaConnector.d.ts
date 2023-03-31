import { QueryOptions, Dictionary, ArrayBufferPointer, DownloadType } from "./Connector.Shared";

declare module "grafx-studio-mediaconnector" {

    interface MediaConnector {
        query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
        download(id: string, previewType: DownloadType, context: Dictionary): Promise<ArrayBufferPointer>
        upload(name: string, blob: Int8Array): Promise<Media>
        remove(id: string): Promise<boolean>
        copy(id: string, newName: string): Promise<Media>
        getQueryOptions(): string[] | null;
        getDownloadOptions(): string[] | null;
        getCapabilities(): MediaConnectorCapabilities;
    }
    
    type MediaConnectorCapabilities = {
        filtering: boolean;
        upload: boolean;
        query: boolean;
        remove: boolean;
        copy: boolean;
    }

    interface MediaPage {
        pageSize: number;
        data: Media[];
        links: {
            nextPage: string;
        };
    }

    interface Media {
        id: String;
        name: String;
        relativePath: String;
        type: number;
        metaData: Dictionary;
    }
}