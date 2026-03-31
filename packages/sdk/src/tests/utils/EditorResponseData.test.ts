import { EditorResponse } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { ConnectorHttpError } from '../../exceptions';

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
        let consoleErrorSpy: jest.SpyInstance;

        beforeAll(() => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterAll(() => {
            consoleErrorSpy.mockRestore();
        });

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

        it('should invoke custom onFailure when response is unsuccessful', () => {
            const onFailure = jest.fn((response: EditorResponse<unknown>) => {
                expect(response).toBe(mockErrorResponse);
                throw new Error('custom-onFailure');
            });

            expect(() => getEditorResponseData(mockErrorResponse, onFailure)).toThrow('custom-onFailure');
            expect(onFailure).toHaveBeenCalledTimes(1);
            expect(onFailure).toHaveBeenCalledWith(mockErrorResponse);
        });

        it('should fall back to throwEditorResponseError when custom onFailure returns without throwing', () => {
            const onFailure = jest.fn().mockReturnValue(undefined);

            expect(() => getEditorResponseData(mockErrorResponse, onFailure)).toThrow(Error);
            expect(onFailure).toHaveBeenCalledTimes(1);
            expect(onFailure).toHaveBeenCalledWith(mockErrorResponse);
        });

        it('should not invoke custom onFailure when response is successful', () => {
            const onFailure = jest.fn(() => {
                throw new Error('onFailure should not run');
            });
            const response = castToEditorResponse({ key: 'value' });

            const result = getEditorResponseData<{ key: string }>(response, onFailure);

            expect(onFailure).not.toHaveBeenCalled();
            expect(result.parsedData).toEqual({ key: 'value' });
        });
    });
});
