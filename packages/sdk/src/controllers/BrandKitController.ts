import SDK from '..';
import {
    APIBrandKit,
    StudioBrandKit,
    BrandKitMedia,
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
     * @experimental This method returns the local brandkit
     * @returns The local brandkit with all assigned resources
     */
    get = async () => {
        const res = await this.#editorAPI;
        return res.getBrandKit().then((result) => getEditorResponseData<StudioBrandKit>(result));
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
     * @experimental This method removes a brand kit and all related resources assigned to it
     * @returns
     */
    remove = async () => {
        const colors = await this.colorStyleController.getAll();
        const colorsList = colors.parsedData || [];

        const gradients = await this.gradientStyleController.getAll();
        const gradientsList = gradients.parsedData || [];

        const paragraphStyles = await this.paragraphStyleController.getAll();
        const paragraphStylesList = paragraphStyles.parsedData || [];

        const characterStyles = await this.characterStyleController.getAll();
        const characterStylesList = characterStyles.parsedData || [];

        const fonts = await this.fontController.getFontFamilies();
        const fontsList = fonts.parsedData || [];

        const media = await this.getAllMedia();
        const mediaList = media.parsedData || [];

        await this.undoManagerController.record('brandKit.remove', async (sdk) => {
            for (const color of colorsList) {
                await sdk.colorStyle.remove(color.id);
            }
            for (const gradient of gradientsList) {
                await sdk.gradientStyle.remove(gradient.id);
            }
            for (const style of paragraphStylesList) {
                await sdk.paragraphStyle.remove(style.id);
            }
            for (const style of characterStylesList) {
                await sdk.characterStyle.remove(style.id);
            }
            for (const font of fontsList) {
                await sdk.font.removeFontFamily(font.id);
            }
            for (const media of mediaList) {
                await this.removeMedia(media.name);
            }
        });
    };

    /**
     * @experimental This method updates a brand kit and all related resources assigned to it
     * @param apiBrandKit - The environment brand kit data containing all resources to be set
     * @returns The updated local brand kit with all assigned resources
     */
    set = async (apiBrandKit: APIBrandKit) => {
        const res = await this.#editorAPI;
        return res.setBrandKit(apiBrandKit).then((result) => getEditorResponseData<StudioBrandKit>(result));
    };
}
