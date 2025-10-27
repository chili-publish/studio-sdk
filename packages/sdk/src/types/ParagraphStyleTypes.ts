import { ColorUsage, ColorUsageUpdate } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { Alignment, Case, Scripting } from './TextStyleTypes';

export type ParagraphStyle = {
    id: Id;
    name: string;
    fontKey: string;
    fontStyle: string;
    fontSize: number;
    typographicCase: Case;
    kerningOn: boolean;
    subSuperScript: Scripting;
    // the following properties are unit properties
    trackingLeft: number;
    trackingRight: number;
    startIndent: string;
    endIndent: string;
    spaceBefore: string;
    spaceAfter: string;
    textIndent: string;
    // end of unit properties
    alignToBaseLine: boolean;
    baselineShiftValue: string;
    lineHeight: number;
    textAlign: Alignment;
    textAlignLast: Alignment;
    textOverprint: boolean;
    color: ColorUsage;
    strokeColor: ColorUsage;
    fillColorApplied: boolean;
    strokeColorApplied: boolean;
    strokeWidth: number;
    underline: boolean;
    lineThrough: boolean;
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    bulletListStyle: BulletListStyle;
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    numericListStyle: NumericListStyle;
};

export type ParagraphStyleUpdate = {
    fontKey?: {
        value: string;
    };
    fontSize?: {
        value: number;
    };
    typographicCase?: {
        value: Case;
    };
    kerningOn?: {
        value: boolean;
    };
    subSuperScript?: {
        value: Scripting;
    };
    trackingLeft?: {
        value: number;
    };
    trackingRight?: {
        value: number;
    };
    textIndent?: {
        value: string;
    };
    alignToBaseLine?: {
        value: boolean;
    };
    baselineShiftValue?: {
        value: string;
    };
    lineHeight?: {
        value: number;
    };
    textAlign?: {
        value: Alignment;
    };
    textAlignLast?: {
        value: Alignment;
    };
    textOverprint?: {
        value: boolean;
    };
    color?: {
        value: ColorUsageUpdate;
    };
    fillColorApplied?: {
        value: boolean;
    };
    strokeColor?: {
        value: ColorUsageUpdate;
    };
    strokeColorApplied?: {
        value: boolean;
    };
    strokeWidth?: {
        value: string;
    };
    underline?: {
        value: boolean;
    };
    lineThrough?: {
        value: boolean;
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    bulletListBulletMarks?: {
        value: string[];
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    bulletListLeftIndent?: {
        value: string;
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    bulletListTextIndent?: {
        value: string;
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    bulletListCharacterStyleId?: {
        value?: string;
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    numericListNumberingStyle?: {
        value: string[];
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    numericListLeftIndent?: {
        value: string;
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    numericListTextIndent?: {
        value: string;
    };
    /**
     * @experimental This property is experimental and may be changed in the future.
     */
    numericListCharacterStyleId?: {
        value?: string;
    };
};

export type BulletListStyle = {
    /**
     * Array of bullet marks for each level
     * The position of the item in the array is the level of the bullet list
     * The value of the item is the bullet mark
     */
    bulletMarks: string[];
    leftIndent: number;
    textIndent: number;
    characterStyleId?: string;
};

export type NumericListNumberingStyle = {
    format: number;
    symbol: number;
};

export type NumericListStyle = {
    leftIndent: number;
    textIndent: number;
    numberingStyle: NumericListNumberingStyle[];
    characterStyleId?: string;
};
