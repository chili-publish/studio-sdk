export type ComponentGridSettingsDeltaUpdate = {
    numberOfColumns?: {
        value: number;
    };
    numberOfRows?: {
        value: number;
    };
    columnGap?: {
        value: string;
    };
    rowGap?: {
        value: string;
    };
}

export enum ComponentGridLayoutAlgorithm {
    fixed = 'fixed',
}

export type FixedComponentGridSettings = {
    type: ComponentGridLayoutAlgorithm.fixed;
    numberOfColumns: number;
    numberOfRows: number;
    columnGap: number;
    rowGap: number;
};

export type ComponentGridSettings = FixedComponentGridSettings /* | More will be added later */; 
