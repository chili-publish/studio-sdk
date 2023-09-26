import { Case, Scripting } from './TextStyleTypes';
import { ColorUsage, ColorUsageUpdate } from './ColorStyleTypes';
import { Id } from './CommonTypes';

export type CharacterStyle = {
    id: Id;
    name: string;
    fontKey?: string;
    fontSize?: number;
    typographicCase?: Case;
    kerningOn: boolean;
    subSuperScript?: Scripting;

    // the following properties are unit properties
    trackingLeft?: string;
    trackingRight?: string;
    textIndent?: string;
    // end of unit properties

    baselineShiftValue?: string;
    lineHeight?: number;
    textOverprint?: boolean;
    color: ColorUsage;
    fillColorApplied?: boolean | null;
    underline: boolean;
    lineThrough: boolean;
};

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
