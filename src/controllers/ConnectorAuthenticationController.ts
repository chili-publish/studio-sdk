import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

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
