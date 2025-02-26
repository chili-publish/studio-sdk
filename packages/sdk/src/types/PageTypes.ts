import { Id } from './CommonTypes';

export type Page = {
    id: Id;
    number: number;
    isVisible?: boolean;
    width?: number;
    height?: number;
};

export type PageSize = {
    /** @deprecated all pages are being updated simultaneously hence no id needed */
    id: Id;
    width: number;
    height: number;
};

export interface SnapshotSettings {
    /**
     * The maximum size of the snapshot's longest dimension in pixels.
     * - If set to a number (e.g., 100), the longest side of the snapshot will be limited to that value.
     * - In case when layout size is smaller than the specified value, the snapshot will be upscaled.
     * - If set to `null` or ignored, the snapshot will use the full page dimensions.
     * - The maximum allowed value is 1000 pixels.
     */
    largestAxisSize?: number | null;
    /**
     * The maximum time to wait in milliseconds for the assets to load before the snapshot is taken.
     *
     * When the time is exceeded, the snapshot will be taken even if not all assets are loaded yet.
     *
     * When not defined, the default value is 10000 ms.
     */
    maxWaitTimeMs?: number | null;
}
