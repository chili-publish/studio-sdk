declare module "grafx-studio-mediaconnector" {

    interface MediaConnector {
        query(options: QueryOptions, context: import("grafx-studio-connector-shared").Dictionary): Promise<MediaPage>;
        download(id: string, previewType: "lowresWeb"|"highresWeb", context: import("grafx-studio-connector-shared").Dictionary): Promise<import("grafx-studio-connector-shared").ArrayBufferPointer>
        upload(name: string, blob: Int8Array): Promise<Media>
        remove(id: string): Promise<boolean>
        copy(id: string, newName: string): Promise<Media>

        getQueryOptions(): string[] | null;
        getDownloadOptions(): string[] | null;

        getCapabilities(): MediaConnectorCapabilities;
    }

    enum DownloadType {
        lowres_web = 'lowresweb',
        highres_web = 'highresweb'
    }

    type MediaConnectorCapabilities = {
        filtering: boolean;
        upload: boolean;
        query: boolean;
        remove: boolean;
        copy: boolean;
    }

    type QueryOptions = {
        sortOrder: string | null;
        collection: string | null;
        filter: string[] | null;
        pageToken: string | null;
        pageSize: number;
        sortBy: string | null;
    }

    interface MediaPage {
        pageSize: number;
        data: Media[];
        links: Links;
    }

    interface Links{
        nextPageToken: String;
    }

    interface Media {
        id: String;
        name: String;
        relativePath: String;
        type: number;
        metaData: import("grafx-studio-connector-shared").Dictionary;
    }
}