import { CallSender } from 'penpal';
import { EditorAPI, EditorRawAPI, EditorResponse } from '../types/CommonTypes';
import {
    ConnectorConfigOptions,
    DeprecatedMediaType,
    MediaType,
    MetaData,
    QueryOptions,
    QueryPage,
} from '../types/ConnectorTypes';
import { FontConnectorCapabilities, FontFamily, FontPreviewFormat, FontStyle } from '../types/FontConnectorTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The FontConnectorController is responsible for all communication regarding Font connectors.
 * Methods inside this controller can be called by `window.SDK.FontConnector.{method-name}`
 *
 * The way GraFx Studio handles different sources of Font is called 'FontConnector'.
 * A FontConnector is an implementation of a set of capabilities we need
 * to interact with a certain Digital Asset Management system.
 * In essence, a connector is the combination of a JavaScript snippet and some metadata.
 * The JavaScript snippet is loaded in the studio engine using a sandboxed JavaScript execution engine (QuickJs).
 * This allows us to execute the Font connector
 * both on web using webassembly and on the server side during e.g. animation output generation.
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
     * context as parameters.
     * @param connectorId unique id of the Font connector
     * @param queryOptions query options
     * @param context context that will be available in the connector script.
     * @returns array of font families
     */
    query = async (connectorId: string, queryOptions: QueryOptions, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorQuery(connectorId, JSON.stringify(queryOptions), JSON.stringify(context))
            .then((result) => getEditorResponseData<QueryPage<FontFamily>>(result));
    };

    /**
     * Returns all font styles for a family using a specific FontConnector. The connector needs to list `detail` as a supported capability.
     * @param connectorId unique id of the Font connector
     * @param fontFamilyId unique id of the Font family
     * @param context context that will be available in the connector script.
     * @returns array of font styles
     */
    detail = async (connectorId: string, fontFamilyId: string, context: MetaData = {}) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorDetail(connectorId, fontFamilyId, JSON.stringify(context))
            .then((result) => getEditorResponseData<FontStyle[]>(result));
    };

    /**
     * The combination of a `connectorId` and `fontId` is typically enough for a Font connector to
     * perform the download of this asset. The `download` endpoint is capable of relaying this information to the
     * Font connector instance running in the editor engine.
     * @param connectorId unique id of the Font connector
     * @param fontStyleId unique id of the Font style to download
     * @param context context that will be available in the connector script.
     * @returns
     */
    download = async (connectorId: string, fontStyleId: string, context: MetaData = {}): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .fontConnectorDownload(connectorId, fontStyleId, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * The combination of a `connectorId` and `fontFamilyId` is typically enough for a Font connector to
     * perform the preview of this asset. The `preview` endpoint is capable of relaying this information to the
     * Font connector instance running in the editor engine.
     * @param connectorId unique id of the Font connector
     * @param fontFamilyId unique id of the Font family to download
     * @param previewFormat hint to the Font connector about desired format of the Font preview
     * @param context dynamic map of additional options potentially used by the connector
     * @returns
     */
    preview = async (
        connectorId: string,
        fontFamilyId: string,
        previewFormat: FontPreviewFormat,
        context: MetaData = {},
    ): Promise<Uint8Array> => {
        const res = await this.#blobAPI;
        return res
            .fontConnectorPreview(connectorId, fontFamilyId, previewFormat, JSON.stringify(context))
            .then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };

    /**
     * All connectors have a certain set of mappings they allow to be passed into the connector methods their context. This
     * method allows you to discover which mappings are available for a given connector. If you want to use any of these
     * mappings, they will be available in the `context` parameter of any connector method.
     * @param connectorId unique id of the media connector
     * @returns connector mappings
     */
    getConfigurationOptions = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetConfigurationOptions(connectorId)
            .then((result) => getEditorResponseData<ConnectorConfigOptions>(result));
    };

    /**
     * This method returns what capabilities the selected connector has. It gives an indication what methods can
     * be used successfully for a certain connector.
     * @param connectorId unique id of the Font connector
     * @returns FontConnectorCapabilities
     */
    getCapabilities = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res
            .fontConnectorGetCapabilities(connectorId)
            .then((result) => getEditorResponseData<FontConnectorCapabilities>(result));
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
