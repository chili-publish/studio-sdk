import { EditorAPI, Id } from '../../types/CommonTypes';
import { ListVariableItem, Variable } from '../../types/VariableTypes';
import { getEditorResponseData } from '../../utils/EditorResponseData';

export class VariableController {
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
