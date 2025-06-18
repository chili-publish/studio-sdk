import SDK, { CharacterStyleUpdate, DocumentColor, DocumentFontFamily, ParagraphStyleUpdate } from '..';
import { BrandKitCharacterStyle, BrandKitParagraphStyle, StudioBrandKit } from '../types/BrandKitTypes';
import { EditorAPI } from '../types/CommonTypes';
import { getColorById, getFontKey, mapBrandKitColorToLocal, mapBrandKitStyleToLocal } from '../utils/BrandKitHelper';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { CharacterStyleController } from './CharacterStyleController';
import { ColorStyleController } from './ColorStyleController';
import { FontConnectorController } from './FontConnectorController';
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
        this.colorStyleController = new ColorStyleController(this.#editorAPI);
        this.fontController = new FontController(this.#editorAPI);
        this.fontConnectorController = new FontConnectorController(this.#editorAPI);
        this.mediaController = new MediaConnectorController(this.#editorAPI);
        this.paragraphStyleController = new ParagraphStyleController(this.#editorAPI);
        this.characterStyleController = new CharacterStyleController(this.#editorAPI);

        this.undoManagerController = new UndoManagerController(this.#editorAPI, sdk);
    }

    private colorStyleController: ColorStyleController;

    private fontController: FontController;

    private fontConnectorController: FontConnectorController;

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
            characterStylesPromise,
            paragraphStylesPromise,
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
            await this.undoManagerController.record('brandKit.remove', async () => {
                for (const color of colorsList) {
                    await this.colorStyleController.remove(color.id);
                }
                for (const style of paragraphStylesList) {
                    await this.paragraphStyleController.remove(style.id);
                }
                for (const style of characterStylesList) {
                    await this.characterStyleController.remove(style.id);
                }
                for (const font of fontsList) {
                    await this.fontController.removeFontFamily(font.id);
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

            await this.undoManagerController.record('brandKit.set', async () => {
                const localColorGuidMap = await this.setColors(studioBrandKit);
                const localFontGuidMap = await this.setFonts(studioBrandKit);

                const { parsedData: localColors = [] } = await this.colorStyleController.getAll();
                const { parsedData: localFonts } = await this.fontController.getFontFamilies();

                await this.setParagraphStyles(studioBrandKit, {
                    localColors,
                    localFonts,
                    localColorGuidMap,
                    localFontGuidMap,
                });

                await this.setCharacterStyles(studioBrandKit, {
                    localColors,
                    localFonts,
                    localColorGuidMap,
                    localFontGuidMap,
                });

                const { parsedData: allParagraphStyles } = await this.paragraphStyleController.getAll();
                const { parsedData: allCharacterStyles } = await this.characterStyleController.getAll();

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

    private async setColors(studioBrandKit: StudioBrandKit) {
        const localColorGuidsMap = new Map<string, string>();

        for (const color of studioBrandKit.brandKit.colors || []) {
            const { parsedData: localColorId } = await this.colorStyleController.create();

            if (!localColorId) continue;
            localColorGuidsMap.set(color.guid, localColorId);
            const localColor = mapBrandKitColorToLocal(color);

            await this.colorStyleController.rename(localColorId, color.name);
            await this.colorStyleController.update(localColorId, localColor);
        }
        return localColorGuidsMap;
    }

    private async setFonts(studioBrandKit: StudioBrandKit) {
        const fontConnectorId = studioBrandKit.fontConnectorId;
        const guidFontFamilyIdMap = new Map<string, string>();

        for (const font of studioBrandKit.brandKit.fonts || []) {
            const { parsedData: fontStyles = [] } = await this.fontConnectorController.detail(
                fontConnectorId,
                font.fontFamilyId,
            );

            if (!fontStyles?.[0]) throw new Error(`No font styles for family ID: ${font.fontFamilyId}`);
            const { parsedData: localFontId } = await this.fontController.addFontFamily(fontConnectorId, {
                name: fontStyles[0].familyName,
                fontFamilyId: font.fontFamilyId,
            });

            if (localFontId) guidFontFamilyIdMap.set(font.fontFamilyBrandKitGuid, localFontId);
        }

        return guidFontFamilyIdMap;
    }

    private async setParagraphStyles(
        studioBrandKit: StudioBrandKit,
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

            const { parsedData: styleId } = await this.paragraphStyleController.create();

            const paragraphStyleUpdate = mapBrandKitStyleToLocal<BrandKitParagraphStyle, ParagraphStyleUpdate>(
                style,
                localColor,
                `${fontKey}`,
            );

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await this.paragraphStyleController.rename(styleId!, style.name);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await this.paragraphStyleController.update(styleId!, paragraphStyleUpdate);
        }
    }

    private async setCharacterStyles(
        studioBrandKit: StudioBrandKit,
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

            const { parsedData: styleId } = await this.characterStyleController.create();

            const characterStyleUpdate = mapBrandKitStyleToLocal<BrandKitCharacterStyle, CharacterStyleUpdate>(
                style,
                localColor,
                fontKey,
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await this.characterStyleController.rename(styleId!, style.name);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await this.characterStyleController.update(styleId!, characterStyleUpdate);
        }
    }
}
