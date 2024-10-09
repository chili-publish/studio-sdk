import { EditorResponse } from '../../types/CommonTypes';
import { castToEditorResponse, ConnectorHttpError, getEditorResponseData } from '../../utils/EditorResponseData';

const partialMockResult = {
    status: 200,
    success: true,
    parsedData: null,
};

describe('EditorResponseData Util(s)', () => {
    describe('castToEditorResponse', () => {
        it('Casts a string response to EditorResponse', () => {
            const toCast = 'hello';
            const result = castToEditorResponse(toCast);

            expect(result).toMatchObject({ ...partialMockResult, data: '"hello"' });
        });
        it('Casts a number response to EditorResponse', () => {
            const toCast = 5;
            const result = castToEditorResponse(toCast);

            expect(result).toMatchObject({ ...partialMockResult, data: '5' });
        });

        it('Casts a object response to EditorResponse', () => {
            const toCast = {
                a: 'b',
                c: 'd',
                e: 3,
            };
            const result = castToEditorResponse(toCast);

            expect(result).toMatchObject({ ...partialMockResult, data: '{"a":"b","c":"d","e":3}' });
        });

        it('Casts an array response to EditorResponse', () => {
            const toCast = ['a', 'b', 'c'];
            const result = castToEditorResponse(toCast);

            expect(result).toMatchObject({ ...partialMockResult, data: '["a","b","c"]' });
        });

        it('Casts an array of objects response to EditorResponse', () => {
            const toCast = [
                {
                    a: 'b',
                    c: 'd',
                },
                {
                    e: 3,
                },
            ];
            const result = castToEditorResponse(toCast);

            expect(result).toMatchObject({ ...partialMockResult, data: '[{"a":"b","c":"d"},{"e":3}]' });
        });
    });

    describe('getEditorResponseData', () => {
        const mockErrorResponse: EditorResponse<null> = {
            status: 12345, // Dummy engine error code
            success: false,
            error: 'engine error',
            data: '',
            parsedData: null,
        };

        it('should throw ConnectorHttpError when status matches connectorHttpErrorErrorCode', () => {
            // Do NOT use the value from EditorResponseData file as it will make sure
            // any misalignment with SDK and/or engine is reported.
            const connectorHttpErrorErrorCode = 404075;
            const httpRequestErrorCode = 500;
            const errorMessage = 'Dummy http error message';

            const response = {
                ...mockErrorResponse,
                status: connectorHttpErrorErrorCode,
                error: errorMessage,
                data: JSON.stringify({ statusCode: httpRequestErrorCode }),
            };

            expect(() => getEditorResponseData(response)).toThrowError(ConnectorHttpError);

            try {
                getEditorResponseData(response);
            } catch (error) {
                expect(error).toBeInstanceOf(ConnectorHttpError);
                expect((error as ConnectorHttpError).statusCode).toBe(httpRequestErrorCode); // or whatever the httpStatusCode is
                expect((error as ConnectorHttpError).message).toBe(errorMessage);

                const cause = (error as Error).cause as { name: string; message: string };
                expect(cause.name).toBe(connectorHttpErrorErrorCode.toString());
                expect(cause.message).toBe(errorMessage);
            }
        });

        it('should throw a simple Error when status does NOT match connectorHttpErrorErrorCode', () => {
            const response = mockErrorResponse;

            expect(() => getEditorResponseData(response)).toThrowError(Error);

            try {
                getEditorResponseData(response);
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).not.toBeInstanceOf(ConnectorHttpError);
                expect((error as Error).message).toBe(mockErrorResponse.error);

                const cause = (error as Error).cause as { name: string; message: string };
                expect(cause.name).toBe(mockErrorResponse.status.toString());
                expect(cause.message).toBe(mockErrorResponse.error);
            }
        });
    });
});
