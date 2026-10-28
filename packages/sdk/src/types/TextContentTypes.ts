import { Color, ColorUsageType } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { Case, HorizontalAlign, MarkedListType, Scripting } from './TextStyleTypes';

/**
 * Accepts both an enum member and its string value, so content can be written as plain JSON.
 */
type EnumOrValue<T extends string> = T | `${T}`;

/**
 * The content of a text frame.
 *
 * The content is a list of paragraphs, every paragraph holds a list of inline runs (text, variables and line breaks).
 * Every run carries its own formatting, the order of the runs never changes their meaning.
 *
 * Formatting is inherited in this order: run `format` → run `characterStyle` → paragraph `format` →
 * paragraph `paragraphStyle` → defaults. A property that is not set is inherited.
 *
 * @example
 * ```ts
 * const content: TextContent = {
 *     paragraphs: [
 *         { paragraphStyle: { name: 'Heading' }, content: [{ type: 'text', text: 'Summer sale' }] },
 *         {
 *             content: [
 *                 { type: 'text', text: 'Hi ' },
 *                 { type: 'variable', id: firstNameVariableId, format: { underline: true } },
 *                 { type: 'lineBreak' },
 *                 { type: 'text', text: 'save 20%', characterStyle: { name: 'Highlight' } },
 *             ],
 *         },
 *         { list: { type: 'bullet' }, content: [{ type: 'text', text: 'Free shipping' }] },
 *     ],
 * };
 * ```
 */
export type TextContent = {
    paragraphs: TextContentParagraph[];
};

/**
 * A paragraph of {@link TextContent}.
 */
export type TextContentParagraph = {
    /**
     * The brand kit paragraph style of the paragraph.
     */
    paragraphStyle?: TextStyleReference;
    /**
     * Local paragraph formatting on top of the paragraph style.
     */
    format?: TextContentParagraphFormat;
    /**
     * Makes the paragraph a bullet or numbered list item.
     */
    list?: TextContentList;
    /**
     * The runs of the paragraph, an empty list is an empty paragraph.
     * A leading text run with an empty text holds the formatting of the (hidden) paragraph mark when it differs from
     * the first run, this is also how an empty paragraph carries character formatting.
     */
    content: TextContentInline[];
};

/**
 * An inline run of a {@link TextContentParagraph}.
 */
export type TextContentInline = TextContentText | TextContentVariable | TextContentLineBreak;

/**
 * A run of text. A new line (`\n`) inside `text` is turned into a line break, paragraphs are only created
 * through {@link TextContent.paragraphs}.
 */
export type TextContentText = {
    type: 'text';
    text: string;
    characterStyle?: TextStyleReference;
    format?: TextContentCharacterFormat;
};

/**
 * A variable placed in the text. Short text, long text, rich text, list, number and date variables can be used.
 */
export type TextContentVariable = {
    type: 'variable';
    /**
     * The id of the variable.
     */
    id: Id;
    /**
     * The name of the variable, only set when reading content. It is ignored when setting content.
     */
    readonly name?: string;
    characterStyle?: TextStyleReference;
    format?: TextContentCharacterFormat;
};

/**
 * A line break inside a paragraph, it takes the formatting of the text before it.
 */
export type TextContentLineBreak = {
    type: 'lineBreak';
};

/**
 * A reference to a brand kit paragraph or character style, by `id` or by `name`.
 * When both are set, the `id` is used. Names are matched exactly first and case-insensitively next,
 * an ambiguous name is rejected.
 * When reading content, both `id` and `name` are set.
 */
export type TextStyleReference = { id: Id; name?: string } | { id?: Id; name: string };

/**
 * Bullet or numbered list settings of a paragraph. The appearance of the list (marks, numbering, indents) is
 * defined by the paragraph style.
 */
export type TextContentList = {
    type: EnumOrValue<MarkedListType>;
    /**
     * Zero based nesting level, from 0 to 4.
     */
    level?: number;
    /**
     * Numbering continues across paragraphs with the same group, also when other paragraphs are in between.
     */
    group?: string;
};

/**
 * A color that is defined locally on the text.
 */
export type TextContentLocalColor = {
    type: ColorUsageType.local | 'local';
    color: Color;
    /**
     * Opacity in the range 0 - 1.
     */
    opacity?: number;
};

/**
 * A brand kit color, referenced by `id` or by `name`. When reading content, both are set.
 */
export type TextContentBrandKitColor = {
    type: ColorUsageType.brandKit | 'brandKit';
    /**
     * Opacity in the range 0 - 1.
     */
    opacity?: number;
} & ({ id: Id; name?: string } | { id?: Id; name: string });

export type TextContentColor = TextContentLocalColor | TextContentBrandKitColor;

/**
 * Local character formatting, every property is optional.
 *
 * Lengths are strings with a unit, e.g. `'12pt'`, `'2mm'` or `'0.5in'`. When reading content, lengths are always
 * expressed in `pt`. Numeric values outside of the supported range are clamped.
 */
export type TextContentCharacterFormat = {
    /**
     * The id of a brand kit font style.
     */
    fontKey?: string;
    fontSize?: number;
    typographicCase?: EnumOrValue<Case>;
    kerningOn?: boolean;
    subSuperScript?: EnumOrValue<Scripting>;
    trackingLeft?: number;
    trackingRight?: number;
    textIndent?: string;
    baselineShiftValue?: number;
    /**
     * Line height in percent.
     */
    lineHeight?: number;
    fillOverprint?: boolean;
    strokeOverprint?: boolean;
    color?: TextContentColor;
    fillColorApplied?: boolean;
    strokeColor?: TextContentColor;
    strokeColorApplied?: boolean;
    strokeWidth?: string;
    backgroundColor?: TextContentColor;
    backgroundColorApplied?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
};

/**
 * Local paragraph formatting. It holds all {@link TextContentCharacterFormat} properties too, which act as
 * the default for every run of the paragraph.
 */
export type TextContentParagraphFormat = TextContentCharacterFormat & {
    startIndent?: string;
    endIndent?: string;
    spaceBefore?: string;
    spaceAfter?: string;
    alignToBaseLine?: boolean;
    textAlign?: EnumOrValue<HorizontalAlign>;
    textAlignLast?: EnumOrValue<HorizontalAlign>;
};

/**
 * A range in the plain text of a text frame, as returned by `SDK.frame.getPlainText`.
 *
 * Positions count characters (UTF-16 code units, like JavaScript string indexes) of the plain text: paragraphs are
 * separated by `\n`, a line break is `\u2028` and a variable counts as its current value. A range can not start or end
 * inside a variable, it has to include or exclude a variable completely.
 *
 * @example
 * ```ts
 * const text = (await SDK.frame.getPlainText(frameId)).parsedData ?? '';
 * const start = text.indexOf('colour');
 * await SDK.frame.setPlainText(frameId, 'color', { start, length: 'colour'.length });
 * ```
 */
export type TextRange = {
    start: number;
    length: number;
};
