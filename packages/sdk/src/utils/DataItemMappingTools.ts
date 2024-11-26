import { DataItem } from '../types/DataConnectorTypes';

export class DataItemMappingTools {
    /**
     * Check if the value is a DatePropertyWrapper with the type guard
     * @param value a dynamic value which
     * @returns boolean value.
     */
    private isDatePropertyWrapper(
        value: string | number | boolean | DatePropertyWrapper | null,
    ): value is DatePropertyWrapper {
        return typeof value === 'object' && value?.type === 'date';
    }

    /**
     * Check if the value is a Date object instance
     * @param value a dynamic value which
     * @returns boolean value.
     */
    private isDateObject(value: string | number | boolean | Date | null): value is Date {
        return value instanceof Date;
    }

    /**
     * Transforms an InternalDataItem into a DataItem.
     *
     * Converts DatePropertyWrapper values to JavaScript Date objects
     * while keeping other values unchanged.
     *
     * @param dataItem the EngineDataItem to transform.
     * @returns the resulting DataItem with parsed date properties.
     */
    mapEngineToDataItem(dataItem: EngineDataItem): DataItem {
        const parsedItem: DataItem = {};

        Object.entries(dataItem).forEach(([key, value]) => {
            parsedItem[key] = this.isDatePropertyWrapper(value) ? new Date(value.value) : value;
        });

        return parsedItem;
    }

    /**
     * Transforms a DataItem into an InternalDataItem.
     *
     * Converts JavaScript Date objects to DatePropertyWrapper objects
     * while keeping other values unchanged.
     *
     * @param dataItem the DataItem to transform.
     * @returns the resulting DataItem with parsed date properties.
     */
    mapDataItemToEngine(dataItem: DataItem): EngineDataItem {
        const parsedItem: EngineDataItem = {};

        Object.entries(dataItem).forEach(([key, value]) => {
            parsedItem[key] = this.isDateObject(value)
                ? ({ value: value.getTime(), type: 'date' } as DatePropertyWrapper)
                : value;
        });

        return parsedItem;
    }
}

/**
 * Internal type to wrap the date object value on the engine side.
 */
export type DatePropertyWrapper = {
    value: number;
    type: 'date';
};

/**
 * Engine data item type.
 */
export type EngineDataItem = {
    [key: string]: string | number | boolean | DatePropertyWrapper | null;
};
