import type { EditorResponse } from '../types/CommonTypes';

export function getEditorResponseData<T>(response: EditorResponse<unknown>, parse = true): EditorResponse<T> {
    try {
        if (!response.success) {
            throw new Error(response.error ?? 'Yikes, something went wrong', {
                cause: {
                    name: String(response.status),
                    message: response.error ?? 'Yikes, something went wrong',
                },
            });
        }
        const dataShouldBeParsed = response.data && parse;
        return {
            ...response,
            parsedData: dataShouldBeParsed
                ? (JSON.parse(response.data as string) as T)
                : (response.data as unknown as T),
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// For testing purposes only
export function castToEditorResponse(toCast: unknown): EditorResponse<unknown> {
    return {
        status: 200,
        success: true,
        parsedData: null,
        data: JSON.stringify(toCast),
    };
}
