import {
    ConnectorGrafxRegistration,
    ConnectorInstance,
    ConnectorLocalRegistration,
    ConnectorType,
    ConnectorUrlRegistration,
} from '../types/ConnectorTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';
import { EditorAPI, Id } from '../../types/CommonTypes';

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
    #editorAPI: Promise<EditorAPI>;

    /**
     * @ignore
     */
    constructor(editorAPI: Promise<EditorAPI>) {
        this.#editorAPI = editorAPI;
    }

    /**
     * Registers a new connector in the SDK. After successful registration, depending
     * on the connector type, the connector can be configured and used in the template
     * Remember to add custom authentication information after registering the connector
     * @param registration registration object containing all details about the connector
     * @returns the Id of the newly created connector, this Id should be used going forward.
     */
    register = async (
        registration: ConnectorGrafxRegistration | ConnectorUrlRegistration | ConnectorLocalRegistration,
    ) => {
        const res = await this.#editorAPI;

        return res.registerConnector(JSON.stringify(registration)).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * Gets a connector by its id
     * @param id the id of the connector
     * @returns connector
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getConnectorById(id).then((result) => getEditorResponseData<ConnectorInstance>(result));
    };

    /**
     * Gets all available connectors of a 'ConnectorType'
     * @param type type of connector you want to get
     * @returns list of all available connectors of a 'ConnectorType'
     */
    getAllByType = async (type: ConnectorType) => {
        const res = await this.#editorAPI;
        return res.getConnectors(type).then((result) => getEditorResponseData<ConnectorInstance[]>(result));
    };
}
