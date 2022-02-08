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
     * This method retrieves the current documentstate from the editor
     * @returns The JSON document in the form of a string
     */
    getCurrentDocumentState = async () => {
        const res = await this.children;
        return res.getCurrentDocumentState();
    };

    getDownloadLink = async (format: string) => {
        let error: DocumentError | null = null;
        let currentDocument: string | null = null;
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
                body: JSON.stringify(currentDocument),
            })
                .then((data) => data.json() as unknown as RenderResponse)
                .catch((err) => (error = err));
            DOWNLOAD_URL = renderURLs.BASE_URL + response.resultUrl;
            console.log(!error, error);
            let isFileDownloadable: true | DocumentError | null = error;
            if (!error) {
                try {
                    isFileDownloadable = await longPollForDownload(DOWNLOAD_URL);
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
                  status: 404,
                  data: null,
                  error,
              }
            : {
                  success: true,
                  status: 200,
                  data: DOWNLOAD_URL,
                  error: null,
              };
    };
}
