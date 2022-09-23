import { EditorResponse } from '../../types/CommonTypes';

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

/**
 * This method should be used with care. It allows marshalling raw data
 * to and from the studio engine. This is usefull to avoid serialization
 * of e.g. byte arrays
 * @param response
 */
export function getRawEditorResponseData<T>(response: T): T {
    return response;
}
