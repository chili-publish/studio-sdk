import { EditorAPI, Id } from '../types/CommonTypes';
import { ColorUsage } from '../types/ColorStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { BarcodeProperties } from '../types/BarcodeTypes';
import { BarcodeSource } from '../types/FrameTypes';

/**
 * The BarcodeController is responsible for all communication regarding Barcodes.
 * Methods inside this controller can be called by `window.SDK.barcode.{method-name}`
 */
export class BarcodeController {
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
     * This method updates properties of the barcode
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param properties A property to update
     * @returns
     */
    private setBarcodeProperties = async (id: Id, properties: BarcodeProperties) => {
        const res = await this.#editorAPI;
        return res
            .setBarcodeProperties(id, JSON.stringify(properties))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the background of a barcode enabled or disabled
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param enableBackground Whether the barcode's background is visible.
     * @returns
     */
    setEnableBackground = async (id: Id, enableBackground: boolean) => {
        const properties: BarcodeProperties = { enableBackground: enableBackground };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * This method will set the barcode background color of a specified barcode frame.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param backgroundColor the new barcode background color that you want to set to the barcodeFrame.
     * @returns
     */
    setBackgroundColor = async (id: Id, backgroundColor: ColorUsage) => {
        const properties: BarcodeProperties = { backgroundColor: backgroundColor };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * This method will set the visibility of the barcode's bars.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param enableBars Whether the barcode bars are visible.
     * @returns
     */
    setEnableBars = async (id: Id, enableBars: boolean) => {
        const properties: BarcodeProperties = { enableBars: enableBars };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * This method will set the bar color of a specified barcode frame.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param barColor the new bar color that you want to set to the barcodeFrame.
     * @returns
     */
    setBarColor = async (id: Id, barColor: ColorUsage) => {
        const properties: BarcodeProperties = { barColor: barColor };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * This method will set the source of the barcode to the given source.
     *
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param source
     * @returns
     */
    setBarcodeSource = async (id: Id, source: BarcodeSource) => {
        const res = await this.#editorAPI;
        return res.setBarcodeSource(id, JSON.stringify(source)).then((result) => getEditorResponseData<null>(result));
    };
}
