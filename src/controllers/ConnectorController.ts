import { ConnectorRegistration } from '../../types/ConnectorTypes';
import { EditorAPI } from '../../types/CommonTypes';
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
    authentication: ConnectorAuthenticationController;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
        this.authentication = new ConnectorAuthenticationController(editorAPI);
    }

    /**
     * Registers a new connector in the SDK. After successfull registration, depending
     * on the connector type, the connector can be configured and used in the template
     * Remember to add custom authentication information after registering the connector
     * @param registration registration object containing all details about the connector
     */
    registerConnector = async (registration: ConnectorRegistration) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorRegisterConnector(JSON.stringify(registration))
            .then((result) => getEditorResponseData<null>(result));
    };
}

/**
 * The ConnectorAuthenticationController is responsible for authenticating regarding media connectors.
 * Methods inside this controller can be called by `window.SDK.mediaConnector.authentication.{method-name}`
 */
export class ConnectorAuthenticationController {
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
     * This method sets the CHILI GraFx Access Token in the Authentication HTTP header for the 'chili' authentication type.
     * The CHILI Token will be used to authenticate every grafx-media connector http call.
     * Can only be used after a connector has been registered.
     * @param connectorId unique Id of the media connector
     * @param token token for the CHILI authentication
     */
    setChiliToken = async (connectorId: string, token: string) => {
        const res = await this.#editorAPI;
        return res
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
        const res = await this.#editorAPI;
        return res
            .connectorAuthenticationSetHttpHeader(connectorId, headerName, headerValue)
            .then((result) => getEditorResponseData<null>(result));
    };
}
