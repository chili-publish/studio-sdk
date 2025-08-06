import { EditorAPI, Id } from '../../types/CommonTypes';
import { ListVariableItem, Variable } from '../../types/VariableTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';
import { Dictionary } from '@chili-studio/connector-types';

import {
    ConnectorGrafxRegistration,
    ConnectorLocalRegistration,
    ConnectorUrlRegistration,
} from '../types/ConnectorTypes';

export class VariableController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;
    image: ImageVariableController;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
        this.image = new ImageVariableController(editorAPI);
    }

    /**
     * This method returns the list of variables
     * @returns
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getVariables().then((result) => getEditorResponseData<Variable[]>(result));
    };

    /**
     * This method returns a variable by id
     * @param id the id of a specific variable
     * @returns
     */
    getById = async (id: string) => {
        const res = await this.#editorAPI;
        return res.getVariableById(id).then((result) => getEditorResponseData<Variable>(result));
    };

    /**
     * This method returns a variable by name
     * @param name the name of a specific variable
     * @returns
     */
    getByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res.getVariableByName(name).then((result) => getEditorResponseData<Variable>(result));
    };

    /**
     * This method sets the items of the list variable
     *
     * The items need to be unique and are not case sensitive.
     *
     * @param id the id of the list variable
     * @param items the items of the list
     * @returns
     */
    setListVariable = async (id: Id, items: ListVariableItem[]) => {
        const res = await this.#editorAPI;
        return res
            .setListVariableItems(
                id,
                items.map((item) => JSON.stringify(item)),
            )
            .then((result) => getEditorResponseData<null>(result));
    };

}

export class ImageVariableController {
    #editorAPI: EditorAPI;

    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method sets the allow query for an image variable
     * @param id the id of the variable
     * @param allowQuery the allow query
     * @returns
     */
    setAllowQuery = async (id: string, allowQuery: boolean) => {
        const res = await this.#editorAPI;
        return res.setImageVariableAllowQuery(id, allowQuery).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the allow upload for an image variable
     * @param id the id of the variable
     * @param allowUpload the allow upload
     * @returns
     */
    setAllowUpload = async (id: string, allowUpload: boolean) => {
        const res = await this.#editorAPI;
        return res.setImageVariableAllowUpload(id, allowUpload).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the minimum size (both width and height) for an image variable that will be uploaded
     * @param id the id of the variable
     * @param minWidth the minimum width
     * @param minHeight the minimum height
     * @returns
     */
    setMinUploadSize = async (id: string, minWidth: string | null, minHeight: string | null) => {
        const res = await this.#editorAPI;
        return res
            .setImageVariableUploadMinSize(id, minWidth, minHeight)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the image variable connector. Setting a connector will
     * automatically remove the assetId linked to the connector if present.
     * If a connector was the source of the variable, it will be unregistered.
     * @param id The id of the image variable to update
     * @param registration registration object containing all details about the connector
     * @returns The new id of the connector
     */
    setConnector = async (
        id: string,
        registration: ConnectorLocalRegistration | ConnectorGrafxRegistration | ConnectorUrlRegistration,
    ) => {
        const res = await this.#editorAPI;

        return res
            .setImageVariableConnector(id, JSON.stringify(registration))
            .then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method sets the connector context for an image variable
     * @param id the id of the variable
     * @param context the context dictionary
     * @returns
     */
    setConnectorContext = async (id: string, context: Dictionary) => {
        const res = await this.#editorAPI;
        return res
            .setImageVariableConnectorContext(id, JSON.stringify(context))
            .then((result) => getEditorResponseData<null>(result));
    };
}
