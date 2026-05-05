import { Scripting } from './TextStyleTypes';

/**
 * Defines a text flow and all style rules that are applied to it.
 */
export interface StructuredTextTextFlowDefinition {
    id: string;
    styleRules: StructuredTextStyleRule[];
}

/**
 * Supported style kinds for structured text rules.
 */
export enum StructuredTextStyleKind {
    paragraph = 'paragraph',
    character = 'character',
    lineBreak = 'lineBreak',
    list = 'list',
    inlineStyle = 'inlineStyle',
}

/**
 * A style rule for rich text parsing.
 */
export type StructuredTextStyleRule =
    | ParagraphTextStyleRule
    | CharacterTextStyleRule
    | LineBreakTextStyleRule
    | ListTextStyleRule
    | InlineStyleTextStyleRule;

export interface ParagraphTextStyleRule {
    matcher: StructuredTextNodeMatcher;
    paragraphStyleName: string;
    styleKind: StructuredTextStyleKind.paragraph;
}

export interface CharacterTextStyleRule {
    matcher: StructuredTextNodeMatcher;
    characterStyleName: string;
    styleKind: StructuredTextStyleKind.character;
}

export interface LineBreakTextStyleRule {
    matcher: StructuredTextNodeMatcher;
    styleKind: StructuredTextStyleKind.lineBreak;
}

/**
 * A style rule for list container or list item tags (`ul`, `ol`, `li`).
 *
 * Applying a `paragraphStyleName` to a list container causes all its items
 * to inherit that paragraph style. Applying it to a list item (`li`) causes
 * only that individual item to use the style.
 */
export interface ListTextStyleRule {
    matcher: StructuredTextNodeMatcher;
    paragraphStyleName: string;
    styleKind: StructuredTextStyleKind.list;
}

/**
 * A style rule that applies inline character styling directly to matched
 * elements without requiring a named style.
 */
export interface InlineStyleTextStyleRule {
    matcher: StructuredTextNodeMatcher;
    inlineStyleDefinition: StructuredTextInlineStyleDefinition;
    styleKind: StructuredTextStyleKind.inlineStyle;
}

/**
 * Defines inline character style properties applied by inline style rules.
 *
 * Every property is optional. If a property is left `undefined`, it is not
 * overridden by the rule.
 */
export interface StructuredTextInlineStyleDefinition {
    underline?: boolean;
    lineThrough?: boolean;
    subSuperScript?: Scripting;
}

/**
 * Matcher for structured text nodes.
 */
export interface StructuredTextNodeMatcher {
    tag?: string;
    attributeMatchers: StructuredTextAttributeMatcher[];
    caseSensitive: boolean;
}

/**
 * Supported operators for matching attributes.
 */
export enum StructuredTextAttributeMatchOperator {
    exists = 'exists',
    missing = 'missing',
    equals = 'equals',
    notEquals = 'notEquals',
    contains = 'contains',
    startsWith = 'startsWith',
    endsWith = 'endsWith',
}

/**
 * Matcher used to evaluate a node attribute.
 */
export type StructuredTextAttributeMatcher =
    | ExistsStructuredTextAttributeMatcher
    | MissingStructuredTextAttributeMatcher
    | EqualsStructuredTextAttributeMatcher
    | NotEqualsStructuredTextAttributeMatcher
    | ContainsStructuredTextAttributeMatcher
    | StartsWithStructuredTextAttributeMatcher
    | EndsWithStructuredTextAttributeMatcher;

export interface ExistsStructuredTextAttributeMatcher {
    name: string;
    caseSensitive: boolean;
    matchOperator: StructuredTextAttributeMatchOperator.exists;
}

export interface MissingStructuredTextAttributeMatcher {
    name: string;
    caseSensitive: boolean;
    matchOperator: StructuredTextAttributeMatchOperator.missing;
}

export interface EqualsStructuredTextAttributeMatcher {
    name: string;
    caseSensitive: boolean;
    value: string;
    matchOperator: StructuredTextAttributeMatchOperator.equals;
}

export interface NotEqualsStructuredTextAttributeMatcher {
    name: string;
    caseSensitive: boolean;
    value: string;
    matchOperator: StructuredTextAttributeMatchOperator.notEquals;
}

export interface ContainsStructuredTextAttributeMatcher {
    name: string;
    caseSensitive: boolean;
    value: string;
    matchOperator: StructuredTextAttributeMatchOperator.contains;
}

export interface StartsWithStructuredTextAttributeMatcher {
    name: string;
    caseSensitive: boolean;
    value: string;
    matchOperator: StructuredTextAttributeMatchOperator.startsWith;
}

export interface EndsWithStructuredTextAttributeMatcher {
    name: string;
    caseSensitive: boolean;
    value: string;
    matchOperator: StructuredTextAttributeMatchOperator.endsWith;
}
