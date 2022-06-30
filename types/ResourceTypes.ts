export enum AssetType {
    ASSET = 'asset',
    FOLDER = 'folder',
}

export enum ResourceProvider {
    CHILI = 'chili',
}

type LinkDetail = {
    href: string;
};

export type ResourcetDetail = {
    id: string;
    name: string;
    relativePath: string;
    type: AssetType;
    fileType?: string;
    links?: {
        previewHigh: LinkDetail;
        previewMedium: LinkDetail;
        previewThumb: LinkDetail;
        download: LinkDetail;
        detail: LinkDetail;
    };
};

export type ResourceResponse = {
    data: ResourcetDetail[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    links?: {
        firstPage: LinkDetail;
        nextPage: LinkDetail;
        previousPage: LinkDetail;
        lastPage: LinkDetail;
    };
};
