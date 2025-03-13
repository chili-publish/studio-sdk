import {
    ConnectorGrafxRegistration,
    ConnectorInstance,
    ConnectorLocalRegistration,
    ConnectorType,
    ConnectorUrlRegistration,
} from '../types/ConnectorTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';
import { EditorAPI, EditorResponse, Id } from '../../types/CommonTypes';
import {
    ConnectorMappingDirection,
    ConnectorMappingType,
    ConnectorState,
    ConnectorStateType,
    ConnectorToEngineMapping,
    EngineToConnectorMapping,
} from '../../types/ConnectorTypes';

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

    /**
     * Gets the mapped data from connector.
     * @param id the id of your registered connector
     * @param direction the mapping direction
     * @returns mappings
     */
    async getMappings(
        id: string,
        direction: ConnectorMappingDirection.engineToConnector,
    ): Promise<EditorResponse<EngineToConnectorMapping[]>>;

    async getMappings(
        id: string,
        direction: ConnectorMappingDirection.connectorToEngine,
    ): Promise<EditorResponse<ConnectorToEngineMapping[]>>;

    async getMappings(id: string, direction?: undefined): Promise<EditorResponse<ConnectorMappingType[]>>;

    async getMappings(id: string, direction?: ConnectorMappingDirection) {
        const res = await this.#editorAPI;
        return res
            .getConnectorMappings(id)
            .then((result) => getEditorResponseData<ConnectorMappingType[]>(result))
            .then((result) =>
                !direction
                    ? result
                    : {
                          ...result,
                          parsedData: result.parsedData?.filter((cm) => cm.direction === direction),
                      },
            );
    }

    /**
     * Gets the current state a connector is in, to wait until a connector is ready to be used, use the 'waitToBeReady'
     * method in this controller.
     * @param id the id of your registered connector you want to make sure it is loaded
     * @returns connector state
     */
    getState = async (id: Id) => {
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
    waitToBeReady = async (id: Id, timeoutMilliseconds = 2000): Promise<EditorResponse<null>> => {
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
                const result = await this.getState(id);

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

    /**
     * Allows to map variables or strings to connector context data.
     * By defining the mappings, we can trigger re-download of assets (dynamic asset provider)
     * or populate filters for the query endpoint. The mapped data will be available using
     * the context parameter in the connector implementation code.
     *
     * For the variables the mapping should follow the format "var.[variable id]". e.g. var.6B29FC40-CA47-1067-B31D-00DD010662DA
     *
     * @param mappings collection of mappings to set to this connector
     * @returns
     */
    setConnectorMappings = async (connectorId: string, mappings: ConnectorMappingType[]) => {
        const res = await this.#editorAPI;
        const result = await res.setConnectorMappings(
            connectorId,
            mappings.map(function (m) {
                return JSON.stringify(m);
            }),
        );
        return getEditorResponseData<null>(result);
    };

    setMappings = async (connectorId: string, mappings: Array<{ key: string; variable: string }>) => {
        const res = await this.#editorAPI;
        await this.waitToBeReady(connectorId);
        const { parsedData: engineToConnectorMappings } = await this.getMappings(
            connectorId,
            ConnectorMappingDirection.engineToConnector,
        );

        const connectorToEngineMappings = mappings
            .filter(({ key, variable }) => key !== '' && variable !== '')
            .map(({ key, variable }) => ({
                name: key,
                value: variable,
                direction: ConnectorMappingDirection.connectorToEngine,
            }));

        const combinedMappings = [
            ...(engineToConnectorMappings as unknown as ConnectorToEngineMapping[]),
            ...connectorToEngineMappings,
        ];

        await this.setConnectorMappings(connectorId, combinedMappings);
        return res.updateConnectorConfiguration(connectorId).then((result) => getEditorResponseData<null>(result));
    };
}
