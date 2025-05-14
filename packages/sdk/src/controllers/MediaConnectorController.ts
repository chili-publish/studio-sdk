import { CallSender } from 'penpal';
import { EditorAPI, EditorRawAPI, EditorResponse, Id } from '../types/CommonTypes';
import {
    ConnectorConfigOptions,
    DeprecatedMediaConnectorDownloadType,
    DeprecatedMediaType,
    MediaType,
    MetaData,
    QueryOptions,
    QueryPage,
} from '../types/ConnectorTypes';
import {
    Media,
    MediaConnectorCapabilities,
    MediaDetail,
    MediaDownloadIntent,
    MediaDownloadType,
} from '../types/MediaConnectorTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The MediaConnectorController is responsible for all communication regarding media connectors.
 * Methods inside this controller can be called by `window.SDK.mediaConnector.{method-name}`
 *
 * The way GraFx Studio handles different sources of media is called 'MediaConnector'.
 * A MediaConnector is an implementation of a set of capabilities we need
 * to interact with a certain Digital Asset Management system.
 * In essence, a connector is the combination of a JavaScript snippet and some metadata.
 * The JavaScript snippet is loaded in the studio engine using a sandboxed JavaScript execution engine (QuickJs).
 * This allows us to execute the media connector
 * both on web using webassembly and on the server side during e.g. animation output generation.
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
     * @param context context that will be available in the connector script.
     * @returns array of Media items
     */
    query = async (id: Id, queryOptions: QueryOptions, context: MetaData = {}) => {
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
     * @param context context that will be available in the connector script.
     * @returns Media item
     */
    detail = async (id: Id, mediaId: string, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorDetail(id, mediaId, JSON.stringify(context))
            .then((result) => getEditorResponseData<MediaDetail>(result));
    };

    /**
     * The combination of a `connectorId` and `mediaId` is typically enough for a media connector to
     * perform the download of this asset. The `download` endpoint is capable of relaying this information to the
     * media connector instance running in the editor engine.
     * @param id unique id of the media connector
     * @param mediaId unique id of the media to download
     * @param downloadType hint to the media connector about desired quality of the downloaded media
     * @param context context that will be available in the connector script.
     * @returns
     */
    download = async (
        id: Id,
        mediaId: Id,
        downloadType: MediaDownloadType,
        context: MetaData = {},
    ): Promise<Uint8Array> => {
        const compatibleDownloadType = this.parseDeprecatedMediaDownloadType(
            downloadType as unknown as DeprecatedMediaConnectorDownloadType,
        ) as MediaDownloadType;
        const res = await this.#blobAPI;
        return res
            .mediaConnectorDownload(
                id,
                mediaId,
                compatibleDownloadType,
                MediaDownloadIntent.web,
                JSON.stringify(context),
            )
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * All connectors have a certain set of mappings they allow to be passed into the connector methods their context. This
     * method allows you to discover which mappings are available for a given connector. If you want to use any of these
     * mappings, they will be available in the `context` parameter of any connector method.
     * @param id unique id of the media connector
     * @returns connector mappings
     */
    getConfigurationOptions = async (id: Id) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorGetConfigurationOptions(id)
            .then((result) => getEditorResponseData<ConnectorConfigOptions>(result));
    };

    /**
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param id unique id of the media connector
     * @returns MediaConnectorCapabilities
     */
    getCapabilities = async (id: Id) => {
        const res = await this.#editorAPI;
        return res
            .mediaConnectorGetCapabilities(id)
            .then((result) => getEditorResponseData<MediaConnectorCapabilities>(result));
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

    /**
     * This method will parse the deprecatedMediaDownloadType to the new media download type.
     * This method will be removed once the deprecatedMediaDownloadType is out of use
     * @param deprecatedMediaDownloadType legacy download type
     * @returns MediaDownloadType
     */
    parseDeprecatedMediaDownloadType(
        deprecatedMediaDownloadType: DeprecatedMediaConnectorDownloadType,
    ): MediaDownloadType {
        switch (deprecatedMediaDownloadType) {
            case DeprecatedMediaConnectorDownloadType.HighResolutionWeb:
                return MediaDownloadType.highres;
            case DeprecatedMediaConnectorDownloadType.LowResolutionWeb:
                return MediaDownloadType.thumbnail;
            default:
                return deprecatedMediaDownloadType as unknown as MediaDownloadType;
        }
    }
}
