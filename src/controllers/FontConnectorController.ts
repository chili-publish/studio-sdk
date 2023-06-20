import { ConnectorOptions, EditorAPI, EditorRawAPI, EditorResponse, MetaData } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import {
    DeprecatedMediaType,
    ConnectorCapabilities,
    MediaType,
    QueryOptions,
    QueryPage,
} from '../types/ConnectorTypes';
import { Font, FontDownloadType } from '../types/FontConnectorTypes';
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
     * @param id unique id of the Font connector
     * @param queryOptions stringified instance of `QueryOptions`
     * @param context stringified `Map<string, string>` of dynamic options
     * @returns array of font items
     */
    query = async (id: string, queryOptions: QueryOptions, context: MetaData) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorQuery(id, JSON.stringify(queryOptions), JSON.stringify(context))
            .then((result) => getEditorResponseData<QueryPage<Font>>(result));
    };

    /**
     * Returns a single font using a specific FontConnector. The connector needs to list `detail` as a supported capability.
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font
     * @returns font details
     */
    detail = async (id: string, fontId: string) => {
        const res = await this.#editorAPI;
        return res.fontConnectorDetail(id, fontId).then((result) => getEditorResponseData<Font>(result));
    };

    /**
     * The combination of a `connectorId` and `fontId` is typically enough for a Font connector to
     * perform the download of this asset. The `download` endpoint is capable of relaying this information to the
     * Font connector instance running in the editor engine.
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to download
     * @param downloadType hint to the Font connector about desired quality of the downloaded Font
     * @param context dynamic map of additional options potentially used by the connector
     * @returns
     */
    download = async (
        id: string,
        fontId: string,
        downloadType: FontDownloadType,
        context: MetaData,
    ): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .fontConnectorDownload(id, fontId, downloadType, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * Depending on the connector capabilities, this api method allows you to upload new Font to the
     * connector's backend.
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to upload
     * @param blob byte array representation of the Font to upload
     * @returns
     */
    upload = async (id: string, fontId: string, blob: Uint8Array) => {
        const res = await this.#editorAPI;
        return res.fontConnectorUpload(id, fontId, blob).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, removes Font identified by `fontId` from the connector's backend storage
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to download
     * @returns
     */
    remove = async (id: string, fontId: string) => {
        const res = await this.#editorAPI;
        return res.fontConnectorRemove(id, fontId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, copies Font identified by `fontId` to a new Font item on the
     * connector's backend
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to download
     * @param newName name of the copied Font on the connector's backend
     * @returns
     */
    copy = async (id: string, fontId: string, newName: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorCopy(id, fontId, newName)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * All connectors have a certain set of queryOptions they allow to be passed in the query context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `query` api method.
     * @param id unique id of the Font connector
     * @returns query options
     */
    getQueryOptions = async (id: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetQueryOptions(id)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * All connectors have a certain set of downloadOptions they allow to be passed in the download context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `download` api method.
     * @param id unique id of the Font connector
     * @returns download options
     */
    getDownloadOptions = async (id: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetDownloadOptions(id)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param id unique id of the Font connector
     * @returns connector capabilities
     */
    getCapabilities = async (id: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetCapabilities(id)
            .then((result) => getEditorResponseData<ConnectorCapabilities>(result));
    };

    /**
     * This method will parse the deprecatedFontType to the new Font type. This method will be removed once the deprecatedFontType is out of use
     * @param deprecatedType is 0 or 1
     * @returns MediaType value
     */
    parseDeprecatedFontType = (deprecatedType: DeprecatedMediaType) => {
        if (deprecatedType === DeprecatedMediaType.file) return MediaType.file;
        if (deprecatedType === DeprecatedMediaType.collection) return MediaType.collection;
    };
}
