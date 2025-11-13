import { CallSender } from 'penpal';
import { EditorAPI, EditorRawAPI, EditorResponse } from '../types/CommonTypes';
import { Component, ComponentConnectorCapabilities, ComponentPreviewType } from '../types/ComponentConnectorTypes';
import { ConnectorConfigOptions, MetaData, QueryOptions, QueryPage } from '../types/ConnectorTypes';
import { getEditorResponseData, throwEditorResponseError } from '../utils/EditorResponseData';

/**
 * @experimental This controller is still experimental and might change in future releases.
 *
 * The ComponentConnectorController is responsible for all communication regarding Component connectors.
 * Methods inside this controller can be called by `window.SDK.componentConnector.{method-name}`
 *
 * The way GraFx Studio handles different sources of Component is called 'ComponentConnector'.
 * A ComponentConnector is an implementation of a set of capabilities we need
 * to interact with a certain Component Asset Management system.
 * In essence, a connector is the combination of a JavaScript snippet and some metadata.
 * The JavaScript snippet is loaded in the studio engine using a sandboxed JavaScript execution engine (QuickJs).
 * This allows us to execute the Component connector
 * both on web using webassembly and on the server side during output generation.
 * This controller is an interface to the running connector instance inside the studio engine.
 */
export class ComponentConnectorController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;
    #blobAPI: EditorRawAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
        this.#blobAPI = editorAPI as CallSender as EditorRawAPI;
    }

    /**
     * @experimental This method is still experimental and might change in future releases.
     * Query a specific ComponentConnector for data using both standardized queryOptions and the dynamic
     * context as parameters.
     * @param connectorId unique id of the Component connector
     * @param queryOptions query options
     * @param context context that will be available in the connector script.
     * @returns array of component instances
     */
    query = async (connectorId: string, queryOptions: QueryOptions, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .componentConnectorQuery(connectorId, JSON.stringify(queryOptions), JSON.stringify(context))
            .then((result) => getEditorResponseData<QueryPage<Component>>(result));
    };

    /**
     * @experimental This method is still experimental and might change in future releases.
     * The combination of a `connectorId` and `componentId` is typically enough for a Component connector to
     * perform the preview of this asset. The `preview` endpoint is capable of relaying this information to the
     * Component connector instance running in the editor engine.
     * @param connectorId unique id of the Component connector
     * @param componentId unique id of the Component to download
     * @param previewType hint to the Component connector about desired format of the Component preview
     * @param context dynamic map of additional options potentially used by the connector
     * @returns
     */
    preview = async (
        connectorId: string,
        componentId: string,
        previewType: ComponentPreviewType,
        context: MetaData = {},
    ): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .componentConnectorPreview(connectorId, componentId, previewType, JSON.stringify(context))
            .then((result) => {
                // Handle binary data (Uint8Array) directly
                if (result instanceof Uint8Array) {
                    return result;
                }

                // Handle structured response (EditorResponse) for non-success cases
                if (typeof result === 'object' && result !== null && 'success' in result && !result.success) {
                    throwEditorResponseError(result as EditorResponse<null>);
                }

                // Unexpected response type - throw error
                throw new Error(`Unexpected response type: ${typeof result}.`);
            });
    };

    /**
     * @experimental This method is still experimental and might change in future releases.
     * All connectors have a certain set of mappings they allow to be passed into the connector methods their context. This
     * method allows you to discover which mappings are available for a given connector. If you want to use any of these
     * mappings, they will be available in the `context` parameter of any connector method.
     * @param connectorId unique id of the component connector
     * @returns connector mappings
     */
    getConfigurationOptions = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .componentConnectorGetConfigurationOptions(connectorId)
            .then((result) => getEditorResponseData<ConnectorConfigOptions>(result));
    };

    /**
     * @experimental This method is still experimental and might change in future releases.
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param connectorId unique id of the component connector
     * @returns ComponentConnectorCapabilities
     */
    getCapabilities = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .componentConnectorGetCapabilities(connectorId)
            .then((result) => getEditorResponseData<ComponentConnectorCapabilities>(result));
    };
}
