import { Id } from '../types/CommonTypes';
import {
    TextContent,
    TextContentInline,
    TextContentLineBreak,
    TextContentParagraph,
    TextContentText,
    TextContentVariable,
} from '../types/TextContentTypes';

/**
 * Helpers to create {@link TextContent}. They only build plain objects, so the result can be inspected and changed
 * like any other content.
 *
 * @example
 * ```ts
 * const { content, paragraph, text, variable, lineBreak } = TextContentBuilder;
 *
 * await SDK.frame.setTextContent(
 *     frameId,
 *     content(
 *         paragraph('Summer sale', { paragraphStyle: { name: 'Heading' } }),
 *         paragraph([text('Hi '), variable(firstNameVariableId), lineBreak(), text('save 20%', { format: { underline: true } })]),
 *     ),
 * );
 * ```
 */
export const TextContentBuilder = {
    /**
     * Creates content from paragraphs.
     */
    content: (...paragraphs: TextContentParagraph[]): TextContent => ({ paragraphs }),

    /**
     * Creates a paragraph from runs, or from a string which becomes a single text run.
     */
    paragraph: (
        content: TextContentInline[] | string = [],
        options: Omit<TextContentParagraph, 'content'> = {},
    ): TextContentParagraph => ({
        ...options,
        content: typeof content === 'string' ? [TextContentBuilder.text(content)] : content,
    }),

    /**
     * Creates a text run.
     */
    text: (text: string, options: Omit<TextContentText, 'type' | 'text'> = {}): TextContentText => ({
        type: 'text',
        text,
        ...options,
    }),

    /**
     * Creates a variable run.
     */
    variable: (id: Id, options: Omit<TextContentVariable, 'type' | 'id' | 'name'> = {}): TextContentVariable => ({
        type: 'variable',
        id,
        ...options,
    }),

    /**
     * Creates a line break.
     */
    lineBreak: (): TextContentLineBreak => ({ type: 'lineBreak' }),
};
