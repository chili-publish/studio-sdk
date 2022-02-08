import { Child, ConfigType } from '../../types/CommonTypes';
import { DocumentError, RenderResponse } from '../../types/DocumentTypes';
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
                .then((data) => data.json() as unknown as RenderResponse)
                .catch((err) => (error = err));
            PREPARE_DOWNLOAD_URL = renderURLs.BASE_URL + response.resultUrl;
            DOWNLOAD_URL = renderURLs.BASE_URL + response.downloadUrl;
            let isFileDownloadable: true | DocumentError | null = error;
            if (!error) {
                try {
                    const responseFromLongPoll = await longPollForDownload(PREPARE_DOWNLOAD_URL);

                    isFileDownloadable = responseFromLongPoll as unknown as true;
                } catch (err) {
                    error = err as unknown as DocumentError;
                }
            }
            if (isFileDownloadable !== true) error = isFileDownloadable;
        } catch (err) {
            error = err as DocumentError;
        }

        return error
            ? {
                  success: false,
                  data: null,
                  error,
              }
            : {
                  success: true,
                  data: DOWNLOAD_URL,
                  error: null,
              };
    };
}
