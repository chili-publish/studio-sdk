import { Dictionary } from '@chili-studio/connector-types';
import { Id, PrivateData } from './CommonTypes';

export interface ConnectorImageVariableSource {
    connectorId: string;
    /**
     * The requested asset id or name
     */
    assetId: string;
    /**
     * If the connector was able to query, this will contain
     * the actual resolved media Id.
     */
    resolved?: ResolvedMedia;

    /**
     * The context of the variable that will be passed to the connector
     */
    context: Dictionary;
}

/**
 * Image variable query lookup result
 */
export interface ResolvedMedia {
    /**
     * The resolved media Id.
     * This id can be used to perform the download call.
     */
    mediaId: string;
}

export enum VariableType {
    shortText = 'shortText',
    longText = 'longText',
    image = 'image',
    list = 'list',
    boolean = 'boolean',
    group = 'group',
    number = 'number',
    date = 'date',
}

export interface Variable {
    id: string;
    type: VariableType;
    parentId?: string;
    name: string;
    label?: string | null;
    isVisible: boolean;
    visibility: VariableVisibility;
    isReadonly: boolean;
    isRequired: boolean;
    occurrences: number;
    placeholder?: string | null;
    helpText?: string | null;
    privateData: PrivateData;
}

export interface ImageVariable extends Variable {
    value?: ConnectorImageVariableSource;
    allowQuery: boolean;
    allowUpload: boolean;
    uploadMinHeight?: number | null;
    uploadMinWidth?: number | null;
}

export interface ListVariableItem {
    value: string;
    displayValue?: string;
}

export interface ListVariable extends Variable {
    items: string[];
    selected?: string;
    prefix?: ValueWithStyle;
    suffix?: ValueWithStyle;
}

export interface BooleanVariable extends Variable {
    value: boolean;
}

export interface ShortTextVariable extends Variable {
    value: string;
    removeParagraphIfEmpty: boolean;
    prefix?: ValueWithStyle;
    suffix?: ValueWithStyle;
    isDontBreak: boolean;
    maxCharacters?: number;
}

export interface NumberVariable extends Variable {
    value: number;
    numberOfDecimals: number;
    decimalCharacterStyleId?: string;
    decimalSeparator: string;
    thousandsSeparator: string;
    minValue?: number;
    maxValue?: number;
    showStepper: boolean;
    stepSize: number;
    prefix?: ValueWithStyle;
    suffix?: ValueWithStyle;
}

export interface DateVariable extends Variable {
    value?: string;
    removeParagraphIfEmpty: boolean;
    displayFormat: string;
    startDate?: DateRestriction;
    endDate?: DateRestriction;
    excludedDays: Day[];
    locale: Locale;
    prefix?: ValueWithStyle;
    suffix?: ValueWithStyle;
}

export type LongTextVariable = ShortTextVariable;

export type GroupVariable = Variable;

export type DateRestriction = RelativeDate | AbsoluteDate;

export interface ValueWithStyle {
    value?: string;
    style?: string;
}

export interface RelativeDate {
    offset: number;
    type: 'relative';
}

export interface AbsoluteDate {
    value: string;
    type: 'absolute';
}

export enum Day {
    Monday = 'monday',
    Tuesday = 'tuesday',
    Wednesday = 'wednesday',
    Thursday = 'thursday',
    Friday = 'friday',
    Saturday = 'saturday',
    Sunday = 'sunday',
}

export enum Locale {
    en_US = 'en_US',
    cs = 'cs',
    da = 'da',
    nl = 'nl',
    fi = 'fi',
    fr = 'fr',
    de = 'de',
    it = 'it',
    no = 'no',
    pl = 'pl',
    pt_PT = 'pt_PT',
    es_ES = 'es_ES',
    sv = 'sv',
}

export interface DateVariablePropertiesDeltaUpdate {
    startDate?: {
        value: DateRestriction | null;
    };
    endDate?: {
        value: DateRestriction | null;
    };
    excludedDays?: {
        value: Day[] | null;
    };
    locale?: {
        value: Locale;
    };
    displayFormat?: {
        value: string;
    };
}

export interface NumberVariablePropertiesDeltaUpdate {
    minValue?: {
        value: number | null;
    };
    maxValue?: {
        value: number | null;
    };
    showStepper?: {
        value: boolean;
    };
    stepSize?: {
        value: number;
    };
    numberOfDecimals?: {
        value: number;
    };
    decimalCharacterStyleId?: {
        value: string | null;
    };
    decimalSeparator?: {
        value: string;
    };
    thousandsSeparator?: {
        value: string;
    };
}

export interface PrefixSuffixDeltaUpdate {
    prefix?: {
        value: string | null;
    };
    suffix?: {
        value: string | null;
    };
    prefixCharacterStyleId?: {
        value: string | null;
    };
    suffixCharacterStyleId?: {
        value: string | null;
    };
}

export enum VariableVisibilityType {
    visible = 'visible',
    invisible = 'invisible',
    conditional = 'conditional',
}

export enum VariableVisibilityTargetType {
    boolean = 'boolean',
    text = 'text',
    number = 'number',
}

export enum VariableVisibilityOperator {
    equals = '=',
    notEquals = '!=',
    greaterThan = '>',
    greaterThanOrEquals = '>=',
    lessThan = '<',
    lessThanOrEquals = '<=',
}

export interface VariableVisibilityBase {
    type: VariableVisibilityType;
}

export interface VariableVisibilityVisible extends VariableVisibilityBase {
    type: VariableVisibilityType.visible;
}

export interface VariableVisibilityInvisible extends VariableVisibilityBase {
    type: VariableVisibilityType.invisible;
}

export interface VariableVisibilityConditional extends VariableVisibilityBase {
    type: VariableVisibilityType.conditional;
    layouts: VariableVisibilityLayout[];
    variables: VariableWithValue[];
}

export type VariableVisibility =
    | VariableVisibilityVisible
    | VariableVisibilityInvisible
    | VariableVisibilityConditional;

export interface VariableVisibilityLayout {
    layoutId: string;
    includeChildren: boolean;
}

export interface VariableWithValue {
    id: string;
    value: VariableVisibilityConditionValue;
}

export interface VariableVisibilityConditionValueBase {
    type: VariableVisibilityTargetType;
}

export interface VariableVisibilityConditionValueBoolean extends VariableVisibilityConditionValueBase {
    type: VariableVisibilityTargetType.boolean;
    value: boolean;
}

export interface VariableVisibilityConditionValueText extends VariableVisibilityConditionValueBase {
    type: VariableVisibilityTargetType.text;
    value: string;
    operator: VariableVisibilityOperator;
}

export interface VariableVisibilityConditionValueNumber extends VariableVisibilityConditionValueBase {
    type: VariableVisibilityTargetType.number;
    value: number;
    operator: VariableVisibilityOperator;
}

export type VariableVisibilityConditionValue =
    | VariableVisibilityConditionValueBoolean
    | VariableVisibilityConditionValueText
    | VariableVisibilityConditionValueNumber;

export type VariableUsagesReport = {
    pages: Id[];
    frames: Id[];
    actionTrigger: Id[];
    variables: Id[];
    outputDataSource: boolean;
};
