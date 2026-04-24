import SDK from '..';
import {
    BrandKitMedia,
    BrandKit,
    APIBrandKit,
} from '../types/BrandKitTypes';
import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { CharacterStyleController } from './CharacterStyleController';
import { ColorStyleController } from './ColorStyleController';
import { FontController } from './FontController';
import { GradientStyleController } from './GradientStyleController';
import { MediaConnectorController } from './MediaConnectorController';
import { ParagraphStyleController } from './ParagraphStyleController';
import { UndoManagerController } from './UndoManagerController';

/**
 * The BrandKitController is responsible for all communication regarding Brand Kits.
 * Methods inside this controller can be called by `window.SDK.brandKit.{method-name}`
 */

export class BrandKitController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI, sdk: SDK) {
        this.#editorAPI = editorAPI;
        this.colorStyleController = sdk.colorStyle;
        this.gradientStyleController = sdk.gradientStyle;
        this.fontController = sdk.font;
        this.mediaController = sdk.mediaConnector;
        this.paragraphStyleController = sdk.paragraphStyle;
        this.characterStyleController = sdk.characterStyle;

        this.undoManagerController = sdk.undoManager;
    }

    private colorStyleController: ColorStyleController;

    private gradientStyleController: GradientStyleController;

    private fontController: FontController;

    private mediaController: MediaConnectorController;

    private paragraphStyleController: ParagraphStyleController;

    private characterStyleController: CharacterStyleController;

    private undoManagerController: UndoManagerController;

    /**
     * This method returns the current brand kit id.
     * @returns current brand kit id
     */
    getId = async () => {
        const res = await this.#editorAPI;
        return res.getBrandKitId().then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method returns the current brand kit version.
     * @returns current brand kit version
     */
    getVersion = async () => {
        const res = await this.#editorAPI;
        return res.getBrandKitVersion().then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method returns the current brand kit name.
     * @returns current brand kit name
     */
    getName = async () => {
        const res = await this.#editorAPI;
        return res.getBrandKitName().then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method renames the brand kit.
     * @param newName - The new name for the brand kit
     * @returns
     */
    rename = async (newName: string) => {
        const res = await this.#editorAPI;
        return res.renameBrandKit(newName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method updates both the brand kit id and version.
     * @param id - The new brand kit id
     * @param version - The new brand kit version
     * @returns
     */
    updateIdAndVersion = async (id: string, version: string) => {
        const res = await this.#editorAPI;
        return res.updateBrandKitIdAndVersion(id, version).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method returns the local brand kit
     * @returns brand kit with all assigned resources
     */
    get = async () => {
        const res = await this.#editorAPI;
        return res.getBrandKit().then((result) => getEditorResponseData<BrandKit>(result));
    };

    /**
     * This method returns all media items in the brand kit
     * @returns list of media items in the brand kit
     */
    getAllMedia = async () => {
        const res = await this.#editorAPI;
        return res.getAllBrandKitMedia().then((result) => getEditorResponseData<BrandKitMedia[]>(result));
    };

    /**
     * This method adds a media item to the brand kit
     * @param name - The name of the media item
     * @param remoteConnectorId - The remote connector ID
     * @param assetId - The asset ID of the media item
     * @returns
     */
    addMedia = async (name: string, remoteConnectorId: Id, assetId: string) => {
        const res = await this.#editorAPI;
        return res
            .addBrandKitMedia(name, remoteConnectorId, assetId)
            .then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method updates an existing media item in the brand kit
     * @param name - The name of the media item to update
     * @param remoteConnectorId - The new remote connector ID
     * @param assetId - The new asset ID
     * @returns
     */
    updateMedia = async (name: string, remoteConnectorId: Id, assetId: string) => {
        const res = await this.#editorAPI;
        return res
            .updateBrandKitMedia(name, remoteConnectorId, assetId)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames an existing media item in the brand kit
     * @param name - The name of the media item to rename
     * @param newName - The new name for the media item
     * @returns
     */
    renameMedia = async (name: string, newName: string) => {
        const res = await this.#editorAPI;
        return res.renameBrandKitMedia(name, newName).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a media item from the brand kit
     * @param name - The name of the media item to remove
     * @returns
     */
    removeMedia = async (name: string) => {
        const res = await this.#editorAPI;
        return res.removeBrandKitMedia(name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method updates a brand kit and all related resources assigned to it
     * @param apiBrandKit the brand kit from the environment api
     * @returns the local brand kit
     */
    set = async (apiBrandKit: APIBrandKit) => {
        const res = await this.#editorAPI;
        return res.setBrandKit(JSON.stringify(apiBrandKit)).then((result) => getEditorResponseData<BrandKit>(result));
    };

    /**
     * This method returns the value indicating whether the brand kit auto-sync is enabled or not
     * It is up to the integrator to implement this auto-sync functionality, this method only is an indication if it should be done or not.
     
     * @returns boolean indicating sync status
     */
    isAutoSync = async () => {
        const res = await this.#editorAPI;
        return res.isBrandKitAutoSync().then((result) => getEditorResponseData<boolean>(result));
    };

    /**
     * This method enables or disables brand kit auto-sync
     * @param enableAutoSync boolean indicating auto-sync status
     * @returns boolean indicating the result of the operation
     */
    enableAutoSync = async (enableAutoSync: boolean) => {
        const res = await this.#editorAPI;
        return res.enableBrandKitAutoSync(enableAutoSync).then((result) => getEditorResponseData<boolean>(result));
    };

    /**
     * Switches the active brand kit theme.
     * @param themeName - Theme name
     * @returns
     */
    switchTheme = async (themeName: string) => {
        const res = await this.#editorAPI;
        return res
            .switchBrandKitTheme(themeName)
            .then((result) => getEditorResponseData<null>(result));
    };
}
