import SDK, { CharacterStyleUpdate, DocumentColor, DocumentFontFamily, ParagraphStyleUpdate } from '..';
import {
    BrandKitCharacterStyle,
    BrandKitInternal,
    BrandKitMedia,
    BrandKitParagraphStyle,
    StudioBrandKit,
} from '../types/BrandKitTypes';
import { EditorAPI, EditorResponse, Id } from '../types/CommonTypes';
import { getColorById, getFontKey, mapBrandKitColorToLocal, mapBrandKitStyleToLocal } from '../utils/BrandKitHelper';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { CharacterStyleController } from './CharacterStyleController';
import { ColorStyleController } from './ColorStyleController';
import { FontController } from './FontController';
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
        this.fontController = sdk.font;
        this.mediaController = sdk.mediaConnector;
        this.paragraphStyleController = sdk.paragraphStyle;
        this.characterStyleController = sdk.characterStyle;

        this.undoManagerController = sdk.undoManager;
    }

    private colorStyleController: ColorStyleController;

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
     * @returns brandkit with all assigned resources
     */
    get = async () => {
        const brandKitId = await this.getId();
        const brandKitVersion = await this.getVersion();
        const brandKitName = await this.getName();

        const colorsPromise = this.colorStyleController.getAll();
        const fontsPromise = this.fontController.getFontFamilies();
        const characterStylesPromise = this.characterStyleController.getAll();
        const paragraphStylesPromise = this.paragraphStyleController.getAll();
        const mediaPromise = this.getAllMedia();

        const [colors, fonts, paragraphStyles, characterStyles, media] = await Promise.all([
            colorsPromise,
            fontsPromise,
            paragraphStylesPromise,
            characterStylesPromise,
            mediaPromise,
        ]);

        const studioBrandKit = {
            id: brandKitId.parsedData,
            brandKit: {
                id: brandKitId.parsedData,
                name: brandKitName.parsedData,
                lastModifiedDate: brandKitVersion.parsedData,
                colors: colors.parsedData,
                fonts: fonts.parsedData,
                paragraphStyles: paragraphStyles.parsedData,
                characterStyles: characterStyles.parsedData,
                media: media.parsedData,
            },
        };
        const editorResponse = {
            success: true,
            data: JSON.stringify(studioBrandKit),
            parsedData: studioBrandKit,
            status: 200,
        };

        return getEditorResponseData<StudioBrandKit>(editorResponse);
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
     * @param studioBrandKit the content of the brand kit
     * @returns
     */
    set = async (studioBrandKit: StudioBrandKit) => {
        let result: EditorResponse<BrandKitInternal> = {
            success: true,
            status: 200,
            parsedData: {
                id: studioBrandKit.id,
                version: studioBrandKit.brandKit.lastModifiedDate,
                name: studioBrandKit.brandKit.name,
                colors: [],
                fonts: [],
                paragraphStyles: [],
                characterStyles: [],
                media: [],
            },
        };

        await this.undoManagerController.record('brandKit.set', async (sdk) => {
            const localColorGuidMap = await this.setColors(studioBrandKit, sdk);
            const localFontGuidMap = await this.setFonts(studioBrandKit, sdk);

            const { parsedData: localColors = [] } = await sdk.colorStyle.getAll();
            const { parsedData: localFonts } = await sdk.font.getFontFamilies();

            await this.setParagraphStyles(studioBrandKit, sdk, {
                localColors,
                localFonts,
                localColorGuidMap,
                localFontGuidMap,
            });

            await this.setCharacterStyles(studioBrandKit, sdk, {
                localColors,
                localFonts,
                localColorGuidMap,
                localFontGuidMap,
            });
            await this.setMedia(studioBrandKit);

            const { parsedData: allParagraphStyles } = await sdk.paragraphStyle.getAll();
            const { parsedData: allCharacterStyles } = await sdk.characterStyle.getAll();
            const { parsedData: allMedia } = await this.getAllMedia();
            await sdk.brandKit.updateIdAndVersion(studioBrandKit.id, studioBrandKit.brandKit.lastModifiedDate);
            await sdk.brandKit.rename(studioBrandKit.brandKit.name);

            result = {
                success: true,
                status: 200,
                parsedData: {
                    id: studioBrandKit.id,
                    version: studioBrandKit.brandKit.lastModifiedDate,
                    name: studioBrandKit.brandKit.name,
                    colors: localColors || [],
                    fonts: localFonts || [],
                    paragraphStyles: allParagraphStyles || [],
                    characterStyles: allCharacterStyles || [],
                    media: allMedia || [],
                },
            };
        });

        return result;
    };

    private async setColors(studioBrandKit: StudioBrandKit, sdk: SDK) {
        const localColorGuidsMap = new Map<string, string>();

        for (const color of studioBrandKit.brandKit.colors || []) {
            const { parsedData: localColorId } = await sdk.colorStyle.create();

            if (!localColorId) continue;
            localColorGuidsMap.set(color.guid, localColorId);
            const localColor = mapBrandKitColorToLocal(color);

            await sdk.colorStyle.rename(localColorId, color.name);
            await sdk.colorStyle.update(localColorId, localColor);
        }
        return localColorGuidsMap;
    }

    private async setFonts(studioBrandKit: StudioBrandKit, sdk: SDK) {
        const fontConnectorId = studioBrandKit.fontConnectorId;
        const guidFontFamilyIdMap = new Map<string, string>();

        for (const font of studioBrandKit.brandKit.fonts || []) {
            const { parsedData: fontStyles = [] } = await sdk.fontConnector.detail(fontConnectorId, font.fontFamilyId);

            if (!fontStyles?.[0]) throw new Error(`No font styles for family ID: ${font.fontFamilyId}`);
            const { parsedData: localFontId } = await sdk.font.addFontFamily(fontConnectorId, {
                name: fontStyles[0].familyName,
                fontFamilyId: font.fontFamilyId,
            });

            if (localFontId) guidFontFamilyIdMap.set(font.fontFamilyBrandKitGuid, localFontId);
        }

        return guidFontFamilyIdMap;
    }

    private async setParagraphStyles(
        studioBrandKit: StudioBrandKit,
        sdk: SDK,
        resources: {
            localFonts: DocumentFontFamily[] | null;
            localColors: DocumentColor[] | null;
            localColorGuidMap: Map<string, string>;
            localFontGuidMap: Map<string, string>;
        },
    ) {
        const { localColors, localFonts, localColorGuidMap, localFontGuidMap } = resources;
        for (const style of studioBrandKit.brandKit.paragraphStyles || []) {
            const localColorId = localColorGuidMap.get(style.brandKitColorGuid);
            const localStrokeColorId = localColorGuidMap.get(style.textStrokeColorGuid);

            const fontFamilyId = localFontGuidMap.get(style.brandKitFontFamilyGuid);
            const fontKey = getFontKey(localFonts, fontFamilyId, style.fontStyleId);

            if (!fontFamilyId || !fontKey)
                throw new Error(`Paragraph style could not be created with an empty font family: ${style.name}`);

            const localColor = getColorById(localColors, localColorId);
            const localStrokeColor = getColorById(localColors, localStrokeColorId);

            if (!localColor) throw new Error(`Paragraph style could not be created with an empty color: ${style.name}`);

            const { parsedData: styleId } = await sdk.paragraphStyle.create();

            const paragraphStyleUpdate = mapBrandKitStyleToLocal<BrandKitParagraphStyle, ParagraphStyleUpdate>(
                style,
                localColor,
                localStrokeColor,
                `${fontKey}`,
            );

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await sdk.paragraphStyle.rename(styleId!, style.name);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await sdk.paragraphStyle.update(styleId!, paragraphStyleUpdate);
        }
    }

    private async setCharacterStyles(
        studioBrandKit: StudioBrandKit,
        sdk: SDK,
        resources: {
            localFonts: DocumentFontFamily[] | null;
            localColors: DocumentColor[] | null;
            localColorGuidMap: Map<string, string>;
            localFontGuidMap: Map<string, string>;
        },
    ) {
        const { localColors, localFonts, localColorGuidMap, localFontGuidMap } = resources;
        for (const style of studioBrandKit.brandKit.characterStyles || []) {
            const localColorId = style.brandKitColorGuid ? localColorGuidMap.get(style.brandKitColorGuid) : undefined;
            const localStrokeColorId = style.textStrokeColorGuid
                ? localColorGuidMap.get(style.textStrokeColorGuid)
                : undefined;

            const fontFamilyId = style.brandKitFontFamilyGuid
                ? localFontGuidMap.get(style.brandKitFontFamilyGuid)
                : undefined;
            const localColor = getColorById(localColors, localColorId);
            const localStrokeColor = getColorById(localColors, localStrokeColorId);
            const fontKey = getFontKey(localFonts, fontFamilyId, style.fontStyleId);

            const { parsedData: styleId } = await sdk.characterStyle.create();

            const characterStyleUpdate = mapBrandKitStyleToLocal<BrandKitCharacterStyle, CharacterStyleUpdate>(
                style,
                localColor,
                localStrokeColor,
                fontKey,
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await sdk.characterStyle.rename(styleId!, style.name);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await sdk.characterStyle.update(styleId!, characterStyleUpdate);
        }
    }

    private async setMedia(studioBrandKit: StudioBrandKit) {
        for (const media of studioBrandKit.brandKit.media || []) {
            await this.addMedia(media.name, media.mediaConnectorId, media.mediaId);
        }
    }
}
