import { Case, Scripting, SelectedTextStyle } from './TextStyleTypes';
import { ColorUsageUpdate } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { HorizontalAlign } from '../utils/enums';

export type ParagraphStyle = Required<Omit<SelectedTextStyle, 'hasLocalFormatting'>> & {
    id: Id
    name: string
}

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
        value: HorizontalAlign;
    };
    textAlignLast: {
        value: HorizontalAlign;
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
