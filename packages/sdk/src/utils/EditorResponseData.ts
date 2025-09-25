import type { EditorResponse } from '../types/CommonTypes';

// This is an error code from the engine exception table, do not change
const connectorHttpErrorErrorCode = 404075;

export function throwEditorResponseError(response: EditorResponse<unknown>) {
    const parsedError = response.error ?? 'Yikes, something went wrong';
    const parsedCause = {
        cause: {
            name: String(response.status),
            message: response.error ?? 'Yikes, something went wrong',
        },
    };

    if (response.status === connectorHttpErrorErrorCode) {
        const parsedErrorData = JSON.parse(response.data as string);
        const httpStatusCode = parsedErrorData['statusCode'] as number;

        throw new ConnectorHttpError(httpStatusCode, parsedError, parsedCause);
    } else {
        throw new Error(parsedError, parsedCause);
    }
}

export function getEditorResponseData<T>(response: EditorResponse<unknown>, parse = true): EditorResponse<T> {
    try {
        if (!response.success) {
            throwEditorResponseError(response);
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

export class ConnectorHttpError extends Error {
    statusCode: number;

    constructor(statusCode: number, message?: string, options?: ErrorOptions) {
        super(message, options);

        this.statusCode = statusCode;
    }
}
