import { Alignment, Case, Scripting } from './TextStyleTypes';
import { ColorUpdate } from './ColorStyleTypes';

export type ColorUsage = {
    color: ColorUpdate;
    usageType: ColorUsageType;
    opacity?: number;
};
export enum ColorUsageType {
    local = 'local',
    reference = 'reference',
}

export type ParagraphStyle = {
    id: string;
    name: string;
    fontFamily: string;
    fontStyle: string;
    fontSize: number;
    typographicCase: Case;
    kerningOn: boolean;
    subSuperScript: Scripting;
    // the following properties are unit properties
    trackingLeft: string;
    trackingRight: string;
    paragraphStartIndent: string;
    paragraphEndIndent: string;
    paragraphSpaceBefore: string;
    paragraphSpaceAfter: string;
    textIndent: string;
    // end of unit properties
    alignToBaseLine: boolean;
    baselineShiftValue: string;
    lineHeight: number;
    textAlign: Alignment;
    textAlignLast: Alignment;
    textOverprint: boolean;
    color: ColorUsage;
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
        value: ColorUsage;
    };
    underline: {
        value: boolean;
    };
    lineThrough: {
        value: boolean;
    };
};