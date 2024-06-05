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
    label: string;
    isVisible: boolean;
    isReadonly: boolean;
    isRequired: boolean;
    occurrences: number;
}

export interface ImageVariable extends Variable {
    value?: ConnectorImageVariableSource;
}

export interface ListVariableItem {
    value: string;
    displayValue?: string;
}

export interface ListVariable extends Variable {
    items: string[];
    selected?: string;
}

export interface BooleanVariable extends Variable {
    value: boolean;
}

export interface ShortTextVariable extends Variable {
    value: string;
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
}

export interface DateVariable extends Variable {
    value: number;
    displayFormat: number;
    locale: DocumentLocaleEnum;
    startDate?: DateRestriction;
    endDate?: DateRestriction;
    excludedDays?: DayEnum[];
}

export type LongTextVariable = ShortTextVariable;

export type GroupVariable = Variable;

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

export interface DateVariablePropertiesDeltaUpdate {
    startDate?: {
        value: DateRestriction | null;
    };
    endDate?: {
        value: DateRestriction | null;
    };
    locale?: {
        value: DocumentLocaleEnum;
    };
    displayFormat?: {
        value: string;
    };
    excludedDays?: {
        value: DayEnum[] | null;
    };
}

export type DateRestriction = RelativeDateRestriction | AbsoluteDateRestriction;

export class RelativeDateRestriction {
    type = DateRestrictionTypeEnum.relative;
    offset: number;

    constructor(offset: number) {
        this.offset = offset;
    }
}

export class AbsoluteDateRestriction {
    type = DateRestrictionTypeEnum.absolute;
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export enum DateRestrictionTypeEnum {
    relative = 'relative',
    absolute = 'absolute',
}

export enum DayEnum {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday',
}

export enum DocumentLocaleEnum {
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
