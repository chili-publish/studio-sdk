import { ConnectorOptions, EditorAPI, EditorRawAPI, EditorResponse, Id, MetaData } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import {
    DeprecatedMediaType,
    ConnectorCapabilities,
    MediaType,
    QueryOptions,
    QueryPage,
} from '../types/ConnectorTypes';
import { CallSender } from 'penpal';
import { Media, MediaDownloadType } from '../types/MediaConnectorTypes';

/**
 * The MediaConnectorController is responsible for all communication regarding media connectors.
 * Methods inside this controller can be called by `window.SDK.mediaConnector.{method-name}`
 *
 * The way CHILI Studio handles different sources of media is called 'MediaConnectors'. A MediaConnectors is an
 * implementation of a set of capabilities we need to interact with a certain Digital Asset Management system.
 * In essence a connector is the combination of a Javascript snippet and some metadata. The Javascript snippet
 * is loaded in the studio engine using a sandboxed Javascript execution engine (QuickJs). This allows us to
 * execute the media connector both on web using webassembly and on the server side during e.g. animation output
 * generation.
 * This controller is an interface to the running connector instance inside the studio engine.
 */
export class MediaConnectorController {
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
     * Query a specific MediaConnector for data using both standardized queryOptions and the dynamic
     * context as parameters. This call returns an array of Media items.
     * @param id unique id of the media connector
     * @param queryOptions stringified instance of `QueryOptions`
     * @param context stringified `Map<string, string>` of dynamic options
     * @returns array of Media items
     */
    query = async (id: Id, queryOptions: QueryOptions, context: MetaData) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorQuery(id, JSON.stringify(queryOptions), JSON.stringify(context))
            .then((result) => getEditorResponseData<QueryPage<Media>>(result));
    };

    /**
     * Returns a single media using a specific MediaConnector.
     *
     * The connector needs to list `detail` as a supported capability.
     * @param id unique id of the Media connector
     * @param mediaId unique id of the Media
     * @returns Media item
     */
    detail = async (id: Id, mediaId: string) => {
        const res = await this.#editorAPI;
        return res.mediaConnectorDetail(id, mediaId).then((result) => getEditorResponseData<Media>(result));
    };

    /**
     * The combination of a `connectorId` and `mediaId` is typically enough for a media connector to
     * perform the download of this asset. The `download` endpoint is capable of relaying this information to the
     * media connector instance running in the editor engine.
     * @param id unique id of the media connector
     * @param mediaId unique id of the media to download
     * @param downloadType hint to the media connector about desired quality of the downloaded media
     * @param context dynamic map of additional options potentially used by the connector
     * @returns
     */
    download = async (
        id: Id,
        mediaId: Id,
        downloadType: MediaDownloadType,
        context: MetaData,
    ): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .mediaConnectorDownload(id, mediaId, downloadType, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * Depending on the connector capabilities, this api method allows you to upload new media to the
     * connector's backend.
     * @param id unique id of the media connector
     * @param mediaId unique id of the media to upload
     * @param blob byte array representation of the media to upload
     * @returns
     */
    upload = async (id: Id, mediaId: Id, blob: Uint8Array) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorUpload(id, mediaId, blob)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, removes media identified by `mediaId` from the connector's backend storage
     * @param id unique id of the media connector
     * @param mediaId unique id of the media to download
     * @returns
     */
    remove = async (id: Id, mediaId: Id) => {
        const res = await this.#editorAPI;
        return res.mediaConnectorRemove(id, mediaId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, copies media identified by `mediaId` to a new media item on the
     * connector's backend
     * @param id unique id of the media connector
     * @param mediaId unique id of the media to download
     * @param newName name of the copied media on the connector's backend
     * @returns
     */
    copy = async (id: Id, mediaId: Id, newName: string) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorCopy(id, mediaId, newName)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * All connectors have a certain set of queryOptions they allow to be passed in the query context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `query` api method.
     * @param id unique id of the media connector
     * @returns query options
     */
    getQueryOptions = async (id: Id) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorGetQueryOptions(id)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * All connectors have a certain set of downloadOptions they allow to be passed in the download context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `download` api method.
     * @param id unique id of the media connector
     * @returns download options
     */
    getDownloadOptions = async (id: Id) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorGetDownloadOptions(id)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param id unique id of the media connector
     * @returns connector capabilities
     */
    getCapabilities = async (id: Id) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorGetCapabilities(id)
            .then((result) => getEditorResponseData<ConnectorCapabilities>(result));
    };

    /**
     * This method will parse the deprecatedMediaType to the new media type. This method will be removed once the deprecatedMediaType is out of use
     * @param deprecatedType is 0 or 1
     * @returns connector capabilities
     */
    parseDeprecatedMediaType = (deprecatedType: DeprecatedMediaType) => {
        if (deprecatedType === DeprecatedMediaType.file) return MediaType.file;
        if (deprecatedType === DeprecatedMediaType.collection) return MediaType.collection;
    };
}