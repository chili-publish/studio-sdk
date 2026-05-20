export type ComponentGridSettingsDeltaUpdate = {
    numberOfColumns?: {
        value: number;
    };
    numberOfRows?: {
        value: number;
    };
    horizontalSpacing?: {
        value: string;
    };
    verticalSpacing?: {
        value: string;
    };
    allowReordering?: {
        value: boolean;
    };
}

export enum ComponentGridLayoutAlgorithm {
    fixed = 'fixed',
    slotting = 'slotting',
}

export type FixedComponentGridSettings = {
    type: ComponentGridLayoutAlgorithm.fixed;
    numberOfColumns: number;
    numberOfRows: number;
    componentConnectorId: string | null;
    componentId: string | null;
    horizontalSpacing?: string;
    verticalSpacing?: string;
};

export type SlottingComponentGridSettings = {
    type: ComponentGridLayoutAlgorithm.slotting;
    numberOfColumns: number;
    numberOfRows: number;
    allowReordering: boolean;
    componentConnectorId: string | null;
    componentId: string | null;
    horizontalSpacing?: string;
    verticalSpacing?: string;
};

export type ComponentGridSettings = FixedComponentGridSettings | SlottingComponentGridSettings;
