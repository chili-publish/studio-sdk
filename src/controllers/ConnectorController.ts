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

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * Registers a new connector in the SDK. After successfull registration, depending
     * on the connector type, the connector can be configured and used in the template
     * Remember to add custom authentication information after registering the connector
     * @param ConnectorRegistration registration object containing all details about the connector
     */
    registerConnector = async (registration: ConnectorRegistration) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorRegisterConnector(JSON.stringify(registration))
            .then((result) => getEditorResponseData<null>(result));
    };
}
