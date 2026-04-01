import { EditorResponse, Id } from '../types/CommonTypes';
import { connectorHttpErrorErrorCode, variableInvalidValueErrorCode } from './Codes';
import { ConnectorHttpError , VariableValueConstrainsViolationError } from './Exceptions';

export function throwEditorResponseError(response: EditorResponse<unknown>): never {
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



function parseVariableConstraintError(errorMsg: string): { valid: boolean; variableId?: string } {
    // Only the listed formats are considered valid for constraint errors.
    // Extend with future use cases (i.e. character's limit error)
    const patterns = [
        /DateVariable '([^']+)' should not be part of excludedDays, ".*" was given/,
        /DateVariable '([^']+)' expects \$date to be > startDate:.*$/,
        /DateVariable '([^']+)' expects \$date to be < endDate:.*$/,
        /NumberVariable '([^']+)' expects \$extractedValue to be >= .+$/,
        /NumberVariable '([^']+)' expects \$extractedValue to be <= .+$/,
    ];

    for (const pattern of patterns) {
        const match = errorMsg.match(pattern);
        if (match) {
            return { valid: true };
        }
    }
    return { valid: false };
}

/**
 * Variable-specific failure hook
 * Throws VariableValueConstrainsViolationError when the response matches a recognized constraint error;
 * otherwise returns so `getEditorResponseData` falls back to `throwEditorResponseError`.
 */
export function throwVariableException(response: EditorResponse<unknown>, context: { id: Id }): void {
    if (response.status === variableInvalidValueErrorCode && response.error) {
        const errorMsg = response.error;
        const parseResult = parseVariableConstraintError(errorMsg);

        if (parseResult.valid) {
            throw new VariableValueConstrainsViolationError(context, errorMsg, {
                cause: { name: String(response.status), message: errorMsg },
            });
        }
    }
}
