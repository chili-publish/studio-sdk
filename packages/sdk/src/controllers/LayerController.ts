import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Layer, LayerProperties, LayerPropertiesUpdate } from '../types/LayerTypes';

/**
 * The LayerController is responsible for all communication regarding Layers.
 * Methods inside this controller can be called by `window.SDK.layer.{method-name}`
 *
 * A document always has at least one layer.
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
     * When a document is loaded, the first layer is selected.
     * @returns the active layer
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
     * This method adds a new layer on top. The new layer becomes the only selected layer.
     * @returns the id of the new layer
     */
    addLayer = async () => {
        const res = await this.#editorAPI;
        return res.addLayer().then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method deletes layers and all frames on them. Deleting every layer is not allowed and throws an error.
     * Selected layers that aren't deleted stay selected. If all selected layers are deleted, the layer after the
     * active layer is selected. If no layer after it remains, the last remaining layer is selected.
     * An empty array does nothing, duplicate ids are ignored, and an unknown layer id throws an error before anything changes.
     * @param layerIds An array of all layer IDs you want to delete
     * @returns
     */
    deleteLayers = async (layerIds: Id[]) => {
        const res = await this.#editorAPI;
        return res.deleteLayers(layerIds).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method locks or unlocks layers. Frames on newly locked layers are deselected.
     * The layer selection doesn't change, so a locked layer can stay selected.
     * An empty array does nothing, duplicate ids are ignored, and an unknown layer id throws an error before anything changes.
     * @param layerIds An array of all layer IDs you want to lock or unlock
     * @param isLocked whether the layers should be locked
     * @returns
     */
    lockLayers = async (layerIds: Id[], isLocked: boolean) => {
        const res = await this.#editorAPI;
        return res.lockLayers(layerIds, isLocked).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method moves frames to a layer, keeping their relative order. Frames moved to a locked layer are deselected.
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
     * This method changes the order of layers.
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
     * This method selects layers, and the first one becomes the active layer. New and pasted frames are added to the active layer.
     * It also selects all frames of these layers on the selected page, including frames on locked layers.
     * If the layers have no frames on that page, all frames are deselected.
     * An empty array does nothing, duplicate ids are ignored, and an unknown layer id throws an error before anything changes.
     * @param layerIds An array of all layer IDs you want to select, the first one becomes the active layer
     * @returns
     */
    selectLayers = async (layerIds: Id[]) => {
        const res = await this.#editorAPI;
        return res.selectLayers(layerIds).then((result) => getEditorResponseData<null>(result));
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
