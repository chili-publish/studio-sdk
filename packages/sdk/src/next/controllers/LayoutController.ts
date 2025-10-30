import { ColorUsage } from "../../types/ColorStyleTypes";
import { EditorAPI, EditorRawAPI, EditorResponse, Id, PrivateData } from "../../types/CommonTypes";
import { Layout, LayoutPreset, MeasurementUnit, LayoutIntent, PositionEnum, BleedDeltaUpdate, ResizableLayoutPropertiesUpdate } from "../../types/LayoutTypes";
import { getEditorResponseData } from "../../utils/EditorResponseData";
import { SelectLayoutOptions } from "../types/LayoutTypes";
import { CallSender } from 'penpal';

/**
 * The LayoutController is responsible for all communication regarding Layouts.
 * Methods inside this controller can be called by `window.SDK.layout.{method-name}`
 */
export class LayoutController {
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
     * This method will select a specific layout
     * @param id the id of a specific layout
     * @param options the options object (updates page size)
     * @returns
     */
    select = async (id: Id, options: SelectLayoutOptions) => {
        const res = await this.#editorAPI;
        return res.selectLayoutWithOptions(id, JSON.stringify(options)).then((result) => getEditorResponseData<null>(result));
    };

}
