import { Case, Scripting, SelectedTextStyle } from './TextStyleTypes';
import { ColorUsageUpdate } from './ColorStyleTypes';
import { Id } from './CommonTypes';


export type CharacterStyle = Omit<SelectedTextStyle, 'hasLocalFormatting'> & {
    id: Id;
    name: string;
    fillColorApplied?: boolean
    underline?: boolean | null
    lineThrough?: boolean | null
    color: ColorUsageUpdate
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
        value: ColorUsageUpdate;
    };
    underline: {
        value: boolean;
    };
    lineThrough: {
        value: boolean;
    };
};
