import { EditorAPI } from '../../types/CommonTypes';
import { ResourceProvider } from '../../types/ResourceTypes';

/**
 * The ResourceController is responsible for all communication regarding resources and assets.
 * Methods inside this controller can be called by `SDK.resource.{method-name}`
 */
export class ResourceController {
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
     * This method gets a list of asset-details (not the assets itself)
     * @param provider, @param page
     */
    getAssetList = async (provider: ResourceProvider, page: number) => {
        const res = await this.#editorAPI;
        return res.getAssetList(provider, page);
    };

    /**
     * This method gets an asset as a byte-array
     * @param provider, @param id, @param width, @param height
     */
    getAsset = async (provider: ResourceProvider, id: string, width: number, height: number): Promise<Uint8Array> => {
        const res = await this.#editorAPI;
        return res.getAsset(provider, id, width, height) as unknown as Uint8Array;
    };
}
