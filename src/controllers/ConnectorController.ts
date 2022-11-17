import { ConnectorOptions, EditorAPI, EditorResponse } from '../../types/CommonTypes';
import {
    ConnectorEvent,
    ConnectorEventType,
    ConnectorMapping,
    ConnectorRegistration,
} from '../../types/ConnectorTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ConnectorController manages lifetime of all available connectors, regardless of the type, in the
 * document. Use it to add/remove connectors to a template, or set specific configuration.
 *
 * The way CHILI Studio handles different sources of resouces is called 'Connectors'. A Connectors is an
 * implementation of a set of capabilities we need to interact with a certain external resource management system.
 * In essence a connector is the combination of a Javascript snippet and some metadata. The Javascript snippet
 * is loaded in the studio engine using a sandboxed Javascript execution engine (QuickJs). This allows us to
 * execute the media connector both on web using webassembly and on the server side during e.g. animation output
 * generation.
 * This controller is an interface to the running connector instance inside the studio engine. The engine will
 * automatically register the 'grafx-media' and 'grafx-font' connectors. Custom connectors need to be registered
 * manually.
 */
export class ConnectorController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * Registers a new connector in the SDK. After successful registration, depending
     * on the connector type, the connector can be configured and used in the template
     * Remember to add custom authentication information after registering the connector
     * @param registration registration object containing all details about the connector
     */
    registerConnector = async (registration: ConnectorRegistration) => {
        const res = await this.#editorAPI;
        return res
            .registerConnector(JSON.stringify(registration))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Configures a registered connector. A configurator helper is passed as an argument
     * of the callback for you to setup your connector.
     * @param connectorId Id of your registered connector
     * @param configurationCallback callback to setup the connector
     */
    configure = async (
        connectorId: string,
        configurationCallback: (configurator: ConnectorConfigurator) => Promise<void>,
    ) => {
        const res = await this.#editorAPI;
        // wait for connector to be ready
        await this.waitForConnectorReady(connectorId);
        // execute callback
        await configurationCallback(new ConnectorConfigurator(connectorId, res));
        // invalidate connector in engine
        return res.updateConnectorConfiguration(connectorId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Gets the current state a connector is in, to wait until a connector is ready to be used, use the 'waitForConnectorReady'
     * method in this controller.
     * @param connectorId Id of your registered connector you want to make sure it is loaded
     */
    getState = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res.getConnectorState(connectorId).then((result) => getEditorResponseData<ConnectorEvent>(result));
    };

    /**
     * Connectors are loaded asynchronously in the editor engine, this causes some challenges while configuring them. To make sure
     * an action on the connector will be available, it's advised to await this method. After the Promise resolves we are sure
     * the connector is up and running. This is used internally by the configure method to ensure correct execution. It's especially
     * usefull during startup of the SDK / rigth after the loadDocument call.
     * @param connectorId Id of your registered connector you want to make sure it is loaded
     */
    waitForConnectorReady = async (connectorId: string, timeoutMilliseconds = 2000): Promise<EditorResponse<null>> => {
        // minimum timeout is 500ms
        let timeout = Math.max(timeoutMilliseconds, 500);

        // maximum timeout is 5000ms
        timeout = Math.min(timeout, 5000);

        const waitTime = 100;
        let retries = 0;

        try {
            // using while loop will prevent stackoverflow issues when using recursion
            // wait for maximum 2 seconds to fail
            while (retries * waitTime < timeout) {
                const result = await this.getState(connectorId);

                if (
                    result.success &&
                    result.parsedData &&
                    result.parsedData.type !== ConnectorEventType.error &&
                    result.parsedData.type !== ConnectorEventType.loading
                ) {
                    return getEditorResponseData<null>(
                        { data: null, success: true, error: undefined, status: 0, parsedData: undefined },
                        false,
                    );
                }

                await new Promise((resolve) => setTimeout(resolve, waitTime));
                retries++;
            }
        } catch (err) {
            return getEditorResponseData<null>(
                {
                    data: null,
                    success: false,
                    error: `Error while getting connector state ${err}`,
                    status: 50000,
                    parsedData: undefined,
                },
                false,
            );
        }

        return getEditorResponseData<null>(
            {
                data: null,
                success: false,
                error: `Timed out waiting for connector`,
                status: 50000,
                parsedData: undefined,
            },
            false,
        );
    };
}

/**
 * Helper to setup your connector
 */
class ConnectorConfigurator {
    /**
     * @ignore
     */
    #connectorId: string;
    #res: EditorAPI;

    /**
     * @ignore
     */
    constructor(connectorId: string, res: EditorAPI) {
        this.#connectorId = connectorId;
        this.#res = res;
    }

    /**
     * Allows to customize the context data a connector can work with. The options data
     * will be available using the context parameter in the connector implementation code.
     * @param options object containing key value data to pass to connector context
     */
    setOptions = async (options: ConnectorOptions) => {
        return this.#res
            .setConnectorOptions(this.#connectorId, JSON.stringify(options))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Allows to map document data (variables, selectedFrame, etc) to connector context data.
     * By defining the mappings, we can trigger redownload of assets (dynamic asset provider)
     * or populate filters for the query endpoint. The mapped data will be available using
     * the context parameter in the connector implementation code.
     * @param mappings collection of mappings to set to this connector
     */
    setMappings = async (mappings: ConnectorMapping[]) => {
        const result = await this.#res.setConnectorMappings(
            this.#connectorId,
            mappings.map(function (m) {
                return JSON.stringify(m);
            }),
        );
        return getEditorResponseData<null>(result);
    };

    /**
     * This method sets the CHILI GraFx Access Token in the Authentication HTTP header for the 'chili' authentication type.
     * The CHILI Token will be used to authenticate every grafx connector http call.
     * @param token token for the CHILI authentication
     */
    setChiliToken = async (token: string) => {
        return this.#res
            .connectorAuthenticationSetChiliToken(this.#connectorId, token)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the HTTP headers for the 'staticKey' authentication type.
     * These additional headers will be added to all connector http calls.
     * Can only be used after a connector has been registered. (if you are using a grafx connector no registration is needed)
     * @param headerName name of the header
     * @param headerValue value of the header
     */
    setHttpHeader = async (headerName: string, headerValue: string) => {
        return this.#res
            .connectorAuthenticationSetHttpHeader(this.#connectorId, headerName, headerValue)
            .then((result) => getEditorResponseData<null>(result));
    };
}
