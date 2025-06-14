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
};

export type ParagraphStyleUpdate = {
    fontKey: {
        value: string;
    };
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
        value: number;
    };
    trackingRight: {
        value: number;
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
    fillColorApplied: {
        value: boolean;
    };
    strokeColor: {
        value: ColorUsageUpdate;
    };
    strokeColorApplied: {
        value: boolean;
    };
    strokeWidth: {
        value: string;
    };
    underline: {
        value: boolean;
    };
    lineThrough: {
        value: boolean;
    };
};
