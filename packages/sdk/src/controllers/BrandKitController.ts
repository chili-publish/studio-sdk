import SDK, { CharacterStyleUpdate, DocumentColor, DocumentFontFamily, ParagraphStyleUpdate } from '..';
import { BrandKitCharacterStyle, BrandKitParagraphStyle, StudioBrandKit } from '../types/BrandKitTypes';
import { EditorAPI } from '../types/CommonTypes';
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
     * @experimental This method returns the local brandkit
     * @returns brandkit with all assigned resources
     */
    get = async () => {
        const colorsPromise = this.colorStyleController.getAll();
        const fontsPromise = this.fontController.getFontFamilies();
        const characterStylesPromise = this.characterStyleController.getAll();
        const paragraphStylesPromise = this.paragraphStyleController.getAll();

        const [colors, fonts, paragraphStyles, characterStyles] = await Promise.all([
            colorsPromise,
            fontsPromise,
            paragraphStylesPromise,
            characterStylesPromise,
        ]);

        const studioBrandKit = {
            brandKit: {
                colors: colors.parsedData,
                fonts: fonts.parsedData,
                paragraphStyles: paragraphStyles.parsedData,
                characterStyles: characterStyles.parsedData,
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

        try {
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
            });
        } catch (err) {
            this.undoManagerController.undo();
            throw err;
        }
    };

    /**
     * @experimental This method updates a brand kit and all related resources assigned to it
     * @param studioBrandKit the content of the brand kit
     * @returns
     */
    set = async (studioBrandKit: StudioBrandKit) => {
        try {
            let result;

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

                const { parsedData: allParagraphStyles } = await sdk.paragraphStyle.getAll();
                const { parsedData: allCharacterStyles } = await sdk.characterStyle.getAll();

                result = {
                    success: true,
                    status: 200,
                    parsedData: {
                        colors: localColors,
                        fonts: localFonts,
                        paragraphStyles: allParagraphStyles,
                        characterStyles: allCharacterStyles,
                    },
                };
            });

            return result;
        } catch (err) {
            this.undoManagerController.undo();
            throw err;
        }
    };

    private async setColors(studioBrandKit: StudioBrandKit, SDK: SDK) {
        const localColorGuidsMap = new Map<string, string>();

        for (const color of studioBrandKit.brandKit.colors || []) {
            const { parsedData: localColorId } = await SDK.colorStyle.create();

            if (!localColorId) continue;
            localColorGuidsMap.set(color.guid, localColorId);
            const localColor = mapBrandKitColorToLocal(color);

            await SDK.colorStyle.rename(localColorId, color.name);
            await SDK.colorStyle.update(localColorId, localColor);
        }
        return localColorGuidsMap;
    }

    private async setFonts(studioBrandKit: StudioBrandKit, SDK: SDK) {
        const fontConnectorId = studioBrandKit.fontConnectorId;
        const guidFontFamilyIdMap = new Map<string, string>();

        for (const font of studioBrandKit.brandKit.fonts || []) {
            const { parsedData: fontStyles = [] } = await SDK.fontConnector.detail(fontConnectorId, font.fontFamilyId);

            if (!fontStyles?.[0]) throw new Error(`No font styles for family ID: ${font.fontFamilyId}`);
            const { parsedData: localFontId } = await SDK.font.addFontFamily(fontConnectorId, {
                name: fontStyles[0].familyName,
                fontFamilyId: font.fontFamilyId,
            });

            if (localFontId) guidFontFamilyIdMap.set(font.fontFamilyBrandKitGuid, localFontId);
        }

        return guidFontFamilyIdMap;
    }

    private async setParagraphStyles(
        studioBrandKit: StudioBrandKit,
        SDK: SDK,
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
            const fontFamilyId = localFontGuidMap.get(style.brandKitFontFamilyGuid);
            const fontKey = getFontKey(localFonts, fontFamilyId, style.fontStyleId);

            if (!fontFamilyId || !fontKey)
                throw new Error(`Paragraph style could not be created with an empty font family: ${style.name}`);

            const localColor = getColorById(localColors, localColorId);
            if (!localColor) throw new Error(`Paragraph style could not be created with an empty color: ${style.name}`);

            const { parsedData: styleId } = await SDK.paragraphStyle.create();

            const paragraphStyleUpdate = mapBrandKitStyleToLocal<BrandKitParagraphStyle, ParagraphStyleUpdate>(
                style,
                localColor,
                `${fontKey}`,
            );

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await SDK.paragraphStyle.rename(styleId!, style.name);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await SDK.paragraphStyle.update(styleId!, paragraphStyleUpdate);
        }
    }

    private async setCharacterStyles(
        studioBrandKit: StudioBrandKit,
        SDK: SDK,
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
            const fontFamilyId = style.brandKitFontFamilyGuid
                ? localFontGuidMap.get(style.brandKitFontFamilyGuid)
                : undefined;
            const localColor = getColorById(localColors, localColorId);
            const fontKey = getFontKey(localFonts, fontFamilyId, style.fontStyleId);

            const { parsedData: styleId } = await SDK.characterStyle.create();

            const characterStyleUpdate = mapBrandKitStyleToLocal<BrandKitCharacterStyle, CharacterStyleUpdate>(
                style,
                localColor,
                fontKey,
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await SDK.characterStyle.rename(styleId!, style.name);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await SDK.characterStyle.update(styleId!, characterStyleUpdate);
        }
    }
}
