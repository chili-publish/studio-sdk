import { ConnectorOptions, EditorAPI, EditorRawAPI, EditorResponse, MetaData } from '../../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { DeprecatedMediaType, ConnectorCapabilities, MediaType, QueryOptions } from '../../types/ConnectorTypes';
import { FontDownloadType, FontPage } from '../../types/FontConnectorTypes';
import { CallSender } from 'penpal';

/**
 * The FontConnectorController is responsible for all communication regarding Font connectors.
 * Methods inside this controller can be called by `window.SDK.FontConnector.{method-name}`
 *
 * The way CHILI Studio handles different sources of Font is called 'FontConnectors'. A FontConnectors is an
 * implementation of a set of capabilities we need to interact with a certain Digital Asset Management system.
 * In essence a connector is the combination of a Javascript snippet and some metadata. The Javascript snippet
 * is loaded in the studio engine using a sandboxed Javascript execution engine (QuickJs). This allows us to
 * execute the Font connector both on web using webassembly and on the server side during e.g. animation output
 * generation.
 * This controller is an interface to the running connector instance inside the studio engine.
 */
export class FontConnectorController {
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
     * Query a specific FontConnector for data using both standardized queryOptions and the dynamic
     * context as parameters. This call returns an array of Font items.
     * @param connectorId unique Id of the Font connector
     * @param queryOptions stringified instance of `QueryOptions`
     * @param context stringified `Map<string, string>` of dynamic options
     */
    query = async (connectorId: string, queryOptions: QueryOptions, context: MetaData) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorQuery(connectorId, JSON.stringify(queryOptions), JSON.stringify(context))
            .then((result) => getEditorResponseData<FontPage>(result));
    };

    /**
     * The combination of a `connectorId` and `FontId` is typically enough for a Font connector to
     * perform the download of this asset. The `download` endpoint is capable of relaying this information to the
     * Font connector instance running in the editor engine.
     * @param connectorId unique Id of the Font connector
     * @param FontId unique Id of the Font to download
     * @param downloadType hint to the Font connector about desired quality of the downloaded Font
     * @param context dynamic map of additional options potentially used by the connector
     */
    download = async (
        connectorId: string,
        FontId: string,
        downloadType: FontDownloadType,
        context: MetaData,
    ): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .fontConnectorDownload(connectorId, FontId, downloadType, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * Depending on the connector capabilities, this api method allows you to upload new Font to the
     * connector's backend.
     * @param connectorId unique Id of the Font connector
     * @param FontId unique Id of the Font to upload
     * @param blob byte array representation of the Font to upload
     */
    upload = async (connectorId: string, FontId: string, blob: Uint8Array) => {
        const res = await this.#editorAPI;
        return res.fontConnectorUpload(connectorId, FontId, blob).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, removes Font identified by `FontId` from the connector's backend storage
     * @param connectorId unique Id of the Font connector
     * @param FontId unique Id of the Font to download
     */
    remove = async (connectorId: string, FontId: string) => {
        const res = await this.#editorAPI;
        return res.fontConnectorRemove(connectorId, FontId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, copies Font identified by `FontId` to a new Font item on the
     * connector's backend
     * @param connectorId unique Id of the Font connector
     * @param FontId unique Id of the Font to download
     * @param newName name of the copied Font on the connector's backend
     */
    copy = async (connectorId: string, FontId: string, newName: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorCopy(connectorId, FontId, newName)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * All connectors have a certain set of queryOptions they allow to be passed in the query context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `query` api method.
     * @param connectorId unique Id of the Font connector
     */
    getQueryOptions = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetQueryOptions(connectorId)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * All connectors have a certain set of downloadOptions they allow to be passed in the download context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `download` api method.
     * @param connectorId unique Id of the Font connector
     */
    getDownloadOptions = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetDownloadOptions(connectorId)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param connectorId unique Id of the Font connector
     */
    getCapabilities = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetCapabilities(connectorId)
            .then((result) => getEditorResponseData<ConnectorCapabilities>(result));
    };

    /**
     * This method will parse the deprecatedFontType to the new Font type. This method will be removed once the deprecatedFontType is out of use
     * @param deprecatedType is 0 or 1
     */
    parseDeprecatedFontType = (deprecatedType: DeprecatedMediaType) => {
        if (deprecatedType === DeprecatedMediaType.file) return MediaType.file;
        if (deprecatedType === DeprecatedMediaType.collection) return MediaType.collection;
    };
}