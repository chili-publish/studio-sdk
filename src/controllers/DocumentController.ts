import { Child, ConfigType } from '../../types/CommonTypes';
import { DocumentError } from '../../types/DocumentTypes';
import { renderURLs } from '../utils/enums';

import { getFetchURL } from '../utils/getFetchUrl';
import { longPollForDownload } from '../utils/longPollForDownload';
/**
 * The DocumentController is responsible for all communication regarding the Document.
 * Methods inside this controller can be called by `window.SDK.document.{method-name}`
 */
export class DocumentController {
    /**
     * @ignore
     */
    children: Child;
    /**
     * @ignore
     */
    config: ConfigType;

    /**
     * @ignore
     */
    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    /**
     * This method retrieves the current document state from the editor
     * @returns The JSON document in the form of a string
     */
    getCurrentDocumentState = async () => {
        const res = await this.children;
        return res.getCurrentDocumentState();
    };

    /**
     * This method will call an external api to create a download url
     * @param format The format of a downloadable url
     * @returns the download link
     */

    getDownloadLink = async (format: string) => {
        let error: DocumentError | null = null;
        let currentDocument: string | null = null;
        let PREPARE_DOWNLOAD_URL: string | null = null;
        let DOWNLOAD_URL: string | null = null;

        const documentResponse = await this.getCurrentDocumentState();
        currentDocument = documentResponse.data ? String(documentResponse.data) : null;
        const FETCH_URL = getFetchURL(format);
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
                    }
                });

            if ((response?.status && response.status !== 200) || response?.error) {
                error = response?.error;
            }
            PREPARE_DOWNLOAD_URL = response?.resultUrl ? renderURLs.BASE_URL + response?.resultUrl : null;

            DOWNLOAD_URL = response?.downloadUrl ? renderURLs.BASE_URL + response?.downloadUrl : null;

            let isFileDownloadable: true | DocumentError | null | unknown = error;

            if (!error) {
                try {
                    isFileDownloadable = await longPollForDownload(PREPARE_DOWNLOAD_URL as string);
                } catch (err) {
                    error = err as unknown as DocumentError;
                }
            }

            if (isFileDownloadable !== true) error = isFileDownloadable as DocumentError;
        } catch (err) {
            error = err as DocumentError;
        }
        return error
            ? {
                  success: false,
                  data: null,
                  error,
                  status: error.code ?? 400,
              }
            : {
                  success: true,
                  status: 200,
                  data: DOWNLOAD_URL,
                  error: null,
              };
    };
}
