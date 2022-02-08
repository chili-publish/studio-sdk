export type DocumentError = string | Record<string, undefined>;

export type RenderResponse = {
    id: string;
    downloadUrl: string;
    resultUrl: string;
};
