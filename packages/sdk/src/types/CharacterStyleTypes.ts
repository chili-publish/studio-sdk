import { BaseTextStyle, Case, Scripting } from './TextStyleTypes';
import { ColorUsage } from './ColorStyleTypes';
import { Id } from './CommonTypes';


export type CharacterStyle = BaseTextStyle & {
    id: Id;
    name: string;
    fillColorApplied?: boolean;
    underline?: boolean | null;
    lineThrough?: boolean | null;
    color: ColorUsage;
}


export type CharacterStyleUpdate = {
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
        value: string;
    };
    trackingRight: {
        value: string;
    };
    textIndent: {
        value: string;
    };
    baselineShiftValue: {
        value: string;
    };
    lineHeight: {
        value: number;
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
