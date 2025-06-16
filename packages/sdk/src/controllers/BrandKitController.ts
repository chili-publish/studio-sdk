import SDK, { CharacterStyleUpdate, ParagraphStyleUpdate } from '..';
import {
    BrandKitCharacterStyle,
    BrandKitInternal,
    BrandKitParagraphStyle,
    StudioBrandKit,
} from '../types/BrandKitTypes';
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
 * Methods inside this controller can be called by `window.SDK.brandkit.{method-name}`
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
        const colors = await this.colorStyleController.getAll();
        const fonts = await this.fontController.getFontFamilies();
        const characterStyles = await this.characterStyleController.getAll();
        const paragraphStyles = await this.paragraphStyleController.getAll();

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

        return Promise.resolve(getEditorResponseData<StudioBrandKit>(editorResponse));
    };

    /**
     * @experimental This method updates a brandkit and all related resources assigned to it
     * @param studioBrandKit the content of the brandkit
     * @returns
     */
    set = async (studioBrandKit: StudioBrandKit) => {
        const fontConnectorId = studioBrandKit.fontConnectorId;
        const localColorGuidsMap = new Map<string, string>();
        const guidFontFamilyIdMap = new Map<string, string>();

        this.undoManagerController.record('brandkit.set', async (sdk) => {
            try {
                // colors
                const colorsPromises = (studioBrandKit.brandKit.colors || []).map(async (color) => {
                    const { parsedData: localColorId } = await this.colorStyleController.create();

                    if (!localColorId) return;
                    localColorGuidsMap.set(color.guid, localColorId);
                    const localColor = mapBrandKitColorToLocal(color);

                    return this.colorStyleController.update(localColorId, localColor);
                });
                await Promise.all(colorsPromises);
                const { parsedData: allLocalColors = [] } = await this.colorStyleController.getAll();

                // fonts
                const fontsPromises = (studioBrandKit.brandKit.fonts || []).map(async (font) => {
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
                });
                await Promise.all(fontsPromises);
                const { parsedData: allLocalFonts } = await this.fontController.getFontFamilies();

                // paragraphStyles
                const paragraphStylePromises = (studioBrandKit.brandKit.paragraphStyles || []).map(async (style) => {
                    const { parsedData: styleId } = await this.paragraphStyleController.create();

                    if (!styleId) throw new Error(`Paragraph style could not be created: ${style.name}`);

                    const localColorId = localColorGuidsMap.get(style.brandKitColorGuid);
                    const fontFamilyId = guidFontFamilyIdMap.get(style.brandKitFontFamilyGuid);
                    const fontKey = getFontKey(allLocalFonts, fontFamilyId, style.fontStyleId);

                    if (!fontFamilyId || !fontKey)
                        throw new Error(
                            `Paragraph style could not be created with an empty font family: ${style.name}`,
                        );

                    const localColor = getColorById(allLocalColors, localColorId);
                    if (!localColor)
                        throw new Error(`Paragraph style could not be created with an empty color: ${style.name}`);

                    const paragraphStyleUpdate = mapBrandKitStyleToLocal<BrandKitParagraphStyle, ParagraphStyleUpdate>(
                        style,
                        localColor,
                        fontKey,
                    );
                    return this.paragraphStyleController.update(styleId, paragraphStyleUpdate);
                });
                await Promise.all(paragraphStylePromises);
                const { parsedData: allParagraphStyles } = await this.paragraphStyleController.getAll();
                // characterStyles
                const characterStylePromises = (studioBrandKit.brandKit.characterStyles || []).map(async (style) => {
                    const { parsedData: styleId } = await this.characterStyleController.create();

                    if (!styleId) throw new Error(`Character style could not be created: ${style.name}`);

                    const localColorId = style.brandKitColorGuid
                        ? localColorGuidsMap.get(style.brandKitColorGuid)
                        : undefined;
                    const fontFamilyId = style.brandKitFontFamilyGuid
                        ? guidFontFamilyIdMap.get(style.brandKitFontFamilyGuid)
                        : undefined;
                    const localColor = getColorById(allLocalColors, localColorId);
                    const fontKey = getFontKey(allLocalFonts, fontFamilyId, style.fontStyleId);

                    const characterStyleUpdate = mapBrandKitStyleToLocal<BrandKitCharacterStyle, CharacterStyleUpdate>(
                        style,
                        localColor,
                        fontKey,
                    );
                    return this.characterStyleController.update(styleId, characterStyleUpdate);
                });

                await Promise.all(characterStylePromises);
                const { parsedData: allCharacterStyles } = await this.characterStyleController.getAll();

                return Promise.resolve(
                    getEditorResponseData<BrandKitInternal>({
                        success: true,
                        status: 200,
                        parsedData: {
                            colors: allLocalColors,
                            fonts: allLocalFonts,
                            paragraphStyles: allParagraphStyles,
                            characterStyles: allCharacterStyles,
                        },
                    }),
                );
            } catch (err) {
                sdk.undoManager.undo();
                throw err;
            }
        });
    };

    /**
     * @experimental This method removes a brandkit and all related resources assigned to it
     * @param characterStyleId the id of a specific character style
     * @returns
     */
    remove = async () => {
        const colors = await this.colorStyleController.getAll();
        const removeColorsPromises = (colors.parsedData || [])
            ?.map((color) => color.id)
            .map(this.colorStyleController.remove);

        const paragraphStyles = await this.paragraphStyleController.getAll();
        const removeParagraphStylesPromises = (paragraphStyles.parsedData || [])
            ?.map((style) => style.id)
            .map(this.paragraphStyleController.remove);

        const characterStyles = await this.characterStyleController.getAll();
        const removeCharacterStylesPromises = (characterStyles.parsedData || [])
            ?.map((style) => style.id)
            .map(this.characterStyleController.remove);

        const fonts = await this.fontController.getFontFamilies();
        const removeFontFamiliesPromises = (fonts.parsedData || [])
            ?.map((font) => font.id)
            .map(this.fontController.removeFontFamily);

        return this.undoManagerController.record('brandkit.remove', async (sdk) => {
            try {
                await Promise.all(removeColorsPromises);
                await Promise.all(removeParagraphStylesPromises);
                await Promise.all(removeCharacterStylesPromises);
                await Promise.all(removeFontFamiliesPromises);
            } catch (err) {
                sdk.undoManager.undo();
                throw err;
            }
        });
    };
}
