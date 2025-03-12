import { ConnectorConfigOptions, EditorAPI, EditorResponse, MetaData } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { DataConnectorCapabilities, DataItem, DataModel, DataPage, PageConfig } from '../types/DataConnectorTypes';
import { DataItemMappingTools, EngineDataItem } from '../utils/DataItemMappingTools';

/**
 * The DataConnectorController is responsible for all communication regarding Data connectors.
 * Methods inside this controller can be called by `window.SDK.dataConnector.{method-name}`
 *
 * The way GraFx Studio handles different sources of Data is called 'DataConnector'.
 * A DataConnector is an implementation of a set of capabilities we need
 * to interact with a certain Data Management system.
 * In essence, a connector is the combination of a JavaScript snippet and some metadata.
 * The JavaScript snippet is loaded in the studio engine using a sandboxed JavaScript execution engine (QuickJs).
 * This allows us to execute the Data connector
 * both on web using webassembly and on the server side during e.g., animation output generation.
 * This controller is an interface to the running connector instance inside the studio engine.
 */
export class DataConnectorController {
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
     * Query a specific DataConnector for data using both specific PageConfig and the dynamic
     * context as parameters.
     * @param connectorId unique id of the Data connector
     * @param config page configuration
     * @param context context that will be available in the connector script.
     * @returns a DataPage with an array of data objects
     */
    getPage = async (
        connectorId: string,
        config: PageConfig,
        context: MetaData = {},
    ): Promise<EditorResponse<DataPage<DataItem>>> => {
        const res = await this.#editorAPI;
        return res
            .dataConnectorGetPage(connectorId, JSON.stringify(config), JSON.stringify(context))
            .then((result) => getEditorResponseData<DataPage<EngineDataItem>>(result))
            .then((resp) => {
                const update: EditorResponse<DataPage<DataItem>> = { ...resp, parsedData: null };
                if (resp.parsedData) {
                    update.parsedData = {
                        data: resp.parsedData.data.map((e: EngineDataItem) =>
                            this.#dataItemMappingTools.mapEngineToDataItem(e),
                        ),
                        continuationToken: resp.parsedData.continuationToken,
                    };
                }
                return update;
            });
    };

    /**
     * Query a specific DataConnector for a data model using the dynamic context as parameter.
     * @param connectorId unique id of the data connector
     * @param context context that will be available in the connector script.
     * @returns DataModel
     */
    getModel = async (connectorId: string, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .dataConnectorGetModel(connectorId, JSON.stringify(context))
            .then((result) => getEditorResponseData<DataModel>(result));
    };

    /**
     * All connectors have a certain set of mappings they allow to be passed into the connector methods their context. This
     * method allows you to discover which mappings are available for a given connector. If you want to use any of these
     * mappings, they will be available in the `context` parameter of any connector method.
     * @param connectorId unique id of the data connector
     * @returns connector mappings
     */
    getConfigurationOptions = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .dataConnectorGetConfigurationOptions(connectorId)
            .then((result) => getEditorResponseData<ConnectorConfigOptions>(result));
    };

    /**
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param connectorId unique id of the Data connector
     * @returns DataConnectorCapabilities
     */
    getCapabilities = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .dataConnectorGetCapabilities(connectorId)
            .then((result) => getEditorResponseData<DataConnectorCapabilities>(result));
    };
}
