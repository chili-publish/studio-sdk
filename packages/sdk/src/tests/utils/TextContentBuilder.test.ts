import { TextContent } from '../../types/TextContentTypes';
import { TextContentBuilder } from '../../utils/TextContentBuilder';

describe('TextContentBuilder', () => {
    const { content, paragraph, text, variable, lineBreak } = TextContentBuilder;

    it('builds the same content as the plain object form', () => {
        const expected: TextContent = {
            paragraphs: [
                { paragraphStyle: { name: 'Heading' }, content: [{ type: 'text', text: 'Summer sale' }] },
                {
                    content: [
                        { type: 'text', text: 'Hi ' },
                        { type: 'variable', id: 'first-name', format: { underline: true } },
                        { type: 'lineBreak' },
                        { type: 'text', text: 'save 20%', characterStyle: { id: 'highlight' } },
                    ],
                },
                { list: { type: 'bullet' }, content: [] },
            ],
        };

        expect(
            content(
                paragraph('Summer sale', { paragraphStyle: { name: 'Heading' } }),
                paragraph([
                    text('Hi '),
                    variable('first-name', { format: { underline: true } }),
                    lineBreak(),
                    text('save 20%', { characterStyle: { id: 'highlight' } }),
                ]),
                paragraph([], { list: { type: 'bullet' } }),
            ),
        ).toEqual(expected);
    });

    it('creates an empty paragraph by default', () => {
        expect(paragraph()).toEqual({ content: [] });
        expect(content()).toEqual({ paragraphs: [] });
    });
});
