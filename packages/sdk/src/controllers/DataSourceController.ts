import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { ConnectorInstance } from '../next';
import { DataItem } from '../types/DataConnectorTypes';
import { DataItemMappingTools } from '../utils/DataItemMappingTools';

/**
 * The DataSourceController is responsible for all communication regarding data source.
 * Methods inside this controller can be called by `window.SDK.dataSource.{method-name}`
 *
 * A data source is a data connector selected to be used in the document.
 * Only one data source can be defined per template, this controller manages this
 * data source.
 *
 */
export class DataSourceController {
    /**
     * @ignore
     */
    #editorAPI: Promise<EditorAPI>;
    #dataItemMappingTools: DataItemMappingTools;

    /**
     * @ignore
     */
    constructor(editorAPI: Promise<EditorAPI>, dataItemMappingTools: DataItemMappingTools) {
        this.#editorAPI = editorAPI;
        this.#dataItemMappingTools = dataItemMappingTools;
    }

    /**
     * Sets the data source by id.
     * @param connectorId the id of your data connector
     * @returns
     */
    setDataSource = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res.setDataSource(connectorId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Gets the data source.
     * @returns the connector object
     */
    getDataSource = async () => {
        const res = await this.#editorAPI;
        return res.getDataSource().then((result) => getEditorResponseData<ConnectorInstance>(result));
    };

    /**
     * Removes the data source if defined.
     * @returns
     */
    removeDataSource = async () => {
        const res = await this.#editorAPI;
        return res.removeDataSource().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Maps the data row values to variables by names (data row keys).
     * Variables must exist.
     * @param dataRow DataItem to set
     * @returns
     */
    setDataRow = async (dataRow: DataItem) => {
        const res = await this.#editorAPI;
        const engineDataItem = this.#dataItemMappingTools.mapDataItemToEngine(dataRow);
        return res.setDataRow(JSON.stringify(engineDataItem)).then((result) => getEditorResponseData<null>(result));
    };
}
