import { castToEditorResponse } from '../../utils/EditorResponseData';

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
});
