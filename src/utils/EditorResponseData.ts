import { EditorResponse } from '../../types/CommonTypes';

export function getEditorResponseData<T>(response: EditorResponse<unknown>): EditorResponse<T> {
    return { ...response, parsedData: response.success && response.data ? (JSON.parse(response.data) as T) : null };
}
