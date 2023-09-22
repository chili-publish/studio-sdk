import { ConnectorConfigOptions, EditorAPI, EditorRawAPI, EditorResponse, MetaData } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import {
    ConnectorCapabilities,
    DeprecatedMediaType,
    MediaType,
    QueryOptions,
    QueryPage,
} from '../types/ConnectorTypes';
import { FontFamily, FontPreviewFormat, FontStyle } from '../types/FontConnectorTypes';
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
     * @param queryOptions query options
     * @param context context that will be available in the connector script.
     * @returns array of font families
     */
    query = async (id: string, queryOptions: QueryOptions, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorQuery(id, JSON.stringify(queryOptions), JSON.stringify(context))
            .then((result) => getEditorResponseData<QueryPage<FontFamily>>(result));
    };

    /**
     * Returns font styles using a specific FontConnector. The connector needs to list `detail` as a supported capability.
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font
     * @param context context that will be available in the connector script.
     * @returns font details
     */
    detail = async (id: string, fontId: string, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorDetail(id, fontId, JSON.stringify(context))
            .then((result) => getEditorResponseData<FontStyle[]>(result));
    };

    /**
     * The combination of a `connectorId` and `fontId` is typically enough for a Font connector to
     * perform the download of this asset. The `download` endpoint is capable of relaying this information to the
     * Font connector instance running in the editor engine.
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to download
     * @param context context that will be available in the connector script.
     * @returns
     */
    download = async (id: string, fontId: string, context: MetaData = {}): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .fontConnectorDownload(id, fontId, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * The combination of a `connectorId` and `fontId` is typically enough for a Font connector to
     * perform the preview of this asset. The `preview` endpoint is capable of relaying this information to the
     * Font connector instance running in the editor engine.
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to download
     * @param previewFormat hint to the Font connector about desired format of the downloaded Font
     * @param context dynamic map of additional options potentially used by the connector
     * @returns
     */
    preview = async (
        id: string,
        fontId: string,
        previewFormat: FontPreviewFormat,
        context: MetaData = {},
    ): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .fontConnectorPreview(id, fontId, previewFormat, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * Depending on the connector capabilities, this api method allows you to upload new Font to the
     * connector's backend.
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to upload
     * @param blob byte array representation of the Font to upload
     * @param context context that will be available in the connector script.
     * @returns
     */
    upload = async (id: string, fontId: string, blob: Uint8Array, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorUpload(id, fontId, blob, JSON.stringify(context))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, removes Font identified by `fontId` from the connector's backend storage
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to download
     * @param context context that will be available in the connector script.
     * @returns
     */
    remove = async (id: string, fontId: string, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorRemove(id, fontId, JSON.stringify(context))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, copies Font identified by `fontId` to a new Font item on the
     * connector's backend
     * @param id unique id of the Font connector
     * @param fontId unique id of the Font to download
     * @param newName name of the copied Font on the connector's backend
     * @param context context that will be available in the connector script.
     * @returns
     */
    copy = async (id: string, fontId: string, newName: string, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorCopy(id, fontId, newName, JSON.stringify(context))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * All connectors have a certain set of mappings they allow to be passed into the connector methods their context. This
     * method allows you to discover which mappings are available for a given connector. If you want to use any of these
     * mappings, they will be available in the `context` parameter of any connector method.
     * @param id unique id of the media connector
     * @returns connector mappings
     */
    getConfigurationOptions = async (id: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetConfigurationOptions(id)
            .then((result) => getEditorResponseData<ConnectorConfigOptions>(result));
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
