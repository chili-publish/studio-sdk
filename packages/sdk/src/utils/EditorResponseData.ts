import { EditorResponse } from '../types/CommonTypes';

export function getEditorResponseData<T>(response: EditorResponse<unknown>, parse = true): EditorResponse<T> {
    return {
        ...response,
        parsedData:
            response.success && response.data
                ? parse
                    ? (JSON.parse(response.data as string) as T)
                    : (response.data as unknown as T)
                : null,
    };
}

export function castToEditorResponse(toCast: unknown): EditorResponse<unknown> {
    return {
        status: 200,
        success: true,
        parsedData: null,
        data: JSON.stringify(toCast),
    };
}
