import { ConnectorOptions, EditorAPI, EditorResponse, Id } from '../types/CommonTypes';
import {
    ConnectorState,
    ConnectorStateType,
    ConnectorMapping,
    ConnectorRegistration,
    ConnectorInstance,
    ConnectorType,
} from '../types/ConnectorTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ConnectorController manages lifetime of all available connectors, regardless of the type, in the
 * document. Use it to add/remove connectors to a template, or set specific configuration.
 *
 * The way CHILI Studio handles different sources of resources is called 'Connectors'. A Connectors is an
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
     * Gets all available connectors of a 'ConnectorType'
     * @param type type of connector you want to get
     * @returns list of all available connectors of a 'ConnectorType'
     */
    getAllByType = async (type: ConnectorType) => {
        const res = await this.#editorAPI;
        return res.getConnectors(type).then((result) => getEditorResponseData<ConnectorInstance[]>(result));
    };

    /**
     * Registers a new connector in the SDK. After successful registration, depending
     * on the connector type, the connector can be configured and used in the template
     * Remember to add custom authentication information after registering the connector
     * @param registration registration object containing all details about the connector
     * @returns the Id of the newly created connector, this Id should be used going forward.
     */
    register = async (registration: ConnectorRegistration) => {
        const res = await this.#editorAPI;
        return res.registerConnector(JSON.stringify(registration)).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * Unregisters a connector from the document.
     * @param id the id of the connector to unregister
     * @returns
     */
    unregister = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.unregisterConnector(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Configures a registered connector. A configurator helper is passed as an argument
     * of the callback for you to setup your connector.
     * @param id the id of your registered connector
     * @param configurationCallback callback to setup the connector
     * @returns
     */
    configure = async (id: string, configurationCallback: (configurator: ConnectorConfigurator) => Promise<void>) => {
        const res = await this.#editorAPI;
        // wait for connector to be ready
        await this.waitToBeReady(id);
        // execute callback
        await configurationCallback(new ConnectorConfigurator(id, res));
        // invalidate connector in engine
        return res.updateConnectorConfiguration(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Gets the current state a connector is in, to wait until a connector is ready to be used, use the 'waitForConnectorReady'
     * method in this controller.
     * @param id the id of your registered connector you want to make sure it is loaded
     * @returns connector state
     */
    getById = async (id: string) => {
        const res = await this.#editorAPI;
        return res.getConnectorState(id).then((result) => getEditorResponseData<ConnectorState>(result));
    };

    /**
     * Connectors are loaded asynchronously in the editor engine, this causes some challenges while configuring them. To make sure
     * an action on the connector will be available, it's advised to await this method. After the Promise resolves we are sure
     * the connector is up and running. This is used internally by the configure method to ensure correct execution. It's especially
     * useful during startup of the SDK / right after the loadDocument call.
     * @param id the id of your registered connector you want to make sure it is loaded
     * @returns
     */
    waitToBeReady = async (id: string, timeoutMilliseconds = 2000): Promise<EditorResponse<null>> => {
        // minimum timeout is 500ms
        let timeout = Math.max(timeoutMilliseconds, 500);

        // maximum timeout is 5000ms
        timeout = Math.min(timeout, 5000);

        const waitTime = 100;
        let retries = 0;

        try {
            // using while loop will prevent stack overflow issues when using recursion
            // wait for maximum 2 seconds to fail
            while (retries * waitTime < timeout) {
                const result = await this.getById(id);

                if (
                    result.success &&
                    result.parsedData &&
                    (result.parsedData.type === ConnectorStateType.running ||
                        result.parsedData.type === ConnectorStateType.ready)
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
    constructor(id: string, res: EditorAPI) {
        this.#connectorId = id;
        this.#res = res;
    }

    /**
     * Allows to customize the context data a connector can work with. The options data
     * will be available using the context parameter in the connector implementation code.
     * @param options object containing key value data to pass to connector context
     * @returns
     */
    setOptions = async (options: ConnectorOptions) => {
        return this.#res
            .setConnectorOptions(this.#connectorId, JSON.stringify(options))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Allows to map document data (variables, selectedFrame, etc) to connector context data.
     * By defining the mappings, we can trigger re-download of assets (dynamic asset provider)
     * or populate filters for the query endpoint. The mapped data will be available using
     * the context parameter in the connector implementation code.
     * @param mappings collection of mappings to set to this connector
     * @returns
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
     * @deprecated define the GraFx Studio Auth Token in the `SDK.Configuration.setValue`
     *
     * This method sets the GraFx Access Token in the Authentication HTTP header for the 'chili' authentication type.
     * The CHILI Token will be used to authenticate every grafx connector http call.
     * @param token token for the CHILI authentication
     * @returns
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
     * @returns
     */
    setHttpHeader = async (headerName: string, headerValue: string) => {
        return this.#res
            .connectorAuthenticationSetHttpHeader(this.#connectorId, headerName, headerValue)
            .then((result) => getEditorResponseData<null>(result));
    };
}
