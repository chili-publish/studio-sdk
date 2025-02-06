import { Id } from './CommonTypes';

export type Page = {
    id: Id;
    number: number;
    isVisible?: boolean;
    width?: number;
    height?: number;
};

export type PageSize = {
    id: Id;
    width: number;
    height: number;
};

export interface SnapshotSettings {
    /**
     * The maximum size of the snapshot's longest dimension in pixels.
     * - If set to a number (e.g., 100), the longest side of the snapshot will be limited to that value.
     * - If set to `null` or ignored, the snapshot will use the full page dimensions.
     * - The maximum allowed value is 1000 pixels.
     */
    largestAxisSize?: number | null;
}
