import type { EditorResponse } from '../types/CommonTypes';
import { throwEditorResponseError } from '../exceptions';

/** May throw for a specific failure; if it returns, {@link throwEditorResponseError} runs next. */
export type EditorResponseOnFailure = (response: EditorResponse<unknown>) => void;

function defaultOnFailure(response: EditorResponse<unknown>): void {
    throwEditorResponseError(response);
}

export function getEditorResponseData<T>(response: EditorResponse<unknown>): EditorResponse<T>;
export function getEditorResponseData<T>(response: EditorResponse<unknown>, parse: boolean): EditorResponse<T>;
export function getEditorResponseData<T>(
    response: EditorResponse<unknown>,
    onFailure: EditorResponseOnFailure,
): EditorResponse<T>;
export function getEditorResponseData<T>(
    response: EditorResponse<unknown>,
    parseOrOnFailure?: boolean | EditorResponseOnFailure,
): EditorResponse<T> {
    let parse = true;
    let hasCustomOnFailure = false;
    let handleFailure: EditorResponseOnFailure = defaultOnFailure;

    if (typeof parseOrOnFailure === 'function') {
        hasCustomOnFailure = true;
        handleFailure = parseOrOnFailure;
    } else if (typeof parseOrOnFailure === 'boolean') {
        parse = parseOrOnFailure;
    }

    try {
        if (!response.success) {
            handleFailure(response);
            // When we have a custom onFailure and it didn't throw,
            // additionally we’re processing with default onFailure handler
            if (hasCustomOnFailure) {
                throwEditorResponseError(response);
            }
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
