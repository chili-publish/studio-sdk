import { MeasurementUnit } from "../../types/LayoutTypes";

export type SelectLayoutOptions = {
    size?: PazeSize
};

export type PazeSize = {
    width: number;
    height: number;
    unit: MeasurementUnit
};
