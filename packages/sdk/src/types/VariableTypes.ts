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

export type LongTextVariable = ShortTextVariable;

export type GroupVariable = Variable;

export interface NumberVariablePropertiesDeltaUpdate {
    min?: number;
    max?: number;
    showStepper?: boolean;
    stepSize?: number;
    numberOfDecimals?: number;
    decimalCharacterStyleId?: string;
    decimalSeparator?: string;
    thousandsSeparator?: string;
}
