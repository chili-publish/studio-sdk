import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Layer, LayerProperties, LayerPropertiesUpdate } from '../types/LayerTypes';

/**
 * The LayerController is responsible for all communication regarding Layers.
 * Methods inside this controller can be called by `window.SDK.layer.{method-name}`
 *
 * A document always has at least one layer and at least one unlocked layer.
 */
export class LayerController {
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
     * This method returns the list of layers in document order, from bottom to top:
     * index 0 is the bottom layer, the last layer renders on top.
     * @returns list of all layers
     */
    getLayers = async () => {
        const res = await this.#editorAPI;
        return res.getLayers().then((result) => getEditorResponseData<Layer[]>(result));
    };

    /**
     * This method returns a layer by its id
     * @param layerId the id of a specific layer
     * @returns layer properties
     */
    getLayerById = async (layerId: Id) => {
        const res = await this.#editorAPI;
        return res.getLayerById(layerId).then((result) => getEditorResponseData<Layer>(result));
    };

    /**
     * This method returns the selected layer, which new and pasted frames are added to.
     * The selected layer is never locked.
     * @returns the selected layer
     */
    getSelectedLayer = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedLayer().then((result) => getEditorResponseData<Layer>(result));
    };

    /**
     * This method returns the properties of every layer on the selected layout, in document order.
     * @returns list of the layer properties on the selected layout
     */
    getLayerPropertiesOnSelectedLayout = async () => {
        const res = await this.#editorAPI;
        return res
            .getLayerPropertiesOnSelectedLayout()
            .then((result) => getEditorResponseData<LayerProperties[]>(result));
    };

    /**
     * This method adds a new layer on top and selects it.
     * @returns the id of the new layer
     */
    addLayer = async () => {
        const res = await this.#editorAPI;
        return res.addLayer().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method deletes a layer and all frames on it. Locked layers can't be deleted.
     * @param layerId the id of the layer
     * @returns
     */
    deleteLayer = async (layerId: Id) => {
        const res = await this.#editorAPI;
        return res.deleteLayer(layerId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method locks or unlocks a layer.
     * Locking the selected layer moves the selection to the next unlocked layer.
     * @param layerId the id of the layer
     * @param isLocked whether the layer should be locked
     * @returns
     */
    lockLayer = async (layerId: Id, isLocked: boolean) => {
        const res = await this.#editorAPI;
        return res.lockLayer(layerId, isLocked).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method moves frames to a layer, keeping their relative order. Frames can't be moved to a locked layer.
     * @param layerId the id of the target layer
     * @param frameIds An array of all frame IDs you want to move to the layer
     * @param order the position within the target layer's frames, 0 is the back.
     * When omitted or larger than the number of frames on the layer, the frames are moved to the front.
     * @returns
     */
    moveFramesToLayer = async (layerId: Id, frameIds: Id[], order?: number) => {
        const res = await this.#editorAPI;
        return res.moveFramesToLayer(layerId, frameIds, order).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a layer.
     * @param layerId the id of the layer
     * @param name the new name, it is trimmed and must be non-empty and unique (case-insensitive)
     * @returns
     */
    renameLayer = async (layerId: Id, name: string) => {
        const res = await this.#editorAPI;
        return res.renameLayer(layerId, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes the order of layers. Locked layers can't be reordered.
     * The layer list is ordered from bottom to top, so index 0 is the bottom layer.
     * Frames are restacked so each layer stays one band in the z-order.
     * @param order the index in the list to move to, from 0 to the number of layers
     * @param layerIds An array of all layer IDs you want to move to the given index
     * @returns
     */
    reorderLayers = async (order: number, layerIds: Id[]) => {
        const res = await this.#editorAPI;
        return res.reorderLayers(order, layerIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method selects a layer, new and pasted frames are added to the selected layer.
     * Locked layers can't be selected.
     * @param layerId the id of the layer
     * @returns
     */
    selectLayer = async (layerId: Id) => {
        const res = await this.#editorAPI;
        return res.selectLayer(layerId).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the properties of a layer on a layout.
     * @param layerId the id of the layer
     * @param properties the properties to change, the omitted ones stay unchanged
     * @param layoutId the id of the layout, when omitted the selected layout is used
     * @returns
     */
    setLayerProperties = async (layerId: Id, properties: LayerPropertiesUpdate, layoutId?: Id) => {
        const res = await this.#editorAPI;
        return res
            .setLayerProperties(layerId, JSON.stringify(properties), layoutId)
            .then((result) => getEditorResponseData<null>(result));
    };
}
