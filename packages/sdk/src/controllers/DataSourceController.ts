import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { ConnectorInstance } from '../next';

/**
 * The DataSourceController is responsible for all communication regarding data source.
 * Methods inside this controller can be called by `window.SDK.dataSource.{method-name}`
 *
 * A data source is a data connector selected to be used in the document.
 * Only one data source can be defined per template, this controller manages this
 * data source.
 *
 */
export class DataSourceController {
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
     * Sets the data source by id.
     * @param connectorId the id of your data connector
     * @returns
     */
    setDataSource = async (connectorId: string) => {
        const res = await this.#editorAPI;
        return res.setDataSource(connectorId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Gets the data source.
     * @returns the connector object
     */
    getDataSource = async () => {
        const res = await this.#editorAPI;
        return res.getDataSource().then((result) => getEditorResponseData<ConnectorInstance>(result));
    };

    /**
     * Removes the data source if defined.
     * @returns
     */
    removeDataSource = async () => {
        const res = await this.#editorAPI;
        return res.removeDataSource().then((result) => getEditorResponseData<null>(result));
    };
}
