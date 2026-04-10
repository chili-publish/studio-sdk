import { EditorAPI, EditorResponse } from '../types/CommonTypes';
import { ConnectorConfigOptions, MetaData } from '../types/ConnectorTypes';
import {
    BidirectionalDataPage,
    BidirectionalDataPageItem,
    BidirectionalNavigation,
    BidirectionalPageConfig,
    DataConnectorCapabilities,
    DataModel,
    DataPage,
    EditorDataPage,
    OneDirectionalNavigation,
    PageConfig,
    PageItemOptions,
} from '../types/DataConnectorTypes';
import { DataItemMappingTools, EngineDataItem } from '../utils/DataItemMappingTools';
import { getEditorResponseData } from '../utils/EditorResponseData';

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
    #editorAPI: EditorAPI;
    #dataItemMappingTools: DataItemMappingTools;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI, dataItemMappingTools: DataItemMappingTools) {
        this.#editorAPI = editorAPI;
        this.#dataItemMappingTools = dataItemMappingTools;
    }

    /**
     * Query a specific DataConnector for data using both specific PageConfig and the dynamic
     * context as parameters.
     * @param connectorId unique id of the Data connector
     * @param config bidirectional page configuration — provides `previousPageToken` / `continuationToken` navigation
     * @param context context that will be available in the connector script.
     * @returns a BidirectionalDataPage with an array of data objects and bidirectional navigation tokens
     */
    getPage(
        connectorId: string,
        config: BidirectionalPageConfig,
        context?: MetaData,
    ): Promise<EditorResponse<BidirectionalDataPage>>;

    /**
     * Query a specific DataConnector for data using both specific PageConfig and the dynamic
     * context as parameters.
     * @param connectorId unique id of the Data connector
     * @param config one-directional page configuration — provides a `continuationToken` for forward navigation
     * @param context context that will be available in the connector script.
     * @returns a DataPage with an array of data objects and a continuation token
     */
    getPage(connectorId: string, config: PageConfig, context?: MetaData): Promise<EditorResponse<DataPage>>;

    async getPage(
        connectorId: string,
        config: PageConfig | BidirectionalPageConfig,
        context: MetaData = {},
    ): Promise<EditorResponse<DataPage | BidirectionalDataPage>> {
        const { previousPageToken, continuationToken } = config as BidirectionalPageConfig;
        if (previousPageToken != null && continuationToken != null) {
            throw new Error(
                'Invalid page config: "previousPageToken" and "continuationToken" are mutually exclusive. Provide only one to indicate navigation direction.',
            );
        }

        const res = await this.#editorAPI;
        const result = await res.dataConnectorGetPage(connectorId, JSON.stringify(config), JSON.stringify(context));
        const resp =
            getEditorResponseData<EditorDataPage<EngineDataItem, OneDirectionalNavigation | BidirectionalNavigation>>(
                result,
            );
        const update: EditorResponse<DataPage | BidirectionalDataPage> = { ...resp, parsedData: null };
        if (resp.parsedData) {
            update.parsedData = {
                ...resp.parsedData,
                data: resp.parsedData.data.map((e: EngineDataItem) =>
                    this.#dataItemMappingTools.mapEngineToDataItem(e),
                ),
            } as DataPage | BidirectionalDataPage;
        }
        return update;
    }

    /**
     * @experimental This method is still experimental and might change in future releases.
     *
     * Retrieve a single data item by its identifier from a specific DataConnector.
     * Only available for connectors that set `DataConnectorCapabilities.dataSourceVariable = true`,
     * which implies support for both bidirectional page navigation and item-level lookup.
     * pageOptions (sorting, limit) are used by the connector to build navigation tokens.
     * @param connectorId unique id of the Data connector
     * @param id identifier of the item to retrieve
     * @param pageOptions sorting and limit used to build previousPageToken/continuationToken
     * @param context context that will be available in the connector script.
     * @returns a BidirectionalDataPageItem containing the data item and bidirectional navigation tokens
     */
    getPageItemById = async (
        connectorId: string,
        id: string,
        pageOptions: PageItemOptions,
        context: MetaData = {},
    ): Promise<EditorResponse<BidirectionalDataPageItem>> => {
        const res = await this.#editorAPI;
        const result = await res.dataConnectorGetPageItemById(
            connectorId,
            id,
            JSON.stringify(pageOptions),
            JSON.stringify(context),
        );
        const resp = getEditorResponseData<{ data: EngineDataItem } & BidirectionalNavigation>(result);
        const update: EditorResponse<BidirectionalDataPageItem> = { ...resp, parsedData: null };
        if (resp.parsedData) {
            update.parsedData = {
                ...resp.parsedData,
                data: this.#dataItemMappingTools.mapEngineToDataItem(resp.parsedData.data),
            };
        }
        return update;
    };

    /**
     * Query a specific DataConnector for a data model using the dynamic context as parameter.
     * @param connectorId unique id of the data connector
     * @param context context that will be available in the connector script.
     * @returns DataModel or DataSourceVariableDataModel
     */
    async getModel<R extends DataModel = DataModel>(
        connectorId: string,
        context: MetaData = {},
    ): Promise<EditorResponse<R>> {
        const res = await this.#editorAPI;
        return res
            .dataConnectorGetModel(connectorId, JSON.stringify(context))
            .then((result) => getEditorResponseData<R>(result));
    }

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
