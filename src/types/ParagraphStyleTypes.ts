import { Alignment, Case, Scripting } from './TextStyleTypes';
import { ColorUsage, ColorUsageUpdate } from './ColorStyleTypes';
import { Id } from './CommonTypes';

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
    trackingLeft: string;
    trackingRight: string;
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
    fillColorApplied: boolean;
    underline: boolean;
    lineThrough: boolean;
};

export type ParagraphStyleUpdate = {
    fontSize: {
        value: number;
    };
    typographicCase: {
        value: Case;
    };
    kerningOn: {
        value: boolean;
    };
    subSuperScript: {
        value: Scripting;
    };
    trackingLeft: {
        value: string;
    };
    trackingRight: {
        value: string;
    };
    textIndent: {
        value: string;
    };
    alignToBaseLine: {
        value: boolean;
    };
    baselineShiftValue: {
        value: string;
    };
    lineHeight: {
        value: number;
    };
    textAlign: {
        value: Alignment;
    };
    textAlignLast: {
        value: Alignment;
    };
    textOverprint: {
        value: boolean;
    };
    color: {
        value: ColorUsageUpdate;
    };
    underline: {
        value: boolean;
    };
    lineThrough: {
        value: boolean;
    };
};
