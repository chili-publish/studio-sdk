import { EditorAPI } from '../../types/CommonTypes';
import type { DocumentError } from '../../types/DocumentTypes';
import { renderURLs, DownloadFormats } from '../utils/enums';

import { getFetchURL } from '../utils/getFetchUrl';
/**
 * The DocumentController is responsible for all communication regarding the Document.
 * Methods inside this controller can be called by `window.SDK.document.{method-name}`
 */

export class DocumentController {
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
     * This method retrieves the current document state from the editor
     * @returns The JSON document in the form of a string
     */
    getCurrentDocumentState = async () => {
        const res = await this.#editorAPI;
        return res.getCurrentDocumentState();
    };

    /**
     * This method will load a provided document
     * @param documentJson The document to load in string format
     * @returns The document loaded inside of the canvas
     */
    loadDocument = async (documentJson: string) => {
        const res = await this.#editorAPI;
        return res.loadDocument(documentJson);
    };

    /**
     * This method will call an external api to create a download url
     * The video will be generated in the dimensions (and resolution) of the layout.
     * This means that any upscaling (e.g. playing the video full screen on a 4k monitor) will result in interpolation (= quality loss).
     * @param format The format of a downloadable url
     * @param layoutId id of layout to be downloaded
     * @returns the download link
     */
    getDownloadLink = async (format: DownloadFormats, layoutId: number) => {
        let error: DocumentError | null = null;
        let currentDocument: string | null = null;
        let PREPARE_DOWNLOAD_URL: string | null = null;
        let DOWNLOAD_URL: string | null = null;

        const documentResponse = await this.getCurrentDocumentState();
        console.log(documentResponse, 'DMDMDMDMDMDMDMMDM');
        currentDocument = documentResponse.data ?? null;
        const FETCH_URL = getFetchURL(format, layoutId);
        try {
            const response = await fetch(FETCH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: currentDocument,
            })
                .then((data) => data.json())
                .catch((err) => {
                    if (err.code) {
                        error = { code: err.code, error: err.message || err };
                    } else {
                        error = { code: 400, error: err.message || err };
                    }
                    return error;
                });
            if (response?.error || error) {
                return {
                    success: false,
                    data: null,
                    error,
                    status: response.status,
                };
            }
            PREPARE_DOWNLOAD_URL = response?.resultUrl ? renderURLs.BASE_URL + response?.resultUrl : null;

            DOWNLOAD_URL = response?.downloadUrl ? renderURLs.BASE_URL + response?.downloadUrl : null;

            let isFileDownloadable: true | DocumentError | null | unknown = error;

            try {
                isFileDownloadable = await this.startPollingOnEndpoint(PREPARE_DOWNLOAD_URL as string);
            } catch (err) {
                error = err as unknown as DocumentError;
            }

            if (isFileDownloadable !== true) error = isFileDownloadable as DocumentError;
            if (error) {
                return {
                    success: false,
                    data: null,
                    error,
                    status: error?.code ?? 400,
                };
            }
            return {
                success: true,
                status: 200,
                data: DOWNLOAD_URL,
            };
        } catch (err) {
            error = err as DocumentError;
            return {
                success: false,
                data: null,
                error,
                status: error?.code ?? 400,
            };
        }
    };

    /**
     * This method will call an external api endpoint, untill the api endpoint returns a status code 200
     * @param endpoint api endpoint to start polling on
     * @returns true when the endpoint call has successfully been resolved
     */
    startPollingOnEndpoint = async (endpoint: string): Promise<true | unknown> => {
        try {
            const response = await fetch(endpoint)
                .then((data) => data)
                .catch((err) => err);
            if (response?.status === 202) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return await this.startPollingOnEndpoint(endpoint);
            } else {
                return true;
            }
        } catch (err) {
            return err;
        }
    };
}
