import {Case, Scripting} from "./TextStyleTypes";
import {ColorUsage} from "./ParagraphStyleTypes";

export type CharacterStyle = {
    id: string;
    name: string;
    fontFamily?: string;
    fontStyle?: string
    fontSize?: number;
    typographicCase?: Case;
    kerningOn: boolean;
    subSuperScript?: Scripting
    trackingLeft?: string;
    trackingRight?: string;
    textIndent?: string;
    baselineShiftValue?: string;
    lineHeight?: number;
    textOverprint?: boolean;
    color: ColorUsage;
    underline: boolean;
    lineThrough: boolean;
}