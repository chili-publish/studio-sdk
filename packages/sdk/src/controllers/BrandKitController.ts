import SDK, { CharacterStyleUpdate, DocumentColor, DocumentFontFamily, FontStyle, ParagraphStyleUpdate } from '..';
import { BrandKitCharacterStyle, BrandKitParagraphStyle, StudioBrandKit } from '../types/BrandKitTypes';
import { EditorAPI } from '../types/CommonTypes';
import { DocumentCharacterStyle, DocumentParagraphStyle } from '../types/DocumentTypes';
import { mapBrandKitColorToLocal, mapBrandKitStyleToLocal } from '../utils/BrandKitHelper';
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

// !!!! mark the methods experimental
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
     * This method returns the local brandkit
     * @returns brandkit with all assigned resources
     */
    get = async () => {
        const colors = this.colorStyleController.getAll();
        const fonts = this.fontController.getFontFamilies();
        const characterStyles = this.characterStyleController.getAll();
        const paragraphStyles = this.paragraphStyleController.getAll();

        const studioBrandKit = {
            brandKit: {
                colors,
                fonts,
                characterStyles,
                paragraphStyles,
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
     * This method updates a brandkit and all related resources assigned to it
     * @param characterStyleId the id of a specific character style
     * @returns
     */
    set = async (studioBrandKit: StudioBrandKit) => {
        const fontConnectorId = studioBrandKit.fontConnectorId;
        // remove done in workspace
        // fontKey is fontStyleId

        // colors
        const localColorGuidsMap = new Map<string, string>();
        const colorsPromises = (studioBrandKit.brandKit.colors || []).map(async (color) => {
            const localColor = await this.colorStyleController.create();
            const colorData: DocumentColor = localColor.data ? JSON.parse(localColor.data) : null;

            localColorGuidsMap.set(color.guid, colorData.id);

            return this.colorStyleController.update(colorData.id, mapBrandKitColorToLocal(color));
        });

        await Promise.all(colorsPromises);
        const localColors = await this.colorStyleController.getAll();

        // fonts

        const localFontGuidsMap = new Map<string, FontStyle[]>();
        const fontsPromises = (studioBrandKit.brandKit.fonts || []).map(async (font) => {
            const fontConnectorData = await this.fontConnectorController.detail(fontConnectorId, font.fontFamilyId);
            const fontStyles: FontStyle[] = fontConnectorData.data ? JSON.parse(fontConnectorData.data) : null;

            localFontGuidsMap.set(font.fontFamilyBrandKitGuid, fontStyles);

            this.fontController.addFontFamily(fontConnectorId, {
                name: fontStyles[0].familyName,
                fontFamilyId: font.fontFamilyId,
            });
        });

        await Promise.all(fontsPromises);

        const paragraphStylePromises = (studioBrandKit.brandKit.paragraphStyles || []).map(async (style) => {
            const localStyle = await this.paragraphStyleController.create();
            const styleData: DocumentParagraphStyle = localStyle.data ? JSON.parse(localStyle.data) : null;

            const localColorId = localColorGuidsMap.get(style.brandKitColorGuid);
            const fontStyleList: FontStyle[] | undefined = localFontGuidsMap.get(style.brandKitFontFamilyGuid);

            const localColor = (localColors.parsedData || []).find((color) => color.id === localColorId);
            const fontKey = (fontStyleList || []).find((item) => item.id === style.fontStyleId)?.id;

            if (localColor && fontKey) {
                return this.paragraphStyleController.update(
                    styleData.id,
                    mapBrandKitStyleToLocal<BrandKitParagraphStyle, ParagraphStyleUpdate>(style, localColor, fontKey),
                );
            }
        });

        const characterStylePromises = (studioBrandKit.brandKit.characterStyles || []).map(async (style) => {
            const localStyle = await this.characterStyleController.create();
            const styleData: DocumentCharacterStyle = localStyle.data ? JSON.parse(localStyle.data) : null;

            const localColorId = style.brandKitColorGuid ? localColorGuidsMap.get(style.brandKitColorGuid) : null;
            const fontStyleList = style.brandKitFontFamilyGuid
                ? localFontGuidsMap.get(style.brandKitFontFamilyGuid)
                : [];

            const localColor = (localColors.parsedData || []).find((color) => color.id === localColorId);
            const fontKey = (fontStyleList || []).find((item) => item.id === style.fontStyleId)?.id;

            if (localColor && fontKey) {
                return this.characterStyleController.update(
                    styleData.id,
                    mapBrandKitStyleToLocal<BrandKitCharacterStyle, CharacterStyleUpdate>(style, localColor, fontKey),
                );
            }
        });

        await Promise.all(paragraphStylePromises);
        await Promise.all(characterStylePromises);
    };

    /**
     * This method removes a brandkit and all related resources assigned to it
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
