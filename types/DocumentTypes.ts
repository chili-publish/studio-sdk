export type DocumentError = { error: Record<string, unknown>; code: number };

export interface RenderResponse {
    id: string;
    downloadUrl: string;
    resultUrl: string;
    error?: string;
    status?: number;
}
