import { MeasurementUnit } from '../../types/LayoutTypes';

export type SelectLayoutOptions = {
    pageSize?: LayoutOptionPageSize;
};

export type LayoutOptionPageSize = {
    width: number;
    height: number;
    unit: MeasurementUnit;
};
