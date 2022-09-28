import { ConnectorOptions, EditorAPI, EditorRawAPI, EditorResponse, MetaData } from '../../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { DownloadType, MediaConnectorCapabilities, MediaPage, QueryOptions } from '../../types/MediaConnectorTypes';
import { CallSender } from 'penpal';

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
     * @param connectorId unique Id of the media connector
     * @param queryOptions stringified instance of `QueryOptions`
     * @param context stringified `Map<string, string>` of dynamic options
     */
    query = async (connectorId: string, queryOptions: QueryOptions, context: MetaData) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorQuery(connectorId, JSON.stringify(queryOptions), JSON.stringify(context))
            .then((result) => getEditorResponseData<MediaPage>(result));
    };

    /**
     * The combination of a `connectorId` and `mediaId` is typically enough for a media connector to
     * perform the download of this asset. The `download` endpoint is capable of relaying this information to the
     * media connector instance running in the editor engine.
     * @param connectorId unique Id of the media connector
     * @param mediaId unique Id of the media to download
     * @param downloadType hint to the media connector about desired quality of the downloaded media
     * @param context dynamic map of additional options potentially used by the connector
     */
    download = async (
        connectorId: string,
        mediaId: string,
        downloadType: DownloadType,
        context: MetaData,
    ): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .mediaConnectorDownload(connectorId, mediaId, downloadType, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * Depending on the connector capabilities, this api method allows you to upload new media to the
     * connector's backend.
     * @param connectorId unique Id of the media connector
     * @param mediaId unique Id of the media to upload
     * @param blob byte array representation of the media to upload
     */
    upload = async (connectorId: string, mediaId: string, blob: Uint8Array) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorUpload(connectorId, mediaId, blob)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, removes media identified by `mediaId` from the connector's backend storage
     * @param connectorId unique Id of the media connector
     * @param mediaId unique Id of the media to download
     */
    remove = async (connectorId: string, mediaId: string) => {
        const res = await this.#editorAPI;
        return res.mediaConnectorRemove(connectorId, mediaId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Depending on the connector capabilities, copies media identified by `mediaId` to a new media item on the
     * connector's backend
     * @param connectorId unique Id of the media connector
     * @param mediaId unique Id of the media to download
     * @param newName name of the copied media on the connector's backend
     */
    copy = async (connectorId: string, mediaId: string, newName: string) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorCopy(connectorId, mediaId, newName)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * All connectors have a certain set of queryOptions they allow to be passed in the query context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `query` api method.
     * @param connectorId unique Id of the media connector
     */
    getQueryOptions = async (connectorId: string) => {
        const res = await this.#editorAPI;
        console.log(res.mediaConnectorGetQueryOptions);
        return res
            .mediaConnectorGetQueryOptions(connectorId)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * All connectors have a certain set of downloadOptions they allow to be passed in the download context. This
     * method allows you to discover what options are available for a given connector. If you want to use any of these
     * options, they need to be passed in the `context` parameter of the `download` api method.
     * @param connectorId unique Id of the media connector
     */
    getDownloadOptions = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorGetDownloadOptions(connectorId)
            .then((result) => getEditorResponseData<ConnectorOptions>(result));
    };

    /**
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param connectorId unique Id of the media connector
     */
    getCapabilities = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorGetCapabilities(connectorId)
            .then((result) => getEditorResponseData<MediaConnectorCapabilities>(result));
    };
}
