import { EditorAPI } from '../../types/CommonTypes';
import { ConnectorRegistration } from '../../types/ConnectorTypes';
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
 * This controller is an interface to the running connector instance inside the studio engine.
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
    configure = async (connectorId: string, configurationCallback: (configurator: ConnectorConfigurator) => Promise<void>) => {
        const res = await this.#editorAPI;
        await configurationCallback(new ConnectorConfigurator(connectorId, res));
        return res.updateConnectorConfiguration(connectorId).then((result) => getEditorResponseData<null>(result));
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

    // Future-proofing
    // setOptions = async (options: ConnectorOptions) => {
    //     return this.#res
    //         .setConnectorOptions(this.#connectorId, JSON.stringify(options))
    //         .then((result) => getEditorResponseData<null>(result));
    // };

    // Future-proofing
    // setMappings = async (mappings: Array<ConnectorMapping>) => {
    //     const result = await this.#res
    //         .setConnectorMappings(this.#connectorId, JSON.stringify(mappings));
    //     return getEditorResponseData<null>(result);
    // };

    /**
     * This method sets the CHILI GraFx Access Token in the Authentication HTTP header for the 'chili' authentication type.
     * The CHILI Token will be used to authenticate every grafx-media connector http call.
     * Can only be used after a connector has been registered.
     * @param connectorId unique Id of the media connector
     * @param token token for the CHILI authentication
     */
    setChiliToken = async (connectorId: string, token: string) => {
        return this.#res
            .connectorAuthenticationSetChiliToken(connectorId, token)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the HTTP headers for the 'staticKey' authentication type.
     * These additional headers will be added to all connector http calls.
     * Can only be used after a connector has been registered.
     * @param connectorId unique Id of the media connector
     * @param headerName name of the header
     * @param headerValue value of the header
     */
    setHttpHeader = async (connectorId: string, headerName: string, headerValue: string) => {
        return this.#res
            .connectorAuthenticationSetHttpHeader(connectorId, headerName, headerValue)
            .then((result) => getEditorResponseData<null>(result));
    };
};