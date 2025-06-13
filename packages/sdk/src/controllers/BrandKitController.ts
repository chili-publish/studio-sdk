import SDK from '..';
import { StudioBrandKit } from '../types/BrandKitTypes';
import { EditorAPI } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { CharacterStyleController } from './CharacterStyleController';
import { ColorStyleController } from './ColorStyleController';
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
        this.mediaController = new MediaConnectorController(this.#editorAPI);
        this.paragraphStyleController = new ParagraphStyleController(this.#editorAPI);
        this.characterStyleController = new CharacterStyleController(this.#editorAPI);

        this.undoManagerController = new UndoManagerController(this.#editorAPI, sdk);
    }

    private colorStyleController: ColorStyleController;

    private fontController: FontController;

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
    set = async (brandKit: StudioBrandKit) => {};

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
